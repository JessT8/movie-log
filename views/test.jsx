var React = require('react');
var DefaultLayout = require('./layouts/defaultLayout');
var NavLayout = require('./layouts/navLayout');
class Credit extends React.Component {
  render() {
            let img = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`;
    return (
        <DefaultLayout title="Credit">
         <NavLayout loggedIn="true"></NavLayout>
        <div className="center text-center">
        <h2>Profile</h2>
        <div className="profilePic" style={{backgroundImage: `url(${img})`}}></div>
        <form enctype="multipart/form-data" action="/test" method="POST">
        <div className="d-flex justify-content-center m-5">
                    <input type="file" name="myFile" required/>
                                        </div>
                    <button type="submit" className="btn btn-primary">Edit Profile Pic</button>
                    </form>
        </div>
        </DefaultLayout>
        );
}
}

module.exports = Credit;