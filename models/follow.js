    /**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

 let setFollowUser = (userid, followerid, callback)=>{
    let query = `INSERT INTO follow (userid, followerid) VALUES($1,$2)`;
    let values = [userid, followerid];
    dbPoolInstance.query(query, values, (err)=>{
        if(err){
            callback(err);
        }else{
            callback(null);
        }
    })
 }

 let getUserFollows = (follower, callback)=>{
  let query = 'SELECT * FROM users INNER JOIN follow ON (users.id = follow.userid) WHERE follow.followerid=$1';
    let values = [follower];
    dbPoolInstance.query(query, values, (error, queryResult) => {
      if( error ){
        callback(error,null);
      }else{
          callback(null,queryResult.rows);
      }
    });
  };
  let getUsersFollowers = (userid,callback)=>{
    let query =  `SELECT * FROM users INNER JOIN follow ON(users.id = follow.followerid) WHERE follow.userid=$1`;
    let values = [userid];
    dbPoolInstance.query(query,values,(error,queryResult)=>{
        (error)?callback(error,null):callback(null,queryResult.rows);
    });
  };

  // `dbPoolInstance` is accessible within this function scope
  return {
    setFollowUser,
    getUserFollows,
    getUsersFollowers
  };
};