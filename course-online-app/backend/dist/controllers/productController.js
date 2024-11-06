"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProductController = exports.createProductController = exports.getProduct = exports.listProductsController = void 0;
const dummyJsonService_1 = require("../services/dummyJsonService");
const listProductsController = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const products = await (0, dummyJsonService_1.listProducts)(Number(page), Number(limit));
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao listar produtos', error });
    }
};
exports.listProductsController = listProductsController;
const getProduct = async (req, res) => {
    try {
        const product = await (0, dummyJsonService_1.getProductById)(req.params.id);
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao obter produto', error });
    }
};
exports.getProduct = getProduct;
const createProductController = async (req, res) => {
    try {
        const product = await (0, dummyJsonService_1.createProduct)(req.body);
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao criar produto', error });
    }
};
exports.createProductController = createProductController;
const updateProductController = async (req, res) => {
    try {
        const product = await (0, dummyJsonService_1.updateProduct)(req.params.id, req.body);
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar produto', error });
    }
};
exports.updateProductController = updateProductController;
const deleteProduct = async (req, res) => {
    try {
        const result = await (0, dummyJsonService_1.deleteProductById)(req.params.id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao deletar produto', error });
    }
};
exports.deleteProduct = deleteProduct;
