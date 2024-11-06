"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductById = exports.updateProduct = exports.createProduct = exports.getProductById = exports.listProducts = void 0;
const axios_1 = __importDefault(require("axios"));
const BASE_URL = 'https://dummyjson.com/products';
const listProducts = async (page, limit) => {
    const response = await axios_1.default.get(`${BASE_URL}?limit=${limit}&skip=${(page - 1) * limit}`);
    return response.data;
};
exports.listProducts = listProducts;
const getProductById = async (id) => {
    const response = await axios_1.default.get(`${BASE_URL}/${id}`);
    return response.data;
};
exports.getProductById = getProductById;
const createProduct = async (data) => {
    const response = await axios_1.default.post(BASE_URL, data);
    return response.data;
};
exports.createProduct = createProduct;
const updateProduct = async (id, data) => {
    const response = await axios_1.default.put(`${BASE_URL}/${id}`, data);
    return response.data;
};
exports.updateProduct = updateProduct;
const deleteProductById = async (id) => {
    const response = await axios_1.default.delete(`${BASE_URL}/${id}`);
    return response.data;
};
exports.deleteProductById = deleteProductById;
