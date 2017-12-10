# README:

...

# Logic flow:
  - / returns
    - home page of choice (sports)
    -

# TODO:
  - S3 for now... as opposed to EBS
    - client request
      - pass dimensions
    - node server
      - get image from S3
      - resize
      - upload to S3
      - return url
  - https support
  - Python resizing script
    - upload resized to S3

# S3 layout:
  - sports/
    - info.json
    - original/
    - 100x100/
    - 250x500/
  - italy/
  - ...

### info.json:
  ```
    {
      existing_images: [
        {
          x: 100,
          y: 100,
          key: "sports/100x100"
        }
      ]
    }
  ```
