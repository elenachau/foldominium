import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QPushButton, QColorDialog, QFileDialog, QWidget, QHBoxLayout, QSpinBox, QLabel
from PyQt5.QtGui import QPainter, QPen, QImage, QColor
from PyQt5.QtCore import Qt, QPoint, QRect

class CreasePatternCreator(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Crease Pattern Creator")
        self.setGeometry(100, 100, 800, 600)

        self.current_color = Qt.black
        self.current_width = 2
        self.grid_boxes_x = 20
        self.grid_boxes_y = 20
        self.start_point = None
        self.end_point = None
        self.creases = []
        self.selected_crease = None

        self.canvas = Canvas(self)
        self.setCentralWidget(self.canvas)

        self.init_ui()

    def init_ui(self):
        toolbar = self.addToolBar("Toolbar")
        
        color_button = QPushButton("Color", self)
        color_button.clicked.connect(self.choose_color)
        toolbar.addWidget(color_button)

        save_button = QPushButton("Save", self)
        save_button.clicked.connect(self.save_pattern)
        toolbar.addWidget(save_button)

        load_button = QPushButton("Load", self)
        load_button.clicked.connect(self.load_pattern)
        toolbar.addWidget(load_button)

        export_button = QPushButton("Export", self)
        export_button.clicked.connect(self.export_pattern)
        toolbar.addWidget(export_button)

        delete_button = QPushButton("Delete Line", self)
        delete_button.clicked.connect(self.delete_line)
        toolbar.addWidget(delete_button)

        grid_label_x = QLabel("Grid Boxes X:", self)
        toolbar.addWidget(grid_label_x)

        self.grid_spinbox_x = QSpinBox(self)
        self.grid_spinbox_x.setRange(2, 100)
        self.grid_spinbox_x.setValue(self.grid_boxes_x)
        self.grid_spinbox_x.valueChanged.connect(self.change_grid_boxes_x)
        toolbar.addWidget(self.grid_spinbox_x)

        grid_label_y = QLabel("Grid Boxes Y:", self)
        toolbar.addWidget(grid_label_y)

        self.grid_spinbox_y = QSpinBox(self)
        self.grid_spinbox_y.setRange(2, 100)
        self.grid_spinbox_y.setValue(self.grid_boxes_y)
        self.grid_spinbox_y.valueChanged.connect(self.change_grid_boxes_y)
        toolbar.addWidget(self.grid_spinbox_y)

    def choose_color(self):
        color = QColorDialog.getColor()
        if color.isValid():
            self.current_color = color

    def save_pattern(self):
        options = QFileDialog.Options()
        file_path, _ = QFileDialog.getSaveFileName(self, "Save Pattern", "", "Crease Pattern Files (*.cp);;All Files (*)", options=options)
        if file_path:
            with open(file_path, "w") as f:
                for crease in self.creases:
                    f.write(f"{crease}\n")

    def load_pattern(self):
        options = QFileDialog.Options()
        file_path, _ = QFileDialog.getOpenFileName(self, "Load Pattern", "", "Crease Pattern Files (*.cp);;All Files (*)", options=options)
        if file_path:
            with open(file_path, "r") as f:
                self.creases = [eval(line.strip()) for line in f.readlines()]
                self.canvas.update()

    def export_pattern(self):
        options = QFileDialog.Options()
        file_path, _ = QFileDialog.getSaveFileName(self, "Export Pattern", "", "PNG Files (*.png);;All Files (*)", options=options)
        if file_path:
            self.canvas.image.save(file_path, "PNG")

    def delete_line(self):
        if self.selected_crease is not None:
            self.creases.remove(self.selected_crease)
            self.selected_crease = None
            self.canvas.update()

    def change_grid_boxes_x(self):
        self.grid_boxes_x = self.grid_spinbox_x.value()
        self.canvas.update()

    def change_grid_boxes_y(self):
        self.grid_boxes_y = self.grid_spinbox_y.value()
        self.canvas.update()

class Canvas(QWidget):
    def __init__(self, parent):
        super().__init__(parent)
        self.setFixedSize(780, 540)
        self.image = QImage(self.size(), QImage.Format_RGB32)
        self.image.fill(Qt.white)
        self.parent = parent

    def paintEvent(self, event):
        painter = QPainter(self)
        painter.drawImage(self.rect(), self.image, self.image.rect())
        self.draw_grid(painter)

        for crease in self.parent.creases:
            pen = QPen(crease[2], crease[3], Qt.SolidLine)
            painter.setPen(pen)
            painter.drawLine(crease[0], crease[1])

        if self.parent.selected_crease:
            pen = QPen(Qt.red, self.parent.selected_crease[3], Qt.SolidLine)
            painter.setPen(pen)
            painter.drawLine(self.parent.selected_crease[0], self.parent.selected_crease[1])

    def draw_grid(self, painter):
        pen = QPen(Qt.lightGray, 1, Qt.SolidLine)
        painter.setPen(pen)
        
        grid_width = self.width() // self.parent.grid_boxes_x
        grid_height = self.height() // self.parent.grid_boxes_y

        for x in range(0, self.width(), grid_width):
            painter.drawLine(x, 0, x, self.height())
        for y in range(0, self.height(), grid_height):
            painter.drawLine(0, y, self.width(), y)

    def mousePressEvent(self, event):
        if event.button() == Qt.LeftButton:
            self.parent.start_point = self.snap_to_grid(event.pos())
            self.parent.selected_crease = self.find_crease(self.parent.start_point)

    def mouseMoveEvent(self, event):
        if event.buttons() & Qt.LeftButton:
            self.parent.end_point = self.snap_to_grid(event.pos())
            self.update()

    def mouseReleaseEvent(self, event):
        if event.button() == Qt.LeftButton and self.parent.start_point is not None:
            self.parent.end_point = self.snap_to_grid(event.pos())
            if self.parent.selected_crease is None:
                self.add_crease(self.parent.start_point, self.parent.end_point, self.parent.current_color, self.parent.current_width)
            self.parent.start_point = None
            self.parent.end_point = None
            self.parent.selected_crease = None
            self.update()

    def snap_to_grid(self, point):
        grid_width = self.width() // self.parent.grid_boxes_x
        grid_height = self.height() // self.parent.grid_boxes_y

        x = grid_width * round(point.x() / grid_width)
        y = grid_height * round(point.y() / grid_height)
        return QPoint(x, y)

    def add_crease(self, start_point, end_point, color, width):
        painter = QPainter(self.image)
        pen = QPen(color, width, Qt.SolidLine)
        painter.setPen(pen)
        painter.drawLine(start_point, end_point)
        self.parent.creases.append((start_point, end_point, color, width))
        self.update()

    def find_crease(self, point):
        for crease in self.parent.creases:
            line_rect = QRect(crease[0], crease[1]).normalized().adjusted(-5, -5, 5, 5)
            if line_rect.contains(point):
                return crease
        return None


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = CreasePatternCreator()
    window.show()
    sys.exit(app.exec_())
