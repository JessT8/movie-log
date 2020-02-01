var React = require('react');

class MovieLayout extends React.Component {
  render() {
  let movies = this.props.movies;
    const movieList = movies.map((movie)=>{
        let img = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        let movie_link = `/movies/${movie.id}`;
        return (<a href={movie_link}>
            <div className="poster m-3" style={{backgroundImage: `url(${img})`}}></div></a>)
    });
    return (
        <div className="center">
        <div className="row d-flex">
        {movieList}
        </div>
        </div>
    );
  }
}

module.exports = MovieLayout;