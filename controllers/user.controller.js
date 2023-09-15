const postmodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const secretKey = "secretKey";

const regUser = async (req, res) => {
  const { firstname, lastname, email } = req.body;
  const post = { firstname, lastname, email };

  const [userInsert] = await postmodel.registerUser(post);
  if (userInsert.affectedRows > 0) {
    res.send({
      status: 200,
      statuscode: true,
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
      statuscode: true,
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
  if (delUser.affectedRows > 0) {
    res.send({
      status: true,
      statuscodes: 200,
      message: "user deleted successfully",
    });
  }
};

//login api
let jwtToken;
const login = async (req, res) => {
  const { email, password } = req.body;
  const [userCheck] = await postmodel.checkUser({ email, password });
  jwtToken = jwt.sign({ userCheck }, secretKey, { expiresIn: "100s" });
  if (userCheck.length > 0) {
    res.send({
      status: true,
      statuscodes: 200,
      message: "login successfull",
      token: jwtToken,
    });
  }
};

const authentication = (req, res) => {
  const { tokenn } = req.query;
  const decoded = jwt.verify(tokenn, secretKey);
  // console.log("JWT verified successfully===>:", decoded);
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const [userCheck] = await postmodel.forgotPassword({ email });
  //  console.log(userCheck,"userCheck======>");

  if (userCheck.length != 1) {
    console.log("info not there");
    res.send({
      status: 400,
      statuscode: false,
      message: "you are not registered",
    });
  } else {
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

module.exports = {
  regUser,
  userGet,
  getUsers,
  deleteUsers,
  login,
  authentication,
  forgotPassword,
};
