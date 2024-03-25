import { Request, Response } from "express"
import Product from "../models/Product.model"

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      attributes: {exclude: ["createdAt", "updatedAt", "availability"]}
    })

    res.json({data: products}) 
  } catch (error) {
    console.log(error)
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
      return res.status(404).json({
        error: "Producto No Encontrado"
      })
    }

    res.json({data: product}) 
  } catch (error) {
    console.log(error)
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body)

    res.json({data: product}) 
  } catch (error) {
    console.log(error)
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  const product = await Product.findByPk(id)

  if (!product) {
    return res.status(404).json({
      error: "Producto No Encontrado"
    })
  }

  await product.update(req.body)
  await product.save()

  res.json({data: product})
}

export const updatePatch = async (req: Request, res: Response) => {
  const { id } = req.params
  const product = await Product.findByPk(id)

  if (!product) {
    return res.status(404).json({
      error: "Producto No Encontrado"
    })
  }

  product.availability = !product.dataValues.availability
  await product.save()

  res.json({data: product})
}

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  const product = await Product.findByPk(id)

  if (!product) {
    return res.status(404).json({
      error: "Producto No Encontrado"
    })
  }

  await product.destroy()

  res.json({data: 'Prodcuto Eliminado'})
}
