
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
  - render index if `/*` path is used
  - switch to EBS rather than S3 (?) (caching issue)
  - add a job that will backup log files w/ scp
  - create a S3 upload script
    - maybe just make a full S3 repository?
  - throw all this in a Docker container (w/ hopes to orchestrate multiple sites in future)
  - auto style for PHONE landscape
  - build automation
