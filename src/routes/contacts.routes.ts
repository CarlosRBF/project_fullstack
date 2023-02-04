import { Router } from "express"
import { createContactController } from "../controllers/contacts/createContact.controller"
import { listContactsController } from "../controllers/contacts/listContact.controller"
import { updateContactController } from "../controllers/contacts/updateContact.controller"
import { deleteContactController } from "../controllers/contacts/deleteContact.controller"
import { authCustomer } from "../middlewares/authCustomer.middleware"

const contactsRoutes = Router()

export const contacts = () => {
  contactsRoutes.post("/", authCustomer, createContactController)
  contactsRoutes.get("/customer/", authCustomer, listContactsController)
  contactsRoutes.patch("/customer/:id", authCustomer, updateContactController)
  contactsRoutes.delete("/customer/:id", authCustomer, deleteContactController)

  return contactsRoutes
}
