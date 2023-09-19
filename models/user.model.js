const db = require("../utils/database");

//post api to create firstname , lastname and email
const registerUser = async (post) => {
  let query = `INSERT INTO users(email,password, firstname,lastname) VALUES 
  ('${post.email}', '${post.password}', '${post.firstname}','${post.lastname}')`;
  const result = await db.promise().query(query);
  return result;
};

const duplicateMail = async(user) =>{
  let query = `select * from users where email = '${user.email}'`;
  const result = await db.promise().query(query);
  return result;
}

//post api to create userid,starttime , endtime , date , reason and roles
const permissionPost = async (post) => {
  let query = `INSERT INTO userDetails(startTime,endTime,status,date,reason,roles) VALUES
  ('${post.startTime}','${post.endTime}','${post.status}','${post.date}','${post.reason}','${post.roles}')`;
  const result = await db.promise().query(query);
  return result;
};

//get api to fetch all details of user
const userDetails = async () => {
  const query = "SELECT * FROM userDetails";
  const result = await db.promise().query(query);
  return result;
};
const uniqueUserDetail = async (user) => {
  const query = `select users.user_id,users.email,userdetails.startDate,userdetails.endDate,userDetails.status
                from users
                JOIN userdetails ON users.user_Id =  userdetails.user_Id
                where users.email = '${user.email}'`; 
  const result = await db.promise().query(query);
  return result;
};


//delete api to delete user
const deleteUser = async (userid) => {
  const query = `delete from user where userId = '${userid.userId}'`;
  const result = db.promise().query(query);
  return result;
};

//login

const checkUser = (user) => {
  console.log(user, "user===>");
  const query = `select * from users where email ='${user.email}' AND password ='${user.password}';`;
  const result = db.promise().query(query);
  return result;
};

//forgotpassword

const forgotPassword = (user) => {
  console.log(user,"user123====>");
  const query = `select * from users where email ='${user.email}';`;
  const result = db.promise().query(query);
  return result;
};

const insertNewCredentials = (user) => {
  // console.log("newpassword",user)
  const insertQuery = `UPDATE users SET password='${user.newPassword}' WHERE email = '${user.email}'`;
  const result = db.promise().query(insertQuery);
  return result;
};

const updateNewPassword = (user) => {
  // console.log("newpassword",user)
  const insertQuery = `UPDATE users SET password='${user.password}' WHERE email = '${user.email}'`;
  console.log("====>",insertQuery);
  const result = db.promise().query(insertQuery);
  return result;
};

const formData = async(user)=>{
  let query = `INSERT INTO userDetails(startTime,endTime,date,reason,user_Id) 
  VALUES('${user.startTime}', '${user.endTime}', '${user.date}','${user.reason}','${user.user_Id}')`;
  const result = await db.promise().query(query);
  return result;
}

module.exports = {
  registerUser,
  duplicateMail,
  permissionPost,
  userDetails,
  deleteUser,
  checkUser,
  forgotPassword,
  insertNewCredentials,
  updateNewPassword,
  uniqueUserDetail,
  formData
};
