import helperService from "./HelperService";
const jwt = require("jsonwebtoken");

class AuthService {
  private userId: String;

  constructor() {
    this.userId = null;
  }

  isJwtValid = async (req, res) => {
    console.log(req);
    const jwtToken = "get from request header";
    const authorizationHeader = req.headers.authorization;

    console.log("auth: ", authorizationHeader);
    console.log(authorizationHeader);
    if (authorizationHeader == null || authorizationHeader == undefined) {
      return helperService.returnResponse(
        res,
        403,
        false,
        "Forbidden, authorization header not found!"
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    } catch (error) {
      console.log("cathce düşüyor");
      return false;
    }

    this.userId = decoded.userId;
    console.log("userId:", this.userId);

    return true;
  };

  async getUserIdFromJwt(jwtToken) {
    return this.userId;
  }
}

const service = new AuthService();
export default service;