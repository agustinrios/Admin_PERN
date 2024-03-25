import { Router } from "express"
import { createProduct } from './handlers/products'
import { body } from "express-validator"
import { handleInputErrors } from "./middleware"

const router = Router()

//routing
router.get('/', (req, res) => {
  res.json('hola mundo')
})

router.post('/', 
  //validacion
  body('name')
  .notEmpty().withMessage('El nombre es obligatorio'),
  body('price')
  .isNumeric().withMessage('valor no valido')
  .notEmpty().withMessage('El precio es obligatorio')
  .custom(value => value > 0).withMessage('Precio no valido'),
  handleInputErrors,
  createProduct
)

router.put('/', (req, res) => {
  res.json('hola mundo')
})

router.patch('/', (req, res) => {
  res.json('hola mundo')
})

router.delete('/', (req, res) => {
  res.json('hola mundo')
})

export default router
