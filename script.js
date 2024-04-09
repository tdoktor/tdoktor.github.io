zoomed = false;
count = 0
function zoom() {
    count++;
    if(!zoomed){
        document.getElementById("imagedefault").src="./images/front-image_zoom.jpg";
        zoomed = true;
    }else{
        document.getElementById("imagedefault").src="./images/front-image.jpg";
        zoomed = false;
    }

    if(count == 20){
        localStorage.setItem("curseMode", "curseOn");
        document.body.classList.add("cursed");
    }
}
