import json
import torch
import torch.utils.data import Dataset, Dataloader #handling data
from torchvision import transforms #image preprocessing
from PIL import Image #handle image files

class CreasePatternDataset(Dataset):
    def __init__(self, jsonPath, foldedViewFolder):
        with open(jsonPath, 'r') as f:
            self.data = json.load(f)['data']
        self.foldedViewFolder = foldedViewFolder
        self.transform = transforms.Compose([
            transforms.Resize((128, 128)), #resize to 128x128 pixels
            transforms.ToTensor() #convert images to PyTorch tensors
        ])

    def __len__(self):
        return len(self.data) #dataset length
    
    def __getitem__(self, idx):
        sample = self.data[idx] #get sample data by index
        creasePattern = sample['creasePattern'] #load crease pattern
        views = [self.transform(Image.open(f"{self.foldedViewFolder}/{sample['foldedViews'][view]}")) for view in sample['foldedViews']] #load/transform each view
        label = sample['name'] #retrieve obj name
        return creasePattern, torch.stack(views), label

dataset = CreasePatternDataset(jsonPath='example.json', foldedViewFolder='images') # subject to change
dataloader = Dataloader(dataset, batch_size=32, shuffle=True)

