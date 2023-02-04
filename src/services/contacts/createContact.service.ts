import { AppDataSource } from "../../data-source"
import { AppError } from "../../errors/appError"
import { Contact } from "../../entities/contact"
import { IContactRequest, IContact } from "../../interfaces/contacts"
import { Customer } from "../../entities/customer.entity"

export const createContactService = async ({
  customerId,
  fullname,
  email,
  phone,
  isActive,
}: IContactRequest) => {
  const contactsRepository = AppDataSource.getRepository(Contact)
  const customerRepository = AppDataSource.getRepository(Customer)

  const customerContact = await customerRepository.findOneBy({ id: customerId })

  if (!customerContact) {
    throw new AppError(404, "Contact not found for this customer")
  }

  for (let i = 0; i < customerContact.contacts.length; i++) {
    if (
      customerContact.contacts[i].email == email ||
      customerContact.contacts[i].phone == phone
    ) {
      throw new AppError(404, "Contact already exists")
    }
  }

  const createContact = new Contact()
  createContact.fullname = fullname
  createContact.email = email
  createContact.phone = phone
  createContact.isActive = isActive
  createContact.customer = customerContact

  contactsRepository.create(createContact)
  const contact = await contactsRepository.save(createContact)

  const contactDefined = {
    id: contact.id,
    fullname: fullname,
    email: email,
    phone: phone,
    isActive: contact.isActive,
    customer: {
      fullname: customerContact.fullname,
      email: customerContact.email,
    },
  }

  return contactDefined
}
