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
        (err)?response.send(err):response.send("registered");
    });
   }
   //sign user in
   let signin = (request, response)=>{
    response.send("Working");
      }
  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    registerPage,
    register,
    signin
  };

}