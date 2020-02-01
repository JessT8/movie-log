var React = require('react');
var DefaultLayout = require('../layouts/defaultLayout');
var NavLayout = require('../layouts/navLayout');

class WatchList extends React.Component {
  render() {
    let movies = this.props.movies;
 const watchList = movies.map((movie)=>{
        let img = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        let movie_link = `/movies/${movie.id}`;
        return (<a href={movie_link}>
            <div className="poster m-3" style={{backgroundImage: `url(${img})`}}></div></a>)
    });
    return (
        <DefaultLayout title="My WatchList">
        <NavLayout loggedIn={this.props.loggedIn}></NavLayout>
        {watchList}
        </DefaultLayout>
    );
  }
}

module.exports = WatchList;