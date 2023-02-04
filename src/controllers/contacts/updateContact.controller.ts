import { Request, Response } from "express"
import { AppError, handleError } from "../../errors/appError"
import { updateContactService } from "../../services/contacts/updateContact.service"

export const updateContactController = async (req: Request, res: Response) => {
  try {
    const { fullname, email, phone, isActive } = req.body
    const { id } = req.params

    const contact = await updateContactService(
      fullname,
      email,
      phone,
      isActive,
      id
    )

    return res.status(200).send({ contact, message: "Contact update" })
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res)
    }
  }
}
