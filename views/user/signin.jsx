var React = require("react");
var DefaultLayout = require('../layouts/defaultLayout');
var NavLayout = require('../layouts/navLayout');

class SignIn extends React.Component {
  render() {
    let errorMessage = "";
    if(this.props.error){
        errorMessage= (<div class="alert alert-danger text-center p-2" role="alert"><strong>!! {this.props.error}</strong>
            </div>);}
        return (
            <DefaultLayout title="Sign in">
            <NavLayout></NavLayout>
            <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-lg-6">
            <form className="mt-5" method="POST" action="/signin">
            <div className="form-group">
            {errorMessage}
            <h1>Sign in</h1>
            <label htmlFor="name">Username</label>
            <input type="text" className="form-control" name="username" required/>
            <label htmlFor="name">Password</label>
            <input type="password" className="form-control" name="password" required/>
            </div>
            <div className="d-flex flex-row-reverse">
            <button type="submit" className="btn btn-primary btn-customized">Sign in</button>
            </div>
            </form>
            <p>Don't have an account? <a href="/register">Sign up here</a></p>
            </div>
            </div>
            </div>
            </DefaultLayout>
            );
    }
}

module.exports =SignIn;