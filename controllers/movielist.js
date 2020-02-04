/** ===========================================
   * LIST OF INDIVIDUALS' MOVIE
   * ===========================================
**/
const sha256 = require('js-sha256');
const SALT = "saltCookie";
const fetch = require('node-fetch');

const isLoggedIn = (request) => {
     let user_id = request.cookies.user_id;
     let hashedCookie = sha256(SALT+user_id);
     return ( request.cookies.loggedIn === hashedCookie) ? true : false;
}

module.exports = (db) => {
    let getPersonWatchlist = (request,response)=>{
  if(isLoggedIn(request)){
    let user_id = request.params.id;
    db.movielist.individualWatchlist(user_id, (err, watchlist)=>{
        if(err){
            response.send("error: "+ err)
        }else{
            db.movielist.getWatchlistUser(user_id, (err, users)=>{
             const data= {
                movies:watchlist,
                loggedIn:"true",
                header : users[0].username+"'s Movie List",
                pagetitle :  users[0].username+"'s Movie List",
                 pagination: false
            }

            response.render("movies/movielist", data);
            }
         )};
    })}else{
          response.redirect('/signin');
    }
}
  let movielist = (request, response)=>{
     if(isLoggedIn(request)){
    let user_id = request.cookies.user_id;
    db.movielist.movielist(user_id, (err, movielist)=>{
        if(err){
            response.send("error: "+ err)
        }else{
            const data = {
                movies:movielist,
                header: "My Movie List",
                title: "My Movie List",
                loggedIn:"true"
            }
            response.render("watchlist/watchlist", data)
        }
    })}else{
          response.redirect('/signin');
    }
  }
    let bookmarkMovie = (request, response) =>{
        let loggedIn = (isLoggedIn(request))?"true": "false";
        console.log("Controller bookmarkMovie");
        if(isLoggedIn(request)){
        let user_id = request.cookies.user_id;
        let movie_id = request.params.id;
         db.movielist.addBookmark(movie_id, user_id, async (error)=>{
            if(error){
                response.send(error);
            }else{
            const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.MOVIE_API_KEY}&append_to_response=videos`;
        const movie_response = await fetch(url);
        const movie = await movie_response.json();
        db.movielist.checkMovies(movie, user_id, (err)=>{
        });}
        });}else{
            response.send(true);
        }
      }
  let updateFavorite = (request, response)=>{
    if(isLoggedIn(request)){
    let user_id= request.cookies.user_id;
    let movie_id = request.params.id;
    db.movielist.addFavorites(user_id, movie_id, (err,watchlist)=>{
        if(err){
            response.send("updateFavorite: "+err);
        }else{
            response.redirect("/movielist");
        }
    });}else{
           response.redirect('/signin');
    }
  }
    let updateComplete = (request, response)=>{
            if(isLoggedIn(request)){
        let user_id= request.cookies.user_id;
        let movie_id = request.params.id;
        db.movielist.addComplete(user_id, movie_id, (err,watchlist)=>{
            if(err){
                response.send("updateComplete: "+err);
            }else{
                response.redirect("/movielist");
            }
        })}else{
                response.redirect('/signin');
        }
  }
  let completedMovies = (request,response)=>{
    let loggedIn = isLoggedIn(request) ? "true":"false";
    if(isLoggedIn(request)){
    let user_id = request.cookies.user_id;
    db.movielist.getCompletedMovies(user_id, (err, movies)=>{
        if(err){
            response.send("completedMovies :" + err);
        }else{
            const data= {
                movies,
                loggedIn:"true",
                header : "Completed Movies",
                pagetitle : "Completed Movies",
            }
            response.render("watchlist/watchlist", data )
        }
    })
        }else{
            response.redirect('/signin');
        }

  }
    let favoriteMovies = (request,response)=>{
    let loggedIn = isLoggedIn(request) ? "true":"false";
    if(isLoggedIn(request)){
    let user_id = request.cookies.user_id;
    db.movielist.getFavoriteMovies(user_id, (err, movies)=>{
        if(err){
            response.send("completedMovies :" + err);
        }else{
            const data= {
                movies,
                loggedIn:"true",
                header : "Favorite Movies",
                pagetitle : "Favorite Movies",
            }
            response.render("watchlist/watchlist", data )
        }
    })
        }else{
            response.redirect('/signin');
        }

  }
let deleteMovie = (request,response)=>{
    if(isLoggedIn(request)){
        let movieid = request.params.id;
        let userid = request.cookies.user_id;
        db.movielist.removeMovie(userid,movieid,(err)=>{
            if(err){
                response.status(500).send("Error");
            }
            console.log("deleted movie from watchlist");
            response.redirect("/movielist");
        })
    }else{
              response.redirect('/signin');
     }
  }

  return {
    getPersonWatchlist,
    movielist,
    bookmarkMovie,
    updateFavorite,
    updateComplete,
    completedMovies,
    favoriteMovies,
    deleteMovie
  };
}