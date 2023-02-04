import { Express } from "express"
import { customerLogin } from "./customerLogin.routes"
import { routesCustomers } from "./customers.routes"
import { contacts } from "./contacts.routes"

export const appRoutes = (app: Express) => {
  app.use("/customers", routesCustomers())
  app.use("/customers/login", customerLogin())
  app.use("/contacts", contacts())
}
