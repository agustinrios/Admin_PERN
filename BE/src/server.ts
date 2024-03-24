import  express  from "express"
import router from "./router"
import db from "./config/db"
import colors from 'colors'

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

server.use('/api/products', router)

export default server
