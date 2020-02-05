var React = require('react');
var DefaultLayout = require('../layouts/defaultLayout');
var NavLayout = require('../layouts/navLayout');

class PersonalList extends React.Component {
  render() {
    let movielist = "";

    if(this.props.movies){
        let movies = this.props.movies;
        movielist =  movies.map((movie)=>{
            let img = `https://image.tmdb.org/t/p/w500/${movie.poster}`;
            let movie_link = `/movies/${movie.movieid}`;
            let deleteLink = `/movielist/${movie.movieid}/delete?_method=delete`;
            let favoriteClass = (movie.favorite)?"icon m-5 clickedHeart":"icon m-5 heart";
            let completeClass = (movie.completed)?"icon m-5 clickedTick":"icon m-5 tick";
            return (
                <div className="m-3 movielist">
                <a href={movie_link}>
                <div className="poster" style={{backgroundImage: `url(${img})`}}></div></a><div className="d-flex flex-row-reverse center"><button className={completeClass} value={movie.movieid}>&#10003;</button><button value={movie.movieid} className={favoriteClass}>&hearts;</button><form method="POST" action={deleteLink}><button type="submit" className="icon cross m-5">&#10005;</button></form></div></div>);
        });
    }else{
      movielist = (<div style={{ margin:"0 auto", paddingTop:"100px"}}>
        <div style={{border:"5px solid white", padding:"20px 10px"}}>Currently no movies in list</div></div>)
  }
  return (
    <DefaultLayout title={this.props.header}>
    <NavLayout loggedIn="true"></NavLayout>
    <div className="center">
    <div className="d-flex flex-row">
    <h2>{this.props.header}</h2>
    <div className="dropdown">
    <button id="filter" className="dropbtn ml-2 pt-3  glyphicon glyphicon-menu-down" style={{fontSize:"20px;"}}></button>
    <div className="dropdown-content">
    <a id="allMovie" className="navLink" href="/movielist">All</a>
    <a id="favorite" className="navLink" href="/favorite">Favorites</a>
    <a id="completed" className="navLink" href="/completed">Completed</a>
    </div>
    </div>
    </div>
    <div className="row d-flex">
    {movielist}
    </div>
    </div>
    </DefaultLayout>
    );
}
}

module.exports = PersonalList;