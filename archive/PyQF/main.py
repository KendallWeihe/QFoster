


import sys
import os
import pdb
import cv2
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--album", type=str, help="album name", required=True)
parser.add_argument("--add", help="add a photo", action='store_true')
parser.add_argument("--path", help="path to photo")
parser.add_argument("--delete", help="delete a photo", action='store_true')
parser.add_argument("--file_name", help="name of photo")
args = parser.parse_args()

def resize(album, file_name, src):
    img = cv2.imread(src)
    img_h, img_w = img.shape[:2]

    for px in range(100, 2500, 50):
        print("Resizing to be contained within {} px...".format(px))

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

        resized_path = "../public/img/portfolio/resized/{}".format(px)
        try:
            mk_path = resized_path
            os.mkdir(mk_path)
        except:
            pass

        resized_path = "../public/img/portfolio/resized/{}/{}/{}".format(px, album, file_name)
        try:
            mk_path = resized_path[0:resized_path.rfind("/")]
            os.mkdir(mk_path)
        except:
            pass
        cv2.imwrite(resized_path, img_resized)

def delete(album, file_name):
    for px in range(100, 2500, 50):
        resized_path = "../public/img/portfolio/resized/{}/{}/{}".format(px, album, file_name)
        try:
            os.remove(resized_path)
        except:
            print("Error in os.remove()")

def main():
    album = args.album

    if not args.delete and not args.add:
        print("You must specify to add or delete a file")
        sys.exit()

    if args.add:
        path = args.path
        file_name = path.split("/")[-1]
        resize(album, file_name, path)

    elif args.delete:
        file_name = args.file_name
        delete(album, file_name)

if __name__ == "__main__":
    main()












# ...
