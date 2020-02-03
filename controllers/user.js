const sha256 = require('js-sha256');
const SALT = "saltCookie";
module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
   let registerPage = (request,response)=>{
    response.render("user/register");
   }
   //register user
   let register = (request,response)=>{
    let username = request.body.username;
    let password = request.body.password;
    let hashpassword = sha256(password+SALT);
    db.users.registerUser(username, hashpassword, (err,result)=>{
        let hashedCookie = sha256(SALT+result[0].id);
                response.cookie('user_id', result[0].id);
                response.cookie('username', username);
                response.cookie('loggedIn', hashedCookie);
        (err)?response.send(err):response.redirect("/");
    });
   }
let signin = (request, response) => {
     const data = {errmsg: ""};
    // (isLoggedIn(request))
    // ? response.redirect("/") :
    response.render("user/signin", data);
  }
   //sign user in
   let signingIn = (request, response)=>{
  let username = request.body.username;
    let password = sha256(request.body.password+SALT);
  db.users.validateUser(username,password,(error, user)=>{
    if(error){
      response.send(error);
        }else{
            if(user.length < 1){
                const data = { errmsg : "Your user name or password is invalid."};
                response.send( data.errmsg);
            }else{
                 let hashedCookie = sha256(SALT+user[0].id);
                response.cookie('user_id', user[0].id);
                response.cookie('username', user[0].username);
                response.cookie('loggedIn', hashedCookie);
                response.redirect('/');
            }
        }
    });
      }
      let signout = (request,response)=>{
    response.clearCookie('user_id');
    response.clearCookie('username');
    response.clearCookie('loggedIn');
    response.redirect("/");
}

let getUsers = (request,response) =>{
    let userid = request.cookies.user_id;
    db.users.getPeople(userid,(error, users)=>{
        if(error){
            response.send("getUsers " + error );
        }else{
            const data = {
                users,
                loggedIn:"true"}
            response.render("user/showusers", data);

        }
    })
}
let followUser = (request, response)=>{
    let userid = request.cookies.user_id;
    let following = request.params.id;
    db.users.setFollowUser(following, userid, (error)=>{
        if(error){
            response.send("followUser " + error);
        }else{
            response.redirect('/people');
        }
    })
}
 let getFollowers = (request,response)=>{
    let userid = request.cookies.user_id;
    db.users.getUsersFollowers(userid, (err, following)=>{
        if(err){
            response.send("Get followers " + err);
        }else{
            const data = {
                users: following,
                loggedIn: "true"
            }
            response.render("user/showfollower", data)
        }
    })
 }
 let getFollowed = (request, response)=>{
    let userid = request.cookies.user_id;
    db.users.getUserFollows(userid, (err, following)=>{
        if(err){
            response.send("Get followed " + err);
        }else{
            const data = {
                users: following,
                loggedIn: "true"
            }
            response.render("user/showfollow", data)
        }
    })
 }
  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    registerPage,
    register,
    signin,
    signingIn,
    signout,
    getUsers,
    followUser,
    getFollowers,
    getFollowed
  };

}