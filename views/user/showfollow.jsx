var React = require('react');
var DefaultLayout = require('../layouts/defaultLayout');
var NavLayout = require('../layouts/navLayout');
var MovieLayout = require('../layouts/movieLayout');

class ShowFollow extends React.Component {
  render() {
    let userDisplay = "";
    if(this.props.users.length !== 0 && this.props.users){
            let users = this.props.users;
    userDisplay =  users.map((user)=>{
              let img =(user.public_id)? `https://res.cloudinary.com/do3q60bdd/image/upload/v${user.version}/${user.public_id}.png` : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`;
        const style = {
            backgroundImage: `url(${img})`
           }
        let individual = `/people/movielist/${user.userid}`;
        return (
            <div className="m-3 poster text-center">
            <a href={individual}>
            <div className="profilePic" style={style}></div></a><div><h3>{user.username}</h3></div></div>);
    });
    }else{
       userDisplay = (<div style={{ margin:"0 auto", paddingTop:"100px"}}>
        <div style={{border:"5px solid white", padding:"20px 10px"}}>Currently no follows</div></div>)
    }
    return (
        <DefaultLayout title="Followed">
        <NavLayout loggedIn={this.props.loggedIn}></NavLayout>
        <div className="center">
        <h2>Follow</h2>
        <div className="row d-flex">
        {userDisplay}
        </div>
        </div>
        </DefaultLayout>
    );
  }
}

module.exports = ShowFollow;