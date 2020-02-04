var React = require("react");
var DefaultLayout = require('../layouts/defaultLayout');
var NavLayout = require('../layouts/navLayout');
class Credit extends React.Component {
  render() {
            let img = (this.props.check!== undefined)? this.props.img:`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`;
           const style = {
            backgroundImage: `url(${img})`
           }
    return (
        <DefaultLayout title="Profile">
         <NavLayout loggedIn="true"></NavLayout>
        <div className="center text-center">
        <h2>Profile</h2>
        <div id="profileImage" className="profilePic" style={style}></div>
        <form enctype="multipart/form-data" action="/profile" method="POST">
        <div className="d-flex justify-content-center m-5">
                    <input type="file" name="myFile" required/>
                                        </div>
                    <button id="uploadImage" className="btn btn-primary">Edit Profile Pic</button>
                    </form>
        </div>
        </DefaultLayout>
        );
}
}

module.exports = Credit;