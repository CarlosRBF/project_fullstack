import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact"
import { AppError } from "../../errors/appError"

export const updateContactService = async (
  fullname: string,
  email: string,
  phone: string,
  isActive: boolean,
  id: string
) => {
  const contactsRepository = AppDataSource.getRepository(Contact)

  const contacts = await contactsRepository.findOneBy({ id })

  if (!contacts) {
    throw new AppError(404, "Contact not found")
  }

  await contactsRepository.update(contacts!.id, {
    fullname: fullname || contacts!.fullname,
    email: email || contacts!.email,
    phone: phone || contacts!.phone,
    isActive: isActive || contacts!.isActive,
  })

  const contactUpdated = await contactsRepository.findOneBy({ id })

  return contactUpdated
}
