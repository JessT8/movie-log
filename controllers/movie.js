const sha256 = require('js-sha256');
const SALT = "saltCookie";
const fetch = require('node-fetch');

const isLoggedIn = (request) => {
     let user_id = request.cookies.user_id;
     let hashedCookie = sha256(SALT+user_id);
     return ( request.cookies.loggedIn === hashedCookie) ? true : false;
}

module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   **/

   let about = (request,response)=>{
    response.send("About Page");
   }
   let movielist = async (request,response)=>{
    let loggedIn = (isLoggedIn(request))?"true": "false";
     const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1`;
     const movie_response = await fetch(url);
     const movie_data = await movie_response.json();
     const data = {
        movies:movie_data.results,
        loggedIn,
                    header : "Upcoming Movies",
                pagetitle : "Upcoming Movies"};
    response.render("movies/movielist", data);
   }
    let getMovie = async (request, response)=>{
        let loggedIn = (isLoggedIn(request))?"true": "false";
        if(loggedIn=== "true"){
        let user_id = request.cookies.user_id;
        let movie_id = request.params.id;
        const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.MOVIE_API_KEY}&append_to_response=videos`;
        const movie_response = await fetch(url);
        const movie_data = await movie_response.json();
        db.movie.checkBookmark(movie_id, user_id, (err,movie)=>{
        let bookmarked;
            if(err){
                console.log(err);
            }else{
                bookmarked = (movie === null)? false : true;
            }
            const data={movie: movie_data, loggedIn, bookmarked};
            response.render("movies/movie",data);
            });
    }else{
        response.send("Please sign in to bookmark");
    }
    }

    let bookmarkMovie = (request, response) =>{
        let loggedIn = (isLoggedIn(request))?"true": "false";
        console.log("Controller bookmarkMovie");
        let user_id = request.cookies.user_id;
        let movie_id = request.params.id;
         db.movie.addBookmark(movie_id, user_id, async (error)=>{
            if(error){
                response.send(error);
            }else{
            const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.MOVIE_API_KEY}&append_to_response=videos`;
        const movie_response = await fetch(url);
        const movie = await movie_response.json();
        db.movie.checkMovies(movie, user_id, (err)=>{
        const data={movie, bookmarked: true, loggedIn}
        response.render("movies/movie", data);
        });
  }
});
      }

  let getWatchlist = (request, response)=>{
    let user_id = request.cookies.user_id;
    db.movie.watchlist(user_id, (err, watchlist)=>{
        if(err){
            response.send("error: "+ err)
        }else{
            const data = {movies:watchlist}
            response.render("watchlist/watchlist", data)
        }
    })
  }
  let updateFavorite = (request, response)=>{
    let user_id= request.cookies.user_id;
    let movie_id = request.params.id;
    db.movie.addFavorites(user_id, movie_id, (err,watchlist)=>{
        if(err){
            response.send("updateFavorite: "+err);
        }else{
            response.redirect("/watchlist");
        }
    })
  }
    let updateComplete = (request, response)=>{
        let user_id= request.cookies.user_id;
        let movie_id = request.params.id;
        db.movie.addComplete(user_id, movie_id, (err,watchlist)=>{
            if(err){
                response.send("updateComplete: "+err);
            }else{
                response.redirect("/watchlist");
            }
        })
  }
  let completedMovies = (request,response)=>{
    let loggedIn = isLoggedIn(request) ? "true":"false";
    if(isLoggedIn(request)){
    let user_id = request.cookies.user_id;
    db.movie.getCompletedMovies(user_id, (err, movies)=>{
        if(err){
            response.send("completedMovies :" + err);
        }else{
            const data= {
                movies,
                loggedIn:"true",
                header : "Completed Movies",
                pagetitle : "Completed Movies"
            }
            response.render("movies/movielist", data )
        }
    })
        }else{
            response.send("YOU ARE NOT LOGGED IN");
        }

  }
    let favoriteMovies = (request,response)=>{
    let loggedIn = isLoggedIn(request) ? "true":"false";
    if(isLoggedIn(request)){
    let user_id = request.cookies.user_id;
    db.movie.getFavoriteMovies(user_id, (err, movies)=>{
        if(err){
            response.send("completedMovies :" + err);
        }else{
            const data= {
                movies,
                loggedIn:"true",
                header : "Favorite Movies",
                pagetitle : "Favorite Movies"
            }
            response.render("movies/movielist", data )
        }
    })
        }else{
            response.send("YOU ARE NOT LOGGED IN");
        }

  }
let deleteMovie = (request,response)=>{
  //  if(isLoggedIn(request)){
        let movieid = request.params.id;
        let userid = request.cookies.user_id;
        db.movie.removeMovie(userid,movieid,(err)=>{
            if(err){
                response.status(500).send("Error");
            }
            console.log("deleted movie from watchlist");
            response.redirect("/watchlist");
        })
   /*  }else{
             response.redirect("/");
     }*/
  }

   /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    movielist,
    about,
    getMovie,
    bookmarkMovie,
    getWatchlist,
    updateFavorite,
    updateComplete,
    completedMovies,
    favoriteMovies,
    deleteMovie
  };

}