import { Request, Response } from "express"
import { AppError, handleError } from "../../errors/appError"
import { deleteContactService } from "../../services/contacts/deleteContact.service"

export const deleteContactController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const contacts = await deleteContactService(id)

    return res.status(204).send({
      message: "Contact deleted with success!",
      contacts,
    })
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res)
    }
  }
}
