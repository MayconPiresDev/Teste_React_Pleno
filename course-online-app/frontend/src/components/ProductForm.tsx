// src/components/ProductForm.tsx
"use client";

import { useState, useEffect } from "react";

interface ProductFormProps {
  onProductAdded: (
    product: {
      title: string;
      brand: string;
      price: number;
      category: string;
      image: string;
    }
  ) => void;
  onProductUpdated: (
    product: {
      id: number;
      title: string;
      brand: string;
      price: number;
      category: string;
      image: string;
    }
  ) => void;
  editingProduct: {
    id: number;
    title: string;
    brand: string;
    price: number;
    category: string;
    image: string;
  } | null;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onProductAdded,
  onProductUpdated,
  editingProduct,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setTitle(editingProduct.title);
      setBrand(editingProduct.brand);
      setPrice(editingProduct.price);
      setCategory(editingProduct.category);
      setImage(editingProduct.image);
      setIsExpanded(true); // Expande o formulário ao editar
    }
  }, [editingProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {
      // Atualiza o produto existente
      onProductUpdated({ 
        id: editingProduct.id, 
        title, 
        brand, 
        price: Number(price), 
        category, 
        image 
      });
    } else {
      // Adiciona um novo produto
      onProductAdded({ 
        title, 
        brand, 
        price: Number(price), 
        category, 
        image 
      });
    }

    // Limpa os campos após a submissão
    setTitle("");
    setBrand("");
    setPrice("");
    setCategory("");
    setImage("");
    setIsExpanded(false);
  };

  return (
    <div className="mb-6 flex justify-center">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-white text-2xl focus:outline-none transition-transform duration-500 transform hover:scale-110"
        >
          +
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full max-w-md transition-all duration-700 ease-in-out"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do Produto"
            className="border p-2 rounded-md mb-4 w-full"
            required
          />
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Marca do Produto"
            className="border p-2 rounded-md mb-4 w-full"
            required
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.valueAsNumber || "")}
            placeholder="Preço do Produto"
            className="border p-2 rounded-md mb-4 w-full"
            required
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Categoria do Produto"
            className="border p-2 rounded-md mb-4 w-full"
            required
          />
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="URL da Imagem do Produto"
            className="border p-2 rounded-md mb-4 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
          >
            {editingProduct ? "Salvar Alterações" : "Adicionar Produto"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductForm;
