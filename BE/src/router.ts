import { Router } from "express"
import { createProduct } from './handlers/products'

const router = Router()

//routing
router.get('/', (req, res) => {
  res.json('hola mundo')
})

router.post('/', createProduct)

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
