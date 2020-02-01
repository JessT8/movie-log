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
     const data = {movies:movie_data.results,loggedIn };
     //
     // const data = {
     //    movies:[
     //    {poster_path: "/pwpGfTImTGifEGgLb3s6LRPd4I6.jpg"},
     //    {poster_path: '/m8eFedsS7vQCZCS8WGp5n1bVD0q.jpg'},
     //    {poster_path: '/wfPHdfofBD5PN96dV96a51B3Ja2.jpg'},
     //    {poster_path: '/3W0v956XxSG5xgm7LB6qu8ExYJ2.jpg'},
     //    {poster_path: '/v6xrz4fr92KY1oNC3HsEvrsvR1n.jpg'},
     //    {poster_path: '/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg'},
     //    {poster_path: '/pKKvCaL1TPTVtbI6EeliyND3api.jpg'},
     //    {poster_path: '/pKKvCaL1TPTVtbI6EeliyND3api.jpg'}
     //    ],
     //    loggedIn
     // }
    response.render("movies/movielist", data);
   }
    let getMovie = async (request, response)=>{

     let loggedIn = (isLoggedIn(request))?"true": "false";
    let movie_id = request.params.id;
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.MOVIE_API_KEY}&append_to_response=videos`;
    const movie_response = await fetch(url);
    const movie_data = await movie_response.json();
        // const data = {title:"test",loggedIn };
const data = {title:"test",
movies:movie_data.results,
        // movies:[
        // {poster_path: "/pwpGfTImTGifEGgLb3s6LRPd4I6.jpg"},
        // {poster_path: '/m8eFedsS7vQCZCS8WGp5n1bVD0q.jpg'},
        // {poster_path: '/wfPHdfofBD5PN96dV96a51B3Ja2.jpg'},
        // {poster_path: '/3W0v956XxSG5xgm7LB6qu8ExYJ2.jpg'},
        // {poster_path: '/v6xrz4fr92KY1oNC3HsEvrsvR1n.jpg'},
        // {poster_path: '/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg'},
        // {poster_path: '/pKKvCaL1TPTVtbI6EeliyND3api.jpg'},
        // {poster_path: '/pKKvCaL1TPTVtbI6EeliyND3api.jpg'}
        // ],
        loggedIn}
    response.render("movies/movie",data);
    }
    let bookmarkMovie = (request, response) =>{
        console.log("Controller bookmarkMovie");
        let movies = {id:"1",title:"fjjs",plot:"plot", poster:"ndfsj"};
                console.log(request.cookies.user_id);
        let user_id = request.cookies.user_id;
         db.movie.addBookmark(movies, user_id, (error)=>{
            if(error){
                response.send(error);
            }else{
        response.send("bookmarkMovie");}
    });
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
    bookmarkMovie
  };

}