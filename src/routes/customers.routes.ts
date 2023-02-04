import { Router } from "express"
import { customerCreateController } from "../controllers/customers/createCustomer.controller"
import { customerDeleteController } from "../controllers/customers/deleteCustomer.controller"
import { customerListController } from "../controllers/customers/listCustomer.controller"
import { customerUpdateController } from "../controllers/customers/updateCustomer.controller"
import { authCustomer } from "../middlewares/authCustomer.middleware"

const routes = Router()

export const routesCustomers = () => {
  routes.post("/", customerCreateController)
  routes.get("/", authCustomer, customerListController)
  routes.patch("/", authCustomer, customerUpdateController)
  routes.delete("/", authCustomer, customerDeleteController)

  return routes
}
