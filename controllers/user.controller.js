const postmodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";


const regUser = async (req, res) => {
  const { firstname, lastname, email } = req.body;
  const post = { firstname, lastname, email };
  console.log(post);

  const [userInsert] = await postmodel.registerUser(post);
  if (userInsert.affectedRows > 0) {
    res.send({
      status: 200,
      message: "User Inserted Successfully",
    });
  }
};

const userGet = async (req, res) => {
  const { userId, startTime, endTime, status, date, reason, roles } = req.body;
  const loggedDetails = {
    userId,
    startTime,
    endTime,
    status,
    date,
    reason,
    roles,
  };
  const [user] = await postmodel.permissionPost(loggedDetails);
  if (user.affectedRows > 0) {
    res.send({
      status: 200,
      message: "Successfully posted",
    });
  }
};

const getUsers = async (req, res) => {
  let [gett] = await postmodel.userDetails();
  if (gett.length > 0) {
    res.status(200).json(gett);
  }
};

const deleteUsers = async (req, res) => {
  const userid = req.params;
  let [delUser] = await postmodel.deleteUser(userid);
  console.log(delUser, "=====>");
  if (delUser.affectedRows > 0) {
    console.log("working");
    res.send({
      status: true,
      statuscodes: 200,
      message: "user deleted successfully",
    });
  }
};

//login api

const login = async (req, res) => {
  console.log("req body-----", req.body, typeof req.body);
  const { email, password } = req.body;
  const [userCheck] = await postmodel.checkUser({ email, password });
  // console.log("userCheck-----", userCheck);

  let jwtToken = jwt.sign({ userCheck }, secretKey, { expiresIn: "100s" });
  // console.log(jwtToken);

    const decoded = jwt.verify(jwtToken, secretKey);
    console.log('JWT verified successfully===>:', decoded);
  
  const token = req.header('Authorization');

  if(!token){
    return res.status(401).json({message:"missing token"});
  }else{

  }


  if (userCheck.length > 0) {
    console.log("res.send");
    res.send({
      status: true,
      statuscodes: 200,
      message: "login successfull",
      token: jwtToken,
    });
  }
};

module.exports = { regUser, userGet, getUsers, deleteUsers, login };
