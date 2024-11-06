import { Request, Response } from 'express';
import { listProducts, getProductById, createProduct, updateProduct, deleteProductById } from '../services/dummyJsonService';

export const listProductsController = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await listProducts(Number(page), Number(limit));
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar produtos', error });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter produto', error });
  }
};

export const createProductController = async (req: Request, res: Response) => {
  try {
    const product = await createProduct(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto', error });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto', error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const result = await deleteProductById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar produto', error });
  }
};
