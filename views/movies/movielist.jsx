var React = require('react');
var DefaultLayout = require('../layouts/defaultLayout');
var NavLayout = require('../layouts/navLayout');
var MovieLayout = require('../layouts/movieLayout');

class MovieList extends React.Component {
  render() {
    return (
        <DefaultLayout title={this.props.pagetitle}>
        <NavLayout loggedIn={this.props.loggedIn}></NavLayout>
        <MovieLayout movies={this.props.movies} header={this.props.header}></MovieLayout>
        </DefaultLayout>
    );
  }
}

module.exports = MovieList;