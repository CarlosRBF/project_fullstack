import "express-async-errors"
import express from "express"
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./swagger.json"
import { appRoutes } from "./routes"
import { errorMiddleware } from "./middlewares/errors.middleware"

const app = express()
app.use(express.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

appRoutes(app)
app.use(errorMiddleware)

export default app
