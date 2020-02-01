const bookmark = document.querySelector("#bookmark");
const ticks = document.querySelectorAll(".tick");
const tick = Array.from(ticks);
const hearts = document.querySelectorAll('.heart');
const heart = Array.from(hearts);

const bookmarkClick=()=> {
    console.log("Setting bookmark");
    let currentColor = bookmark.style.color;
    if(!currentColor){bookmark.setAttribute('style', 'color:#FFFF0A;');};
}
const tickClick = (e) =>{
    console.log("setting tick");
    e.target.classList.remove("tick");
    e.target.classList.add("clickedTick");
}

const heartClick = (e)=>{
    console.log("setting heart");
    e.target.classList.remove("icon");
    e.target.classList.add("clickedHeart");
}
tick.map(t=>t.addEventListener("click", tickClick));
heart.map(h=>h.addEventListener("click",heartClick));
bookmark.addEventListener("click", bookmarkClick);