const sha256 = require('js-sha256');
const SALT = "saltCookie";
const fetch = require('node-fetch');

const isLoggedIn = (request) => {
     let user_id = request.cookies.user_id;
     let hashedCookie = sha256(SALT+user_id);
     return ( request.cookies.loggedIn === hashedCookie) ? true : false;
}
const getMovies = async (request,response, url, header ,pagetitle)=>{
     let loggedIn = (isLoggedIn(request))?"true": "false";
     const movie_response = await fetch(url);
     const movie_data = await movie_response.json();
     let previous,next;
     let current = parseInt(request.params.num);
     previous = (current!==1) ? current-1: undefined;
     next = (current < parseInt(movie_data.total_pages)-1)? current+1: undefined;

     const data = {
        movies:movie_data.results,
        loggedIn,
        header,
        pagetitle,
        nav:{pagination: true,
                    previous,
                    current: request.params.num,
                    next
                }
            };
    response.render("movies/movielist", data);
}
module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   **/
   let redirect =(request,response)=>{
    let path = '/movies/upcoming/1'
    response.redirect(path);
   }
   let about = (request,response)=>{
     let loggedIn = (isLoggedIn(request))?"true": "false";
     const data ={loggedIn};
    response.render("credit", data);
   }
  /**
   * ===========================================
   * Retrieving Movies
   * ===========================================
   **/
   let upcomingMovies = (request,response)=>{
    let page = request.params.num;
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=${page}`;
    let header =  "Upcoming Movies";
    let movietitle =  "Upcoming Movies";
    getMovies(request,response,url, header, movietitle);
   }
   let popularMovies = (request,response)=>{
        let page = request.params.num;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=en-US&${page}`;
        let header =  "Popular Movies";
    let movietitle =  "Popular Movies";
    getMovies(request,response,url, header, movietitle);
   }
   let nowPlayingMovies = (request,response)=>{
    let page = request.params.num;
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=${page}`;
    let header =  "Now playing";
    let movietitle =  "Now playing";
    getMovies(request,response,url, header, movietitle);
   }

   //Individual movie
    let getMovie = async (request, response)=>{
        let loggedIn = (isLoggedIn(request))?"true": "false";
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
    }
  /**
   * ===========================================
   * End of retrieving Movies
   * ===========================================
   **/
     /**
   * ===========================================
   * Watchlist Bookmark
   * ===========================================
   **/
    let bookmarkMovie = (request, response) =>{
        let loggedIn = (isLoggedIn(request))?"true": "false";
        console.log("Controller bookmarkMovie");
        if(isLoggedIn(request)){
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
        });}
});}else{
            response.redirect('/signin');
        }
      }

  let getWatchlist = (request, response)=>{
     if(isLoggedIn(request)){
    let user_id = request.cookies.user_id;
    db.movie.watchlist(user_id, (err, watchlist)=>{
        if(err){
            response.send("error: "+ err)
        }else{
            const data = {movies:watchlist}
            response.render("watchlist/watchlist", data)
        }
    })}else{
          response.redirect('/signin');
    }
  }
  let updateFavorite = (request, response)=>{
    if(isLoggedIn(request)){
    let user_id= request.cookies.user_id;
    let movie_id = request.params.id;
    db.movie.addFavorites(user_id, movie_id, (err,watchlist)=>{
        if(err){
            response.send("updateFavorite: "+err);
        }else{
            response.redirect("/watchlist");
        }
    });}else{
           response.redirect('/signin');
    }
  }
    let updateComplete = (request, response)=>{
            if(isLoggedIn(request)){
        let user_id= request.cookies.user_id;
        let movie_id = request.params.id;
        db.movie.addComplete(user_id, movie_id, (err,watchlist)=>{
            if(err){
                response.send("updateComplete: "+err);
            }else{
                response.redirect("/watchlist");
            }
        })}else{
                response.redirect('/signin');
        }
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
                pagetitle : "Completed Movies",
                pagination: false
            }
            response.render("movies/movielist", data )
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
    db.movie.getFavoriteMovies(user_id, (err, movies)=>{
        if(err){
            response.send("completedMovies :" + err);
        }else{
            const data= {
                movies,
                loggedIn:"true",
                header : "Favorite Movies",
                pagetitle : "Favorite Movies",
                 pagination: false
            }
            response.render("movies/movielist", data )
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
        db.movie.removeMovie(userid,movieid,(err)=>{
            if(err){
                response.status(500).send("Error");
            }
            console.log("deleted movie from watchlist");
            response.redirect("/watchlist");
        })
    }else{
              response.redirect('/signin');
     }
  }
let getPersonWatchlist = (request,response)=>{
  if(isLoggedIn(request)){
    let user_id = request.params.id;
    db.movie.individualWatchlist(user_id, (err, watchlist)=>{
        if(err){
            response.send("error: "+ err)
        }else{
             const data= {
                movies:watchlist,
                loggedIn:"true",
                header : "Others' watchlist",
                pagetitle : "Others' watchlist",
                 pagination: false
            }
            response.render("movies/movielist", data)
        }
    })}else{
          response.redirect('/signin');
    }
}
   /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    redirect,
    upcomingMovies,
    popularMovies,
    nowPlayingMovies,
    about,
    getMovie,
    bookmarkMovie,
    getWatchlist,
    updateFavorite,
    updateComplete,
    completedMovies,
    favoriteMovies,
    deleteMovie,
    getPersonWatchlist
  };

}