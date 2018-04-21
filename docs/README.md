

# TODO:
<!-- - AWS s3 authenticate credentials -->
- hide ...
    - delete album
    - new photo
    - save config
- ...until album is loaded
- auto save config
- reload?



# DRAGGABLE LOGIC:

- if drag started:
    - store in global variable
- if dragover;
    - preventDefault()
- if drop:
    - check dropzone 
    - dragged remove node 
    - event.target.appendChild( dragged );

TODO: insert before or after


# new plan:
- forget about user-friendly edit functionality
- quinn will figure out the development side of things and be able to configure all this himself
- so then let's also forget about config.json
- everything will be pure html, css & js
- ...
- new behavior...
    - upon load
        - four puzzle pieces
        - some sort of loading animation
        - once images are loaded (at least most of the way?)
        - puzzle pieces can fade into the background?
    - index.html
        - default image list
        - nav bar will get other html pages like index but w/ different body content
    - ...
    - css/
        - different css for desktop vs mobile
        - use similar logic on my website
        - ...
    - maybe get rid of Slick and use something else?
