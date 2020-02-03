var React = require('react');
var DefaultLayout = require('../layouts/defaultLayout');
var NavLayout = require('../layouts/navLayout');
var MovieLayout = require('../layouts/movieLayout');

class ShowFollower extends React.Component {
  render() {
    let users = this.props.users;
    let userDisplay = "";
    if(users !== undefined ){
    userDisplay =  users.map((user)=>{
        let img = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`;
               let individual = `/people/watchlist/${user.followerid}`;
        return (
            <div className="m-3 poster text-center">
                    <a href={individual}>
            <div className="profilePic" style={{backgroundImage: `url(${img})`}}></div></a><div><h3>{user.username}</h3></div></div>);
    });
    }else{
          userDisplay = (<div>No followers</div>)
    }
    return (
        <DefaultLayout title="Follower">
        <NavLayout loggedIn={this.props.loggedIn}></NavLayout>
        <div className="center">
        <h2>Follower</h2>
        <div className="row d-flex">
        {userDisplay}
        </div>
        </div>
        </DefaultLayout>
    );
  }
}

module.exports = ShowFollower;