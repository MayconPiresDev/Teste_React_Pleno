// src/components/ProductList.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/services/api";
import ProductForm from "./ProductForm";

interface Product {
  id: number;
  title: string;
  brand: string;
  price?: number;
  category?: string;
  image?: string;
}

const ProductList: React.FC = () => {
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState<"title" | "brand">("title");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Define o número de produtos por página

  // Carrega produtos da API
  const loadApiProducts = async () => {
    const data = await fetchProducts();
    setApiProducts(data.products);
  };

  // Carrega produtos do localStorage ao montar o componente
  useEffect(() => {
    loadApiProducts();

    const savedProducts = localStorage.getItem("newProducts");
    if (savedProducts) {
      setNewProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Filtra e ordena os produtos para exibição
  const filteredAndSortedProducts = [...apiProducts, ...newProducts]
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const fieldA = a[sortCriteria]?.toLowerCase() ?? "";
      const fieldB = b[sortCriteria]?.toLowerCase() ?? "";
      return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
    });

  // Calcular os produtos exibidos na página atual
  const totalItems = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItems = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Navegar para a página anterior
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Navegar para a próxima página
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Função para adicionar produto
  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = { id: newProducts.length + apiProducts.length + 1, ...product };
    const updatedNewProducts = [...newProducts, newProduct];
    setNewProducts(updatedNewProducts);
    localStorage.setItem("newProducts", JSON.stringify(updatedNewProducts));
  };

  // Função para atualizar produto
  const updateProduct = (updatedProduct: Product) => {
    const updatedProducts = newProducts.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setNewProducts(updatedProducts);
    localStorage.setItem("newProducts", JSON.stringify(updatedProducts));
    setEditingProduct(null); // Sai do modo de edição
  };

  // Função para excluir produto
  const deleteProduct = (productId: number) => {
    const updatedProducts = newProducts.filter((product) => product.id !== productId);
    setNewProducts(updatedProducts);
    localStorage.setItem("newProducts", JSON.stringify(updatedProducts));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-white">
        Lista de Produtos
      </h1>

      {/* Barra de busca e opções de ordenação */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Buscar por título ou marca"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-l-md w-64"
        />
        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value as "title" | "brand")}
          className="border p-2 rounded-r-md"
        >
          <option value="title">Ordenar por Título</option>
          <option value="brand">Ordenar por Marca</option>
        </select>
      </div>

      {/* Formulário que pode ser usado para adicionar ou editar produtos */}
      <ProductForm
        onProductAdded={addProduct}
        onProductUpdated={updateProduct}
        editingProduct={editingProduct}
      />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">Produtos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg product-card transition-transform transform hover:scale-105 relative"
            >
              {/* Botão de edição e exclusão */}
              <button
                onClick={() => setEditingProduct(product)}
                className="absolute top-2 right-8 text-blue-500 hover:text-blue-700"
              >
                {/* Ícone de edição */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536M9 13.5l3.25-3.25m-1.25 6.75h-4a1 1 0 01-1-1v-4a1 1 0 011-1h4M19.071 4.929a2.828 2.828 0 010 4L12 16.071a2.828 2.828 0 01-4-4L15.071 4.93a2.828 2.828 0 014 0z"
                  />
                </svg>
              </button>

              <button
                onClick={() => deleteProduct(product.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                {/* Ícone de exclusão */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6h12M9 6v12m6-12v12"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 7.5L5.25 18a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5L19.5 7.5M4.5 7.5h15M9 10.5h6"
                  />
                </svg>
              </button>

              {product.image && (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.title}</h2>
              <p className="text-gray-700">Marca: {product.brand}</p>
              <p className="text-gray-700">Categoria: {product.category || "Não especificada"}</p>
              <p className="text-gray-700">Preço: R$ {product.price ? product.price.toFixed(2) : "N/A"}</p>
            </div>
          ))}
        </div>

        {/* Navegação da paginação */}
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-white">Página {currentPage} de {totalPages}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
