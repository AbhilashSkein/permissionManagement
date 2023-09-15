const  db  = require("../utils/database");

//post api to create firstname , lastname and email
const registerUser = async (post) => {
  let query = `INSERT INTO userdetail(firstname,lastname,email) VALUES 
  ('${post.firstname}','${post.lastname}','${post.email}')`;
   const result = await db.promise().query(query);
   return result;
};

//post api to create userid,starttime , endtime , date , reason and roles
const permissionPost = async(post)=>{
  let query = `INSERT INTO user(startTime,endTime,status,date,reason,roles) VALUES
  ('${post.startTime}','${post.endTime}','${post.status}','${post.date}','${post.reason}','${post.roles}')`;
  const result = await db.promise().query(query);
  return result
}

//get api to fetch all details of user
const userDetails = async()=>{
  const query = 'SELECT * FROM user';
  const result = await db.promise().query(query);
  return result;
}

//delete api to delete user
const deleteUser = async(userid)=>{
  const query = `delete from user where userId = '${userid.userId}'`
  const result = db.promise().query(query);
  return result;
}

//login 

const checkUser = (user) =>{
  console.log(user,"user===>");
  const query = `select * from registertable where email ='${user.email}' AND password ='${user.password}';`
  const result = db.promise().query(query);
  return result;
}


module.exports = { registerUser, permissionPost, userDetails, deleteUser, checkUser };
