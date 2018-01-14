

import os
import sys
import pdb
import json

meta_f = sys.argv[1]
portfolio_p = sys.argv[2] # send a path to one of the resized folders

f = open(meta_f, "r")
meta = json.loads(f.read())
f.close()

import re

_nsre = re.compile('([0-9]+)')
def natural_sort_key(s):
    return [int(text) if text.isdigit() else text.lower()
            for text in re.split(_nsre, s)]

def update_meta(path):
    global meta

    album = path.split("/")[-1]
    meta[album] = []

    files = os.listdir(path)
    files.sort(key=natural_sort_key)
    for i in range(len(files)):
        if files[i] not in [j["photo_name"] for j in meta[album]]:
            tmp = {}
            # tmp["name"] = album
            tmp["index"] = i
            tmp["caption"] = ""
            tmp["photo_name"] = files[i]
            meta[album].append(tmp)
            print path

def iterate_recursive(path):
    objects = os.listdir(path)
    for obj in objects:
        if path[-1] == "/":
            new_path = "{}{}".format(path, obj)
        else:
            new_path = "{}/{}".format(path, obj)

        if os.path.isfile(new_path) and ".jpg" in obj.lower():
            update_meta(path)
            break
        elif os.path.isdir(new_path):
            iterate_recursive(new_path)

def main():
    iterate_recursive(portfolio_p)

    f = open(meta_f, "w")
    f.write(json.dumps(meta, indent=4))
    f.close()

if __name__ == "__main__":
    main()
