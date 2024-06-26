import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    console.log("verify 완료 후 user 정보 : " + req.user)
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next);

  // req.user.id , req.params.id 정보가 같을때
  console.log("verifyUser req.user.id: ", req.user.id, " req.params.id :", req.params.id)
  if (req.user.id === req.params.id) {
    console.log("verifyUser req.user.id , req.params.id 정보가 같을때")
    next();
  } else {
    return next(createError(403, "You are not authorized!"));
  }

};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next)
  if (req.user.isAdmin) {
    console.log("verifyAdmin req.user.isAdmin: true")
    next();
  } else {
    return next(createError(403, "You are not authorized!"));
  }
};
