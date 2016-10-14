import os
import json
from PIL import Image, ImageFilter


def joinFiles(frames):

    # build json
    atlas = {}
    atlas['frames'] = {}

    # Necessary iteration variables
    xOffset = 0
    yOffset = 0
    maxWidth = 0  # maximum width of any row
    maxHeight = 0  # maximum height of any sprite in a row
    totalHeight = 0  # total height so far

    # iterate each list of lists
    for row in frames:
        # Build this row
        xOffset = 0
        totalHeight += maxHeight
        maxHeight = 0
        yOffset = totalHeight
        for frameName, fileName in row:
            # Load image into memory
            image = Image.open(fileName)
            # Build json frame data
            frame = {
                'rotated': False,
                'trimmed': False,
                'frame': {
                    'x': xOffset,
                    'y': yOffset,
                    'w': image.size[0],
                    'h': image.size[1]
                },
                'spriteSourceSize': {
                    'x': 0,
                    'y': 0,
                    'w': image.size[0],
                    'h': image.size[1]
                },
                'sourceSize': {
                    'w': image.size[0],
                    'h': image.size[1]
                },
                'image': image
            }
            atlas['frames'][frameName] = frame
         # Update iteration variables
            xOffset += image.size[0]
            maxWidth = max(xOffset, maxWidth)
            maxHeight = max(image.size[1], maxHeight)

    # Create new joined image with approripate width and height
    totalHeight += maxHeight
    joinedImage = Image.new('RGBA', (maxWidth, totalHeight), (0, 0, 0, 0))

    # Iterate frame objects created above and paste image together
    for frameName in atlas['frames']:
        frame = atlas['frames'][frameName]
        joinedImage.paste(frame['image'], box=(
            frame['frame']['x'], frame['frame']['y']))
        del frame['image']

    atlas['meta'] = {
        'image': 'EDIT ME',
        'format': 'RGBA8888',
        'size': {
            'w': maxWidth,
            'h': totalHeight
        }
    }

    return joinedImage, atlas


def buildLists(directory):
    fileList = []
    for root, directories, filenames in os.walk(directory):
        if len(filenames) != 0:
            fileList.append([])
            for filename in filenames:
                framename = os.path.splitext(filename)[0]
                fileList[-1].append((framename, os.path.join(root, filename)))
    return fileList

if __name__ == "__main__":
    img, atlas = joinFiles(buildLists('reference/human'))
    img.save('humanMaster.png')
    atlas['meta']['image'] = 'humanMaster.png'
    with open('humanMaster.json', 'w') as atlasFile:
        encoder = json.JSONEncoder()
        atlasFile.write(encoder.encode(atlas))