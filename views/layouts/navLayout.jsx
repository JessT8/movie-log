var React = require('react');
class NavLayout extends React.Component {
  render() {
    let displayLogout = "false";
    if(this.props.loggedIn === "true"){
        displayLogout =  (<div className="d-flex flex-row-reverse align-items-end"><a className="nav-link mt-4 navLink" href="/signout">Sign out</a>
 <div className="dropdown">
  <button id="meNav" className="dropbtn">Me</button>
  <div className="dropdown-content">
    <a id="movielist" className="navLink" href="/movielist">My List</a>
    <a id="profile" className="navLink" href="/profile">Profile</a>
  </div>
</div><div className="dropdown">
  <button id="peopleNav" className="dropbtn">People</button>
  <div className="dropdown-content">
    <a id="allPeople" className="navLink" href="/people">All</a>
    <a id="Followed" className="navLink" href="/followed">Follow</a>
    <a id="Followers" className="navLink" href="/followers">Followers</a>
  </div>
</div><div className="dropdown">
  <button id="movieNav" className="dropbtn">Movies</button>
  <div className="dropdown-content">
    <a id="upcoming" className="navLink" href="/">Upcoming</a>
    <a id="popular" className="navLink" href="/movies/popular/1">Popular</a>
    <a id="nowPlaying" className="navLink" href="/movies/nowPlaying/1">Now playing</a>
  </div>
</div><a className="nav-link mt-4 navLink" id="credit" href="/credits">Credits</a></div>);
    }else{
          displayLogout =  (<div className="d-flex flex-row-reverse align-items-end"><a className="nav-link mt-4 navLink" id="signin" href="/signin">Sign In</a><div className="dropdown">
  <button id="movieNav" className="dropbtn">Movies</button>
  <div className="dropdown-content">
    <a id="upcoming" className="navLink" href="/">Upcoming</a>
    <a id="popular" className="navLink" href="/movies/popular/1">Popular</a>
    <a id="nowPlaying" className="navLink" href="/movies/nowPlaying/1">Now playing</a>
  </div>
</div><a className="nav-link mt-4 navLink"  id="credit" href="/credits">Credits</a></div>);
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