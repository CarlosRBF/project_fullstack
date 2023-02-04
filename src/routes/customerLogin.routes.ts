import { Router } from "express"
import { customerLoginController } from "../controllers/customers/customerLogin.controller"

const login = Router()

export const customerLogin = () => {
  login.post("/", customerLoginController)

  return login
}
