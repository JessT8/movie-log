var React = require('react');

class MovieLayout extends React.Component {
  render() {
    let movieList = "";
    if(this.props.movies){
  let movies = this.props.movies;
    movieList = movies.map((movie)=>{
        let img = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        let movie_link = `/movies/${movie.id}`;
        return (<a href={movie_link}>
            <div className="poster m-3" style={{backgroundImage: `url(${img})`}}></div></a>)
    });
    }else{
        movieList = (<div style={{ margin:"0 auto", paddingTop:"100px"}}>
        <div style={{border:"5px solid white", padding:"20px 10px"}}>Currently no movies</div></div>);
    }

    let displayPageNav = ""
    if(this.props.nav!== undefined){
    let next = "";
    if(this.props.nav.next!== undefined){
        let link = `${this.props.nav.link}${this.props.nav.next}`;
        next = <a className="ml-5 mr-5 glyphicon glyphicon-chevron-right" href={link}></a>
        }else{
           next = <p className="ml-5 mr-5 glyphicon glyphicon-chevron-right"></p>
        }
    let previous = "";
    if(this.props.nav.previous!== undefined){
        let link = `${this.props.nav.link}${this.props.nav.previous}`;
        previous = <a className="ml-5 mr-5 glyphicon glyphicon-chevron-left" href={link}></a>
        }else{
            previous = <p className="ml-5 mr-5 glyphicon glyphicon-chevron-left"></p>
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