var React = require('react');
var DefaultLayout = require('../layouts/defaultLayout');
var NavLayout = require('../layouts/navLayout');
var MovieLayout = require('../layouts/movieLayout');

class UserList extends React.Component {
  render() {
    let userDisplay = "";
    if(this.props.users){
    let users = this.props.users;
    userDisplay =  users.map((user)=>{
        let img = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`;
        let followLink = `/people/${user.id}`;
        return (
            <div className="m-3 profile text-center">
            <div className="profilePic" style={{backgroundImage: `url(${img})`}}></div><div className=""><h3>{user.username}</h3></div><form method="POST" action={followLink}><button type="submit" className="mb-2 btn btn-primary">Follow</button></form></div>);
    });
    }
    return (
        <DefaultLayout title="People">
        <NavLayout loggedIn={this.props.loggedIn}></NavLayout>
        <div className="center">
        <h2>People</h2>
        <div className="row d-flex">
        {userDisplay}
        </div>
        </div>
        </DefaultLayout>
    );
  }
}

module.exports = UserList;