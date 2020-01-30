const sha256 = require('js-sha256');
const SALT = "saltCookie";
module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
   let signin = (request, response)=>{
    response.send("Working");
      }
  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    signin
  };

}