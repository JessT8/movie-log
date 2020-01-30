const sha256 = require('js-sha256');
const SALT = "saltCookie";
module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   **/
   let movielist = (request,response)=>{
    response.send("movielist");
   }
  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    movielist
  };

}