import  express  from "express"
import router from "./router"
import db from "./config/db"
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'

//conect data base
async function conectDB() {
  try {
    await db.authenticate()
    db.sync()
    console.log(colors.magenta('conectado'))
  } catch (error) {
    console.log(colors.red.bold('Hubo un error al conectar la BD'), error)
  }
}

conectDB()

const server = express()

//leer datos de formularios
server.use(express.json())

server.use('/api/products', router)

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec) )

export default server
