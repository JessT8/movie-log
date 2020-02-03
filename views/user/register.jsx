var React = require("react");
var DefaultLayout = require('../layouts/defaultLayout');
var NavLayout = require('../layouts/navLayout');
class Register extends React.Component {
  render() {
     let errorMessage = "";
    if(this.props.error){
        errorMessage= (<div class="alert alert-danger text-center p-2" role="alert"><strong>!! {this.props.error}</strong>
            </div>);}
    return (
        <DefaultLayout title="Register">
        <NavLayout></NavLayout>
        <div className="container h-100">
    <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-8 col-lg-6">
<form className="mt-5" method="POST" action="/register">
  <div className="form-group">
  {errorMessage}
  <h1>Register</h1>
    <label htmlFor="name">Username</label>
    <input type="text" className="form-control" name="username" required/>
    <label htmlFor="name">Password</label>
    <input type="password" className="form-control" name="password" required/>
    </div>
     <div className="d-flex flex-row-reverse">
    <button type="submit" className="btn btn-primary btn-customized">Register</button>
    </div>
    </form>
     <p>Already have an account? <a href="/signin">Sign in here</a></p>
    </div>
    </div>
    </div>
        </DefaultLayout>
    );
  }
}

module.exports =Register;