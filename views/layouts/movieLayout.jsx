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
    let displayPageNav = ""
    if(this.props.nav!== undefined){
    let next = "";
    if(this.props.nav.next!== undefined){
        let link = `/movies/upcoming/${this.props.nav.next}`;
        next = <a className="ml-5 mr-5 glyphicon glyphicon-chevron-right" href={link}></a>
        }else{
           next = <a className="ml-5 mr-5 glyphicon glyphicon-chevron-right"></a>
        }
    let previous = "";
    if(this.props.nav.previous!== undefined){
        let link = `/movies/upcoming/${this.props.nav.previous}`;
        previous = <a className="ml-5 mr-5 glyphicon glyphicon-chevron-left" href={link}></a>
        }else{
            previous = <a className="ml-5 mr-5 glyphicon glyphicon-chevron-left"></a>
        }
        displayPageNav = (<div className="pageNav mt-3 mb-5">{previous}<span className="ml-5 mr-5">Page {this.props.nav.current}</span>{next}</div>);
    }
    return (
        <div className="center">
        <h2>{this.props.header}</h2>
        <div className="row d-flex">
        {movieList}
        {displayPageNav}
        </div>
        </div>
    );
  }
}

module.exports = MovieLayout;