import boto3
import pdb

object_name = "reflections_QF_09.JPG"
key = "resized"
bucket = "qfoster"

s3 = boto3.client("s3")

pdb.set_trace()
for i in range(100, 2500, 50):
    new_key = "{}/{}/reflections/{}".format(key, i, object_name)
    response = s3.delete_object(
                    Bucket = "qfoster",
                    Key = new_key
                )

    print(response)
