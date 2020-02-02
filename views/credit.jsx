var React = require('react');
var DefaultLayout = require('./layouts/defaultLayout');
var NavLayout = require('./layouts/navLayout');
class Credit extends React.Component {
  render() {
    return (
        <DefaultLayout title="Credit">
         <NavLayout loggedIn={this.props.loggedIn}></NavLayout>
        <div className="center text-center">
        <h2>Credits</h2>
        <div style={{paddingTop:"100px"}}>
        <div style={{border:"5px solid white", padding:"20px 10px", width: "50%", margin:"0 auto"}}>
       <img src="https://www.themoviedb.org/assets/2/v4/logos/312x276-primary-green-74212f6247252a023be0f02a5a45794925c3689117da9d20ffe47742a665c518.png" width="50px" height="50px"/><span className="ml-5" style={{fontSize:"20px"}}>This product uses the TMDb API but is not endorsed or certified by TMDb.</span>
        </div>
        </div>
        </div>
        </DefaultLayout>
        );
}
}

module.exports = Credit;