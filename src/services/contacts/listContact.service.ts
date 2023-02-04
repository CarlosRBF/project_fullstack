import { AppDataSource } from "../../data-source"
import { AppError } from "../../errors/appError"
import { Customer } from "../../entities/customer.entity"

export const listContactService = async (id: string) => {
  const customerRepository = AppDataSource.getRepository(Customer)

  const customer = await customerRepository.findOne({
    where: { id: id },
    relations: { contacts: true },
  })

  if (!customer) {
    throw new AppError(404, "Customer not found")
  }

  const contactReturn = customer.contacts.map((contact, index) => {
    return {
      id: customer.contacts[index].id,
      fullname: customer.contacts[index].fullname,
      email: customer.contacts[index].email,
      phone: customer.contacts[index].phone,
      isActive: customer.contacts[index].isActive
    }
  })

  return contactReturn
}
