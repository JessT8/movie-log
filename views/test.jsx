var React = require('react');
var DefaultLayout = require('./layouts/defaultLayout');
var NavLayout = require('./layouts/navLayout');
class Credit extends React.Component {
  render() {
    return (
        <DefaultLayout title="Credit">
         <NavLayout loggedIn="true"></NavLayout>
        <div className="center text-center">
        <h2>Test</h2>
        <form enctype="multipart/form-data" action="/test" method="POST">
  <input type="file" name="myFile"/>
  <input type="submit" class="btn btn-primary"/></form>
        </div>
        </DefaultLayout>
        );
}
}

module.exports = Credit;