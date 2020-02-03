var React = require('react');
var DefaultLayout = require('../layouts/defaultLayout');
var NavLayout = require('../layouts/navLayout');

class WatchList extends React.Component {
  render() {
    let watchList = "";

    if(this.props.movies){
        let movies = this.props.movies;
    watchList =  movies.map((movie)=>{
        let img = `https://image.tmdb.org/t/p/w500/${movie.poster}`;
        let movie_link = `/movies/${movie.movieid}`;
        let favoriteLink = `/watchlist/${movie.movieid}/favorite`;
        let deleteLink = `/watchlist/${movie.movieid}/delete?_method=delete`;
        let completeLink = `/watchlist/${movie.movieid}/complete`;
        let favoriteClass = (movie.favorite)?"icon m-5 clickedHeart":"icon m-5 heart";
        let completeClass = (movie.completed)?"icon m-5 clickedTick":"icon m-5 tick";
        return (
            <div className="m-3 watchlist">
            <a href={movie_link}>
            <div className="noanimationposter" style={{backgroundImage: `url(${img})`}}></div></a><div className="d-flex flex-row-reverse center"><form method="POST" action={completeLink}><button type="submit" className={completeClass}>&#10003;</button></form><form method="POST" action={favoriteLink}><button type="submit" className={favoriteClass}>&hearts;</button></form><form method="POST" action={deleteLink}><button type="submit" className="icon cross m-5">&#10005;</button></form></div></div>);
    });
    }else{
          watchList = (<div>No movie added to watchlist</div>)
    }
    return (
        <DefaultLayout title="My WatchList">
        <NavLayout loggedIn="true"></NavLayout>
                <div className="center">
                <h2>WatchList</h2>
                <div className="row d-flex">
                {watchList}
                </div>
        </div>
        </DefaultLayout>
    );
  }
}

module.exports = WatchList;