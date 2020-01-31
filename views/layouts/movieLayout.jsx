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
        // let genre= " ";
        // movie.genre_ids.map((genre)=>{
        //     genre+= genre+', '
        // });
        // genre = genre.replace(/,\s*$/, "");
        // return (<div className="mh-100 mb-2 mt-2" style={style}><h5 className="pt-1 pl-2 pr-4">{movie.title}</h5><p className="pt-1 pb-1 pl-4 pr-4">{genre}</p>
        //     </div>)      <img className="embed-responsive-item bg-light"src={img} />;
        let img = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        return (
            <div className="poster m-3" style={{backgroundImage: `url(${img})`}}></div>)
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