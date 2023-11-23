const UserModle = require("../models/user.model");
const { verifyToken } = require("../utils/auth.utils");

const isAuth = async (req, res, next) => {
  // Lấy access token từ header
  const accessTokenFromHeader = req.headers.authorization;
  const bearer = accessTokenFromHeader?.split(" ");
  const bearerToken = bearer[1];
  if (!bearerToken) {
    return res.status(401).send("access token not found!");
  }
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const verified = await verifyToken(bearerToken, accessTokenSecret);
  if (!verified) {
    return res.status(401).send("Access denied!");
  }
  const user = await UserModle.findOne({ email: verified.payload.email });
  req.user = user;

  return next();
};

module.exports = { isAuth };
