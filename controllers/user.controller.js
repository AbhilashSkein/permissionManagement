const postmodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const secretKey = "secretKey";

const regUser = async (req, res) => {
  const { email, password,firstname, lastname,phone  } = req.body;
  const post = { email,password, firstname, lastname,phone};

  const [duplicateMail] =await postmodel.duplicateMail({email});
  console.log(duplicateMail,"====>");
  if(duplicateMail.length > 0){
    res.send({
      status: 404,
      statuscode: false,
      message: "User already exists",
    });
  }else{
    const [userInsert] = await postmodel.registerUser(post);
    if (userInsert?.affectedRows > 0) {
    res.send({
      status: 200,
      statuscode: true,
      message: "User Inserted Successfully",
    });
  }
  }
  
};


const googleSignIn = async(req,res) =>{
  const {email} = req.body; 
  let [signIn] = await postmodel.googleSign({email});
  console.log(signIn,"signin====>");
  jwtToken = jwt.sign({ email }, secretKey, { expiresIn: "1000s" });
  if(signIn.length > 0){
    res.send({
      status: true,
      statuscodes: 200,
      token:jwtToken
    });
  }else{
    res.send({
      status: false,
      message:"user not exists"
    });
  }
}
let jwtToken;
const login = async (req, res) => {
  const { email, password } = req.body;
  const [userCheck] = await postmodel.checkUser({ email, password });
  jwtToken = jwt.sign({ userCheck }, secretKey, { expiresIn: "1000s" });
  if (userCheck.length > 0) {
    res.send({
      status: true,
      statuscodes: 200,
      message: "login successfull",
      token: jwtToken,
    });
  }else{
    res.send({
      status: false,
      statuscodes: 404,
      message: "Invalid credentials",
    });
  }
};


const getUsers = async (req, res) => {
  let [gett] = await postmodel.userDetails();
  if (gett.length > 0) {
    res.status(200).json(gett);
  }
};

const getUniqueUser = async (req, res) => {
  const {email} =req.params ;
  let [gett] = await postmodel.uniqueUserDetail({email});
  if (gett.length > 0) {
    res.status(200).json(gett);
  }
};

const deleteUsers = async (req, res) => {
  const userid = req.params;
  let [delUser] = await postmodel.deleteUser(userid);
  if (delUser.affectedRows > 0) {
    res.send({
      status: true,
      statuscodes: 200,
      message: "user deleted successfully",
    });
  }else{
    res.send({
      status: false,
      statuscodes: 404,
      message: "user not found",
    });
  }
};

//login api


const authentication = (req, res,next) => {
  const tokenn = req.headers['jwt'];
  const decoded = jwt.verify(tokenn, secretKey, { expiresIn: "1000s" });
  console.log("JWT verified successfully===>:", decoded);
  if(decoded){
    req.user = decoded;
    next();
  }else{
    res.send({
      status: false,
      statuscodes: 404,
      message: "Invalid credentials",
    });
  }
  
};


const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const [userCheck] = await postmodel.forgotPassword({ email });
   console.log(userCheck,"userCheck======>");
  if (userCheck.length != 1) {
    res.send({
      status: 400,
      statuscode: false,
      message: "you are not registered",
    });
  } 

  var smtpConfig = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "abhilashtow@gmail.com",
      pass: "sotraimmwvhnygrn",
    },
  };

  const length = 8;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let newPassword = "";
  for (let i = 0; i < length; i++) {
    newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  const dbquery = await postmodel.insertNewCredentials({ email, newPassword });
  // console.log(dbquery,"======>");
  var transporter = nodemailer.createTransport(smtpConfig);
  const mailOptions = {
    from: "abhilashtow@gmail.com",
    to: userCheck[0]?.email,
    subject: "Your random password",
    text: `Your random password is:${newPassword} `,
  };

  if (userCheck.length > 0) {
    transporter.sendMail(mailOptions, () =>
      res.send({
        status: 200,
        statuscode: true,
        message: "Email sent successfully",
      })
    );
  }
};

const updateNewPassword = async(req, res) =>{
  let user = req.user;
  console.log("user",user.email)
  const {email,password} = req.body;
  const [credentials] = await postmodel.updateNewPassword({email, password});
    console.log("===>",credentials)
  if (credentials.affectedRows > 0) {
    res.send({
      status: true,
      statuscodes: 200,
      message: "password updated successfull",
    });
  }
}

const postFormData = async(req, res) =>{
  const {startTime,endTime,date,reason,user_Id} = req.body;
  const [postData] = await postmodel.formData({startTime,endTime,date,reason,user_Id});
  console.log("postData===>",postData)
  if (postData?.affectedRows > 0) {
    res.send({
      status: true,
      statuscodes: 200,
      message: "form submitted successfully",
    });
  }
}

module.exports = {
  regUser,
  getUsers,
  deleteUsers,
  login,
  authentication,
  forgotPassword,
  updateNewPassword,
  getUniqueUser,
  postFormData,
  googleSignIn
};
