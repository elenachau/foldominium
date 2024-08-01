import fitz  # PyMuPDF
import cv2
import numpy as np
import tempfile
import os

# IMG_PATH = "/Users/josueochoa/Desktop/VS Code/Python/Techwise-Projects/foldominium/dataset/davidic_resch_2_cp.pdf"

IMG_PATH = "/Users/josueochoa/Desktop/VS Code/Python/Techwise-Projects/foldominium/dataset/white_rhino_cp.pdf"
# Open the PDF file
pdf_document = fitz.open(IMG_PATH)

# Process each page
for page_number in range(len(pdf_document)):
    page = pdf_document.load_page(page_number)
    pix = page.get_pixmap()

    # Save the image as a temporary file
    with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tmp_file:
        pix.save(tmp_file.name)
        temp_img_path = tmp_file.name

    # Load the image using OpenCV
    image = cv2.imread(temp_img_path)

    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply Gaussian blur to reduce noise and improve corner detection
    gray_blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # Apply thresholding
    _, thresh = cv2.threshold(gray_blurred, 127, 255, cv2.THRESH_BINARY)

    # Detect edges using Canny
    edges = cv2.Canny(thresh, 50, 150, apertureSize=3)

    # Detect lines using Hough Transform
    lines = cv2.HoughLinesP(edges, 1, np.pi/180, threshold=100, minLineLength=50, maxLineGap=10)

    # Convert to HSV color space for color segmentation
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    # Define color ranges for mountain and valley folds (example ranges)
    mountain_fold_lower = np.array([0, 100, 100])
    mountain_fold_upper = np.array([10, 255, 255])
    valley_fold_lower = np.array([110, 100, 100])
    valley_fold_upper = np.array([130, 255, 255])

    # Create masks for mountain and valley folds
    mountain_mask = cv2.inRange(hsv, mountain_fold_lower, mountain_fold_upper)
    valley_mask = cv2.inRange(hsv, valley_fold_lower, valley_fold_upper)

    # Shi-Tomasi corner detection
    corners = cv2.goodFeaturesToTrack(gray_blurred, maxCorners=500, qualityLevel=0.01, minDistance=10)
    corners = corners.astype(int)

    # Create a copy of the original image to draw corners on it
    image_with_corners = image.copy()
    for i in corners:
        x, y = i.ravel()
        cv2.circle(image_with_corners, (x, y), 3, (0, 0, 255), -1)  # Mark corners in red

    # Contour detection
    contours, _ = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    # Draw contours and approximate polygons
    for cnt in contours:
        epsilon = 0.01 * cv2.arcLength(cnt, True)
        approx = cv2.approxPolyDP(cnt, epsilon, True)
        for point in approx:
            x, y = point.ravel()
            cv2.circle(image_with_corners, (x, y), 3, (255, 0, 0), -1)  # Mark contours in blue

    # Show the original and processed images
    cv2.imshow("Original Image", image)
    cv2.waitKey(0)
    cv2.imshow("Grayscale Image", gray)
    cv2.waitKey(0)
    cv2.imshow("Threshold Image", thresh)
    cv2.waitKey(0)
    cv2.imshow("Edges", edges)
    cv2.waitKey(0)
    cv2.imshow("Mountain Mask", mountain_mask)
    cv2.waitKey(0)
    cv2.imshow("Valley Mask", valley_mask)
    cv2.waitKey(0)
    cv2.imshow("Corners Highlighted", image_with_corners)
    cv2.waitKey(0)

    # Wait for a key press to move to the next page (or close the window)
    cv2.destroyAllWindows()

    # Clean up the temporary file
    os.remove(temp_img_path)

# Close the PDF file
pdf_document.close()
cv2.destroyAllWindows()
