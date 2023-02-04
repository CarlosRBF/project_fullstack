import { AppDataSource } from "../../data-source"
import { AppError } from "../../errors/appError"
import { Contact } from "../../entities/contact"

export const deleteContactService = async (customerId: string) => {
  const contactrepository = AppDataSource.getRepository(Contact)

  const contacts = await contactrepository.find()

  const contactsAccount = contacts.find((contact) => contact.id === customerId)

  if (contactsAccount?.id === undefined) {
    throw new AppError(404, "This contact is not linked to any customer to be deleted")
  }

  contactsAccount!.isActive = false

  await contactrepository.save(contactsAccount!)

  return false
}
