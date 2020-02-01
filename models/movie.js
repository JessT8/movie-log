/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope
  let addMovies = (movie, userid,callback)=>{
    let query = "INSERT INTO movie ( movieid,title,plot,poster) VALUES ($1, $2,$3,$4)";
    let values = [movie.id, movie.title, movie.overview, movie.poster_path];
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
  let addBookmark = (movieid, userid, callback)=>{
    let query = "INSERT INTO watchlist (movieid,userid) VALUES ($1,$2)";
    let values = [movieid, userid];
    dbPoolInstance.query(query,values, (err)=>{
        if(err){
            console.log(err);
            callback(err);
        }else{
            callback(null);
        }
    })
  }
  let checkBookmark = (movieid,userid, callback)=>{
     let query = "SELECT * FROM watchlist WHERE movieid=$1 AND userid=$2";
      let values = [movieid, userid];
    dbPoolInstance.query(query,values, (err, resultQuery)=>{
        if(err){
            console.log(err);
            callback(err, null);
        }else{
           (resultQuery.rows.length>0)?callback(null, resultQuery.rows):callback(null, null);
        }
    })
  }
  return {
    checkBookmark,
    addBookmark,
    checkMovies
  };
};