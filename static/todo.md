

# EDITING PROCESS:

- load /edit 
- empty page 
- enter password 
- store password in variable
- load edit grid (this includes edit.json)
- upon save:
    - put objects in "private" S3 bucket
        - bucket requires password as header info
    - lambda triggered 
    - lambda replicates into public read bucket


## S3 bucket
- qfoster (public read)
    - public
        - ...public read images
    - private 
        - require password as header field

