var React = require('react');
class NavLayout extends React.Component {
  render() {
    let displayLogout = "false";
    if(this.props.loggedIn === "true"){
        displayLogout =  (<div className="d-flex flex-row-reverse align-items-end"><a className="nav-link mt-4" href="/signout">Sign out</a>
 <div class="dropdown">
  <button class="dropbtn">Me</button>
  <div class="dropdown-content">
    <a href="#">My watchlist</a>
    <a href="#">Completed</a>
  </div>
</div><a className="nav-link mt-4" href="#">People</a><a className="nav-link mt-4" href="/">Movies</a><a className="nav-link mt-4" href="/about">About</a></div>);
    }else{
          displayLogout =  (<div className="d-flex flex-row-reverse align-items-end"><a className="nav-link mt-4" href="/signin">Sign In</a><a className="nav-link mt-4" href="/">Movies</a><a className="nav-link mt-4" href="/about">About</a></div>);
    }

    return (
        <div>
      <nav className="navbar navbar-expand-lg d-flex navbar-transparent">
      <h2 className="pl-1"><a href="/" style={{textDecoration:"none", color:"#FFFF0A"}}>Movie-log</a></h2>
  <div className="collapse navbar-collapse">
    {displayLogout}
      </div>
        </nav>
        </div>
    );
  }
}

module.exports = NavLayout;