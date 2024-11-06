import { Router } from 'express';
import { listProductsController, getProduct, createProductController, updateProductController, deleteProduct } from '../controllers/productController';

const router = Router();

router.get('/', listProductsController);
router.get('/:id', getProduct);
router.post('/', createProductController);
router.put('/:id', updateProductController);
router.delete('/:id', deleteProduct);

export default router;
