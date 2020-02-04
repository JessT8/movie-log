/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
  let getPeople = (userid, callback)=>{
    let query = 'SELECT * FROM users WHERE NOT EXISTS (SELECT * FROM follow WHERE follow.userid=users.id AND follow.followerid=$1 ) AND NOT users.id=$1';
    let values = [userid];

    dbPoolInstance.query(query, values, (error, queryResult)=>{
        if(error){
            callback(error, null);
        }else{
            callback(null, queryResult.rows);
        }
    })
  }
    let registerUser = (name, password, callback)=>{
    let insertQuery = 'INSERT INTO users (username,password) VALUES($1,$2) RETURNING *';
    let values = [name, password];
     dbPoolInstance.query(insertQuery, values, (err, queryResult)=>{
        (err)? callback(err, null) : callback(null,queryResult.rows );
     });
 };
 let validateUser = (username,password, callback) => {
    let query = 'SELECT * FROM users WHERE username=$1 AND password=$2';
    let values = [username, password];
    dbPoolInstance.query(query, values, (error, queryResult) => {
        if(error){
            callback(error,null);
        }else{
            callback(null, queryResult.rows);
        }
    });
  };

  // `dbPoolInstance` is accessible within this function scope
  return {
    registerUser,
    validateUser,
    getPeople
  };
};