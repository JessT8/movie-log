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
     const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1`;
     const movie_response = await fetch(url);
     const movie_data = await movie_response.json();
     const data = {
        movies:movie_data.results,
        loggedIn};
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
    getWatchlist
  };

}