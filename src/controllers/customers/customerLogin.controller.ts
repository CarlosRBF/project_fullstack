import { Request, Response } from "express"
import { AppError, handleError } from "../../errors/appError"
import { customerLoginService } from "../../services/customers/customerLogin.service"

export const customerLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const token = await customerLoginService({ email, password })

    return res.status(200).json({ token })
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res)
    }
  }
}
