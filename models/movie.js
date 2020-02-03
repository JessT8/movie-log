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
  let watchlist = (userid, callback)=>{
    let query = "SELECT DISTINCT movie.title, movie.movieid, movie.poster, movie.plot, watchlist.favorite, watchlist.completed, watchlist.userid  FROM movie INNER JOIN watchlist ON(watchlist.movieid=movie.movieid) WHERE watchlist.userid=$1";
    let values = [userid];
    dbPoolInstance.query(query, values, (err,resultQuery)=>{
        if(err){
            callback(err,null);
        }else{
            (resultQuery.rows.length>0)?callback(null, resultQuery.rows):
                callback(null,null);
        }
    });
  }
  let addFavorites = (userid, movieid, callback)=>{
    let query = "UPDATE watchlist SET favorite=$1 WHERE userid=$2 AND movieid=$3";
    let values = [true, userid,movieid];
    dbPoolInstance.query(query,values, (err)=>{
        if(err){
            callback(err);
        }else{
            callback(null);
        }
    })
  }
  let addComplete = (userid, movieid, callback)=>{
    let query = "UPDATE watchlist SET completed=$1 WHERE userid=$2 AND movieid=$3";
    let values = [true, userid,movieid];
    dbPoolInstance.query(query,values, (err)=>{
        if(err){
            callback(err);
        }else{
            callback(null);
        }
    })
  }
  let getCompletedMovies = (userid, callback)=>{
    let query = "SELECT movie.movieid AS id, movie.poster AS poster_path FROM movie INNER JOIN watchlist ON (movie.movieid=watchlist.movieid) WHERE watchlist.userid=$1 AND watchlist.completed = true"
    let values = [userid];
     dbPoolInstance.query(query,values, (err, resultQuery)=>{
        if(err){
            callback(err, null);
        }else{
            callback(null, resultQuery.rows);
        }
    })
  }
  let getFavoriteMovies = (userid, callback)=>{
    let query = "SELECT movie.movieid AS id, movie.poster AS poster_path FROM movie INNER JOIN watchlist ON (movie.movieid=watchlist.movieid) WHERE watchlist.userid=$1 AND watchlist.favorite=true"
    let values = [userid];
     dbPoolInstance.query(query,values, (err, resultQuery)=>{
        if(err){
            callback(err, null);
        }else{
            callback(null, resultQuery.rows);
        }
    })
  }
  let individualWatchlist = (userid, callback)=>{
    let query = "SELECT DISTINCT movie.movieid AS id, movie.poster AS poster_path, watchlist.userid  FROM movie INNER JOIN watchlist ON(watchlist.movieid=movie.movieid) WHERE watchlist.userid=$1";
    let values = [userid];
    dbPoolInstance.query(query, values, (err,resultQuery)=>{
        if(err){
            callback(err,null);
        }else{
            (resultQuery.rows.length>0)?callback(null, resultQuery.rows):
                callback(null,null);
        }
    });
  }
  let removeMovie =( userid, movieid, callback)=>{
    let query = `DELETE FROM watchlist WHERE movieid=$1 AND userid=$2`;
    let values = [movieid, userid];
     dbPoolInstance.query(query,values,(error) => {
      (error)?callback(error):callback(null);
    });
  };
  return {
    checkBookmark,
    addBookmark,
    checkMovies,
    watchlist,
    addFavorites,
    addComplete,
    getCompletedMovies,
    getFavoriteMovies,
    removeMovie,
    individualWatchlist
  };
};