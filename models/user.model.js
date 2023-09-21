const db = require("../utils/database");

//post api to create firstname , lastname and email
const registerUser = async (post) => {
  let query = `INSERT INTO users(email,password, firstname,lastname) VALUES 
  ('${post.email}', '${post.password}', '${post.firstname}','${post.lastname}')`;
  const result = await db.promise().query(query);
  return result;
};

const googleSign = async(user) =>{
  let query = `select * from users where email = '${user.email}'`;
  const result = await db.promise().query(query);
  return result;
}

const duplicateMail = async(user) =>{
  let query = `select * from users where email = '${user.email}'`;
  const result = await db.promise().query(query);
  return result;
}

//get api to fetch all details of user
const userDetails = async () => {
  const query = "SELECT * FROM users";
  const result = await db.promise().query(query);
  return result;
};
const uniqueUserDetail = async (user) => {
  const query = `select users.user_id,users.email,users.firstname,users.lastname,
                userdetails.startDate,userdetails.endDate,userdetails.status,
                userdetails.startTime,userdetails.endTime,userdetails.date,userdetails.reason
                from users
                JOIN userdetails ON users.user_Id =  userdetails.user_Id
                where users.email = '${user.email}'`; 
  const result = await db.promise().query(query);
  return result;
};


//delete api to delete user
const deleteUser = async (user) => {
  const query = `delete from users where user_Id = '${user.userId}'`;
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
  let query = `INSERT INTO userdetails(startTime,endTime,date,reason,user_Id) 
  VALUES('${user.startTime}', '${user.endTime}', '${user.date}','${user.reason}','${user.user_Id}')`;
  const result = await db.promise().query(query);
  return result;
}

module.exports = {
  registerUser,
  duplicateMail,
  userDetails,
  deleteUser,
  checkUser,
  forgotPassword,
  insertNewCredentials,
  updateNewPassword,
  uniqueUserDetail,
  formData,
  googleSign
};
