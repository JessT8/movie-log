const sha256 = require('js-sha256');
const SALT = "saltCookie";
const fetch = require('node-fetch');

const isLoggedIn = (request) => {
     let user_id = request.cookies.user_id;
     let hashedCookie = sha256(SALT+user_id);
     return ( request.cookies.loggedIn === hashedCookie) ? true : false;
}
const getMovies = async (request,response, url, header ,pagetitle,link)=>{
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
                    next,
                    link
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
   let credit = (request,response)=>{
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
    let link = '/movies/upcoming/';
    getMovies(request,response,url, header, movietitle,link);
   }
   let popularMovies = (request,response)=>{
        let page = request.params.num;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=${page}`;
    console.log(url);
        let header =  "Popular Movies";
    let movietitle =  "Popular Movies";
    let link = '/movies/popular/';
    getMovies(request,response,url, header, movietitle, link);
   }

   let nowPlayingMovies = (request,response)=>{
    let page = request.params.num;
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=${page}`;
    let header =  "Now playing";
    let movietitle =  "Now playing";
    let link = '/movies/nowPlaying/';
    getMovies(request,response,url, header, movietitle, link);
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

   /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    redirect,
    credit,
    upcomingMovies,
    popularMovies,
    nowPlayingMovies,
    getMovie
  };

}