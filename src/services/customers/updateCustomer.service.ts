import { AppDataSource } from "../../data-source"
import bcrypt from "bcrypt"
import { Customer } from "../../entities/customer.entity"
import { AppError } from "../../errors/appError"

export const customerUpdateService = async (data: any, id: any) => {
  const customerRepository = AppDataSource.getRepository(Customer)

  const account = await customerRepository.findOneBy({
    id,
  })

  if (data.id) {
    throw new AppError(400, "Id cannot be changed")
  }

  if (data.password) {
    if (bcrypt.compareSync(data.password, account!.password)) {
      throw new AppError(401, "Inform a different password")
    }
    const newPassword = bcrypt.hashSync(data.password, 10)

    data.password = newPassword
  }

  await customerRepository.update(id, data)

  const customerUpdated = await customerRepository.findOneBy({
    id,
  })

  return customerUpdated
}
