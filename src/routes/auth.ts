import { Router } from "express";
import {
  singUp,
  loginUser,
  logOut,
  getCurrent,
  refresh,
} from "../controllers/auth.controller";
import validation from "../validate/validation";
import validateRegisterField from "../validate/validateRegisterField";
import validateLoginField from "../validate/validateLoginField";
import validateToken from "../validate/validateRefreshToken";
import { auth } from "../middlewares/auth";

const router = Router();

router.post("/register", validation(validateRegisterField), singUp);
router.post("/login", validation(validateLoginField), loginUser);
router.post("/logout", auth, logOut);
router.post("/refresh", validation(validateToken), refresh);
router.get("/current", auth, getCurrent);

export default router;
