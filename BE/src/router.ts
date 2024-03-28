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
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The Produt ID
 *          Example: 1
 *        name:
 *          type: string
 *          description: The Produt name
 *          Example: Monitor Curvo de 49 pulgadas
 *        price:
 *          type: number
 *          description: The Produt price
 *          Example: 300
 *        availability:
 *          type: boolean
 *          description: The Produt availability
 *          Example: true
*/

/**
 * @swagger
 * /api/products:
 *    get:
 *      summary: Get o list of products
 *      tags:
 *        - Products
 *      description: Return a list of products
 *      responses:
 *        200:
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Product'
*/

//routing
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *    get:
 *      summary: Get a product by ID
 *      tags:
 *        - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: the ID of the product to retrieve
 *          require: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        400:
 *          description: bad request - Invalid ID
 *        404:
 *          description: Not found
*/

router.get(
  '/:id',
  param('id').isInt().withMessage('ID no valido'),
  handleInputErrors,
  getProductById
)

/**
 * @swagger
 * /api/products:
 *    post:
 *      summary: Creates a new product
 *      tags:
 *        - Products
 *      description: Return a new record in the database
 *      requestBody:
 *          require: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    Example: Monitor Curvo de 49 pulgadas
 *                  price:
 *                    type: number
 *                    Example: 300
 *      responses:
 *        200:
 *          description: Product created Successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        400:
 *          description: bad request - Invalid input date
*/

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

/**
 * @swagger
 * /api/products/{id}:
 *    put:
 *      summary: Updates a product with user input
 *      tags:
 *        - Products
 *      description: Return the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: the ID of the product to retrieve
 *          require: true
 *          schema:
 *            type: integer
 *      requestBody:
 *          require: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    Example: Monitor Curvo de 49 pulgadas
 *                  price:
 *                    type: number
 *                    Example: 400
 *                  availability:
 *                    type: boolean
 *                    Example: true
 *      responses:
 *        200:
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        400:
 *          description: bad request - Invalid ID or Invalid input data
 *        404:
 *          description: Product not found
*/

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

/**
 * @swagger
 * /api/products/{id}:
 *    patch:
 *      summary: Updates product availability
 *      tags:
 *        - Products
 *      description: Return the updated availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: the ID of the product to retrieve
 *          require: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        400:
 *          description: bad request - Invalid ID or Invalid input data
 *        404:
 *          description: Product not found
*/

router.patch(
  '/:id',
  param('id').isInt().withMessage('ID no valido'),
  handleInputErrors,
  updatePatch
)

/**
 * @swagger
 * /api/products/{id}:
 *    delete:
 *      summary: Delete a product by a given ID
 *      tags:
 *        - Products
 *      description: Return a confirmation message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: the ID of the product to delete
 *          require: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                value: 'Producto Eliminado'
 *        400:
 *          description: bad request - Invalid ID
 *        404:
 *          description: Product not found
*/

router.delete(
  '/:id',
  param('id').isInt().withMessage('ID no valido'),
  handleInputErrors,
  deleteProduct
)

export default router
