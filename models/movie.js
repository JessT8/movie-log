/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope
  let addMovies = (movie, userid,callback)=>{
    let query = "INSERT INTO movie ( movieid,title,plot,poster) VALUES ($1, $2,$3,$4)";
    let values = [movie.id, movie.title, movie.plot, movie.poster];
    dbPoolInstance.query(query, values, (err)=>{
    if(err){
         console.log(err);
        callback(err);
    }else{
        callback(null);
    }
  })
  }
  let checkMovies = (movie, userid, callback)=>{
  let query = "SELECT * FROM movie WHERE movieid=$1";
  let values = [movie.id];
  dbPoolInstance.query(query, values, (err, resultQuery)=>{
    if(err){
        console.log(err);
        callback(err);
    }else{
        if(resultQuery.rows > 0){
            callback(null);
        }else{
            addMovies(movie,userid,callback);
        }
    }
  })
  }
  let addBookmark = (movie, userid, callback)=>{
    let query = "INSERT INTO watchlist (movieid,userid) VALUES ($1,$2)";
    let values = [movie.id, userid];
    dbPoolInstance.query(query,values, (err)=>{
        if(err){
            console.log(err);
            callback(err);
        }else{
            console.log(movie.id, userid);
            checkMovies(movie, userid, callback);
        }
    })
  }
  return {
    addBookmark
  };
};