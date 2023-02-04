import { Request, Response } from "express"
import { AppError, handleError } from "../../errors/appError"
import { listContactService } from "../../services/contacts/listContact.service"

export const listContactsController = async (req: Request, res: Response) => {
  try {
    const id = req.customer.id

    const contacts = await listContactService(id)

    return res.status(200).json(contacts)
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res)
    }
  }
}
