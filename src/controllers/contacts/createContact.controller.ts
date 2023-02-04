import { Request, Response } from "express"
import { AppError, handleError } from "../../errors/appError"
import { createContactService } from "../../services/contacts/createContact.service"

export const createContactController = async (req: Request, res: Response) => {
  try {
    const { fullname, email, phone, isActive } = req.body
    const customerId = req.customer.id

    const contacts = await createContactService({
      customerId,
      fullname,
      email,
      phone,
      isActive,
    })

    return res.status(201).json(contacts)
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res)
    }
  }
}
