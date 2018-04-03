
# Requirements:
- static site
- host in public-read S3 bucket
- https 
- host images in public-read only s3 bucket
- allow client to edit albums
    - must authorize via password
    - can drag-and-drop to edit order
    - can upload new photos
- cloudformation script for (most of) the architecture (yaml)

# Architecture:

## Public-facing:

![]("./docs/QFosterAWSAuth.png")

## Authorization process (required for editing S3 contents):

![]("./docs/QFosterAWSAuth.png")

![]("./docs/QFosterAWSAuth.Swim.png")

## CloudFormation components:
```yaml

```

- S3 bucket (public read only)
- API Gateway
    - auth resource
    - edit resource (auth token required)
- lambda function
- cloudfront?

## External resources:

- my private AWSAuth repo for authorization