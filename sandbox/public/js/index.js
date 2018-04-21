

function LoadSiema(){
    new Siema({
        selector: ".slide",
        perPage: 1
    });

    document.getElementsByClassName("container")[0].style.visibility = "visible";
    document.getElementsByClassName("copyright")[0].style.visibility = "visible";
    document.getElementsByClassName("landing")[0].style.visibility = "hidden";

    let slideHeight = document.getElementsByClassName("slide")[0].clientHeight;
    let slideWidth = document.getElementsByClassName("slide")[0].clientWidth;

    let imgs = document.getElementsByClassName("slide-item");
    let img = null;
    let i = 0;
    for (i = 0; i < imgs.length; i++){
        img = imgs[i];
        img.style.height = slideHeight + "px";
        img.style.width = slideWidth + "px";
    }
};