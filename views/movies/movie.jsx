var React = require('react');
var DefaultLayout = require('../layouts/defaultLayout');
var NavLayout = require('../layouts/navLayout');
var MovieLayout = require('../layouts/movieLayout');
/*<iframe className="pt-2" width="854" height="480"
src="https://www.youtube.com/embed/tgbNymZ7vqY" allowFullScreen={true}>
</iframe>*/
class Movie extends React.Component {
  render() {
    return (
        <DefaultLayout title={this.props.title}>
        <NavLayout loggedIn={this.props.loggedIn}></NavLayout>

<div className="row m-0">
<div className="col pt-5">

<p>Genre</p>
</div>
<div className="col">
<form method="POST" action='/movies/'>
<h2><button id="bookmark" type="submit"><span className="glyphicon glyphicon-bookmark"></span></button> {this.props.title}
        </h2>
        </form>
<p>The rise of the Guadalajara Cartel as an American DEA agent learns the danger of targeting narcos in Mexico.</p><p>The rise of the Guadalajara Cartel as an American DEA agent learns the danger of targeting narcos in Mexico.
Stars: Diego Luna, Scoot McNairy, Teresa Ruiz, Michael Peña</p>
</div>
</div>
        </DefaultLayout>
    );
  }
}

module.exports = Movie;