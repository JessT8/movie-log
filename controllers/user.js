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
                loggedIn: "true",
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
let profile = (request, response)=>{
    let userid = request.cookies.user_id;
    db.users.getProfile(userid,(err, img)=>{
        if(err){
            response.send("Upload profile" + err);
        }else{
            const data = {
                img:`https://res.cloudinary.com/do3q60bdd/image/upload/v${img[0].version}/${img[0].public_id}.png`
            }
            response.render("user/profile",data);}});
};
let uploadProfile = (request, response)=>{
    let userid = request.cookies.user_id;
    db.users.getProfile(userid,(err, img)=>{
        if(err){
            response.send("Upload profile" + err);
        }else{
            //if results
            if(img[0].public_id){
               cloudinary.uploader.destroy(img[0].public_id, function(res){
                console.log("done");
                console.log(res);
            })}
               cloudinary.uploader.upload(request.file.path, function(result) {
                let res = result;
                console.log(res);
                db.users.uploadProfile(res.version, res.public_id,userid,(error)=>{
                    const data = {
                        check:img[0].public_id,
                        img:`https://res.cloudinary.com/do3q60bdd/image/upload/v${res.version}/${res.public_id}.png`
                    }

                    response.render("user/profile", data)
                });
            }, {
                folder: 'Profile_pics',
                use_filename: true
            });
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
    getFollowed,
    profile,
    uploadProfile
};

}