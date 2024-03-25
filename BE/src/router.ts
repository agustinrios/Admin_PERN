import { Router } from "express"
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  updatePatch,
  deleteProduct,
} from './handlers/products'
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware"

const router = Router()

//routing
router.get('/', getProducts)
router.get(
  '/:id',
  param('id').isInt().withMessage('ID no valido'),
  handleInputErrors,
  getProductById
)

router.post(
  '/', 
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

router.put(
  '/:id',
  param('id').isInt().withMessage('ID no valido'),
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio'),
  body('price')
    .isNumeric().withMessage('valor no valido')
    .notEmpty().withMessage('El precio es obligatorio')
    .custom(value => value > 0).withMessage('Precio no valido'),
  body('availability')
  .isBoolean().withMessage('valor no valido'),
  handleInputErrors,
  updateProduct
)

router.patch(
  '/:id',
  param('id').isInt().withMessage('ID no valido'),
  handleInputErrors,
  updatePatch
)

router.delete(
  '/:id',
  param('id').isInt().withMessage('ID no valido'),
  handleInputErrors,
  deleteProduct
)

export default router
