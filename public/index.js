 const bookmark = document.querySelector("#bookmark");

 const bookmarkClick=()=> {
    console.log("Setting bookmark");
    let currentColor = bookmark.style.color;
    if(!currentColor){bookmark.setAttribute('style', 'color:#FFFF0A;');};
 }
bookmark.addEventListener("click", bookmarkClick);;