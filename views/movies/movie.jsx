var React = require('react');
var DefaultLayout = require('../layouts/defaultLayout');
var NavLayout = require('../layouts/navLayout');
var MovieLayout = require('../layouts/movieLayout');

class Movie extends React.Component {
  render() {
 // console.log("In movie react");
    let bookmark = "";
    if(this.props.bookmarked === true){
        bookmark = (
            <h2><button className="bookmarked"><span className="glyphicon glyphicon-bookmark"></span></button> {this.props.movie.title}</h2>);
    }else{
        bookmark =(<h2><button className="bookmark" value={this.props.movie.id}><span className="glyphicon glyphicon-bookmark"></span></button> {this.props.movie.title}</h2>);
    }

    let videos= this.props.movie.videos.results;
    let key = videos.filter(video => video.type === 'Trailer');
    let videoSrc = `https://www.youtube.com/embed/${key[0].key}`;
    let options = {year: 'numeric', month: 'long', day: 'numeric' };
    let releasedate  = new Date(this.props.movie.release_date);
    let displayDate = releasedate.toLocaleDateString("en-GB", options);

    return (
        <DefaultLayout title={this.props.movie.title}>
            <NavLayout loggedIn={this.props.loggedIn}></NavLayout>
            <div className="container">
                <div className="row m-0">
                    <div className="col-xs-12 col-sm-6 col-md-6 pt-2">
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe className="pt-2"
                                    src={videoSrc} allowFullScreen={true}>
                            </iframe>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-6">
                        {bookmark}
                        <p>Overview: {this.props.movie.overview}</p>
                        <p>Status: {this.props.movie.status}</p>
                        <p>Release date: {displayDate}</p>
                    </div>
                </div>
            </div>
        </DefaultLayout>
        );
}
}

module.exports = Movie;