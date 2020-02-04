
const ticks = document.querySelectorAll(".tick");
const tick = Array.from(ticks);
const hearts = document.querySelectorAll('.heart');
const heart = Array.from(hearts);
const bookmark = document.querySelector(".bookmark");
const bookmarked = document.querySelector(".bookmarked");

if(bookmark){
const bookmarkClick= ()=>{
    console.log("Setting bookmark");
    var request = new XMLHttpRequest();
    bookmark.classList.remove("bookmark");
    bookmark.classList.add("bookmarked");
    bookmark.disabled = true;
    var url = "/movies/"+parseInt(bookmark.value);
    request.open("POST", url);
    request.addEventListener("load", function(response){
        console.log(this.responseText);
        if(this.responseText){
            location.href = "/signin";
        }
    })
    request.send();
}
bookmark.addEventListener("click", bookmarkClick);
}else if(bookmarked){
bookmarked.disabled = true;
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
if(ticks){
tick.map(t=>t.addEventListener("click", tickClick));
}
if(hearts){
heart.map(h=>h.addEventListener("click",heartClick));
}

//Highlight navigation
switch(document.title){
case "Completed Movies":
document.querySelector("#meNav").classList.add("activeNav");
const complete = document.querySelector("#Completed");
complete.classList.add("activeNav");
complete.removeAttribute("href");
break;
case "Favorite Movies":
document.querySelector("#meNav").classList.add("activeNav");
const favorite = document.querySelector("#Favorite");
favorite.classList.add("activeNav");
favorite.removeAttribute("href");
break;
case "My WatchList":
document.querySelector("#meNav").classList.add("activeNav");
const watchlist = document.querySelector("#Watchlist");
watchlist.classList.add("activeNav");
watchlist.removeAttribute("href");
break;
case "Credit":
const credit = document.querySelector("#credit");
credit.classList.add("activeNav");
credit.removeAttribute("href");
break;
case "Upcoming Movies":
document.querySelector("#movieNav").classList.add("activeNav")
const upcoming = document.querySelector("#upcoming");
upcoming.classList.add("activeNav");
upcoming.removeAttribute("href");
break;
case "Popular Movies":
document.querySelector("#movieNav").classList.add("activeNav")
const popular = document.querySelector("#popular");
popular.classList.add("activeNav");
popular.removeAttribute("href");
break;
case "Now playing":
document.querySelector("#movieNav").classList.add("activeNav")
const nowPlaying = document.querySelector("#nowPlaying");
nowPlaying.classList.add("activeNav");
nowPlaying.removeAttribute("href");
break;
case "People":
document.querySelector("#peopleNav").classList.add("activeNav")
const all = document.querySelector("#allPeople");
all.classList.add("activeNav");
all.removeAttribute("href");
break;
case "Followed":
document.querySelector("#peopleNav").classList.add("activeNav")
const followed = document.querySelector("#Followed");
followed.classList.add("activeNav");
followed.removeAttribute("href");
break;
case "Follower":
document.querySelector("#peopleNav").classList.add("activeNav")
const follower = document.querySelector("#Followers");
follower.classList.add("activeNav");
follower.removeAttribute("href");
break;
case "Sign in":
const signin = document.querySelector("#signin");
signin.classList.add("activeNav");
signin.removeAttribute("href");
break;
default:
break;
}