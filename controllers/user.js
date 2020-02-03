const sha256 = require('js-sha256');
const SALT = "saltCookie";

const isLoggedIn = (request) => {
     let user_id = request.cookies.user_id;
     let hashedCookie = sha256(SALT+user_id);
     return ( request.cookies.loggedIn === hashedCookie) ? true : false;
}

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
    db.users.registerUser(username, hashpassword, (err,user)=>{
        if(err){
            if(err.code = 23505){
                const data = {error : "Please choose another username"}
                response.render("user/register", data)
            }
            else{
                    response.send(err);
                }
        }else{
        let hashedCookie = sha256(SALT+user[0].id);
                response.cookie('user_id', user[0].id);
                response.cookie('username', username);
                response.cookie('loggedIn', hashedCookie);
                response.redirect('/');
         }
    });
   }
let signin = (request, response) => {
     const data = {errmsg: ""};
    (isLoggedIn(request))
    ? response.redirect("/") :
    response.render("user/signin", data);
  }

let signingIn = (request, response)=>{
  let username = request.body.username;
  let password = sha256(request.body.password+SALT);
  db.users.validateUser(username,password,(error, user)=>{
    if(error){
      response.send(error);
        }else{
            if(user.length < 1){
                const data = { error : "Your user name or password is invalid."};
                response.render("user/signin", data);
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