import torch
import torch.nn as nn

class CreaseGeneratorGan(nn.Module):
    def __init__(self):
        super(MultiViewGAN, self).__init__() #MultiViewGAN inherites from nn.Module
        self.viewFeatureExtractors = nn.ModuleList([nn.Sequential(
            nn.Conv2d(3, 64, kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernelSize=2, stride=2)
        ) for _ in range(8)]) #for each view

        self.fusionLayer = nn.Sequential(
            nn.Conv2d(64 * 8, 512, kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernelSize=2, stride=2)
        )

        self.outputLayer = nn.Sequential(
            nn.Linear(512 * 16 * 16, 1024),
            nn.ReLU(),
            nn.Linear(1024, 1024)
        )

    def forward(self, views):
        features = [extractor(view) for extractor, view in zip(self.viewFeatureExtractors, views)] #extract features from each view
        combinedFeatures = torch.cat(features, dim=1) #combine features from all views
        fused = self.fusionLayer(combinedFeatures) #pass combined features through the fusion layer
        output = self.outputLayer(fused.view(fused.size(0), -1)) #generate output crease pattern
        return output

model = CreaseGeneratorGan()
