const sha256 = require('js-sha256');
const SALT = "saltCookie";
const cloudinary = require('cloudinary');
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
 let test = (request, response)=>{
    response.render("test");
 }
let testPost = (request, response)=>{
  cloudinary.uploader.upload(request.file.path, function(result) {
    response.send(result);
  }, {
 folder: 'Profile_pics',
 use_filename: true
});
 }
  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    getUsers,
    followUser,
    getFollowers,
    getFollowed
  };

}