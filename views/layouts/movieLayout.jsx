var React = require('react');

class MovieLayout extends React.Component {
  render() {
  let movies = this.props.movies;
    const style = {
        width: "100%",
        minHeight: "50px",
        backgroundColor: "rgba(0,0,255,0.1)"
        };
    const movieList = movies.map((movie)=>{
        let img = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        let movie_link = `/movies/${movie.id}`;
        return (<a href={movie_link}>
            <div className="poster m-3" style={{backgroundImage: `url(${img})`}}></div></a>)
    });
    return (
        <div>
        <div className="row d-flex justify-content-center">
        {movieList}
        </div>
        </div>
    );
  }
}

module.exports = MovieLayout;