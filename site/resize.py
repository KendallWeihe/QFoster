import os
import pdb
import sys
import cv2
import numpy as np

# ARGS:
#     - path to root level for old images

if (len(sys.argv) != 2):
    print("usage: python resize.py <root_to_portfolio>")
    sys.exit()

def resize(path, px):
    img = cv2.imread(path)
    img_h, img_w = img.shape[:2]

    if img_w > img_h:
        new_w = px
        new_h = (new_w * img_h) / img_w
    elif img_h > img_w:
        new_h = px
        new_w = (new_h * img_w) / img_h
    else:
        new_w = px
        new_h = px
    img_resized = cv2.resize(img, (new_w, new_h), interpolation=cv2.INTER_CUBIC)

    resized_path = "{}resized/{}".format(root_path, px)
    try:
        mk_path = resized_path
        os.mkdir(mk_path)
    except:
        pass

    resized_path = "{}resized/{}{}".format(root_path, px, path.split(root_path)[1])
    try:
        mk_path = resized_path[0:resized_path.rfind("/")]
        os.mkdir(mk_path)
    except:
        pass
    cv2.imwrite(resized_path, img_resized)

def recursive_file_search(path, contain_px):
    objects = os.listdir(path)
    for obj in objects:
        new_path = "{}/{}".format(path, obj)
        if os.path.isfile(new_path) and ".jpg" in obj.lower():
            resize(new_path, contain_px)
        elif "resized" not in new_path and os.path.isdir(new_path):
            recursive_file_search(new_path, contain_px)

root_path = sys.argv[1]

for contain_px in range(100, 2500, 100):
    print("Resizing to be contained withing {} px...".format(contain_px))
    recursive_file_search(root_path, contain_px)
