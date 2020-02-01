var React = require('react');
var DefaultLayout = require('../layouts/defaultLayout');
var NavLayout = require('../layouts/navLayout');

class WatchList extends React.Component {
  render() {
    let watchList = "";
    let movies = this.props.movies;
    if(movies !== null ){
    watchList =  movies.map((movie)=>{
        let img = `https://image.tmdb.org/t/p/w500/${movie.poster}`;
        let movie_link = `/movies/${movie.movieid}`;
        return (
            <div className="m-3 watchlist">
            <a href={movie_link}>
            <div className="noanimationposter" style={{backgroundImage: `url(${img})`}}></div></a><div className="d-flex flex-row-reverse center"><div className="icon tick m-5">&#10003;</div><div className="icon heart m-5">&hearts;</div><div className="icon cross m-5">&#10005;</div></div></div>)
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