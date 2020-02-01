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
        (err)?response.send(err):response.render("user/signin");
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
                console.log(user);
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
    signout
  };

}