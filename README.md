
# Primary tools used:
  - NodeJS & Express
  - HTML
  - JavaScript
  - CSS
  - AWS
    - image storage
    - hosting
    - load balancing
    - DNS resolution
  - tmux

# Setup:
  - `git clone ...`
  - `npm install`
  - TLS things:
    - generate key: `openssl genrsa -out <name>.key 2048`
    - generate cert: `openssl req -new -x509 -key <name>.key -out <name>.cert -days 3650 -subj /CN=<name>`

# Handle images
  - `resize.py` resizes photos for S3
    - upload manually (currently)
  - `delete.py` removes photo from S3

# Start server:
  - `sudo KEY=<path>/<name>.key CERT=<path>/<name>.cert node server.js`

# TODO:
  - setup QF portal for uploading images & captions
  - About Me page
  - "Get full size image" button
  - render index if `/*` path is used
  - add a job that will backup log files w/ scp
  - throw all this in a Docker container (w/ hopes to orchestrate multiple sites in future)
  - auto style for PHONE landscape
  - build automation

# QF EDIT portal
  - json meta file in root
    - file name
    - caption
    - index
  - Python photos program
    - CRUD for photos
  - UX
    - nav bar for album
    - for each photo:
      - delete button
      - index form
      - caption form
      - save button
    - upload new photo button
    - delete all photos button


# TODO:
  - [ ] upload images feature:
    - [ ] offer upload form 
    - [ ] server code to handle
      - [ ] save image locally
      - [ ] resize image via python script


















...
