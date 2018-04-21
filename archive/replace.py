import pdb
import os
import sys

# ARGS:
#     - path to recursive object replacement

# if len(sys.argv) != 2:
#     print("Usage: python replace.py <path>")
#     sys.exit()

def replace(path, key, num):
    # print("path: {}".format(path))
    # print("key: {}".format(key))
    os.system("python WrapS3/replace.py qfoster {} {} {}".format(key, path, num))

def recursive_file_search(path):
    objects = os.listdir(path)
    for obj in objects:
        if path[-1] == "/":
            new_path = "{}{}".format(path, obj)
        else:
            new_path = "{}/{}".format(path, obj)
        # print(new_path)
        if os.path.isfile(new_path) and ".jpg" in obj.lower():
            pdb.set_trace()
            num = new_path.split("/")[-1].split(".JPG")[0][-2:]
            key = "/".join(new_path.split("/")[1:-1])
            replace(new_path, key, num)
        elif os.path.isdir(new_path):
            recursive_file_search(new_path)

root_path = sys.argv[1]
recursive_file_search(root_path)