var React = require('react');
var DefaultLayout = require('../layouts/defaultLayout');
var NavLayout = require('../layouts/navLayout');
var MovieLayout = require('../layouts/movieLayout');
class Movie extends React.Component {
  render() {
    let bookmark = "";
    console.log("In movie react");
    if(this.props.bookmarked === true){
        bookmark = (
            <h2><button id="bookmarked" disabled><span className="glyphicon glyphicon-bookmark"></span></button> {this.props.movie.title}</h2>);
    }else{
        let bookmarkLink = `/movies/${this.props.movie.id}`
        bookmark = (<form method="POST" action={bookmarkLink}>
            <h2 ><button id="bookmark" type="submit"><span className="glyphicon glyphicon-bookmark"></span></button> {this.props.movie.title}
            </h2>
            </form>);
    }
    let videos= this.props.movie.videos.results;
    let key = videos.filter(video => video.type === 'Trailer');
    let videoSrc = `https://www.youtube.com/embed/${key[0].key}`;

    return (
        <DefaultLayout title={this.props.movie.title}>
        <NavLayout loggedIn={this.props.loggedIn}></NavLayout>
        <div className="row m-0">
        <div className="col pt-5">
        <iframe className="pt-2" width="854" height="480"
        src={videoSrc} allowFullScreen={true}>
        </iframe>
        </div>
        <div className="col">
        {bookmark}
        <p>{this.props.movie.overview}</p>
        </div>
        </div>
        </DefaultLayout>
        );
}
}

module.exports = Movie;