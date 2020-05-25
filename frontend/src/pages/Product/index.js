import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";
import logoImg from "../../assets/logo.svg";

export default function Profile() {
  const [products, setProducts] = useState([]);

  const history = useHistory();

  const productId = localStorage.getItem("productId");
  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    api
      .get("products", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
      });
  }, [productId, userToken]);

  async function handleDeleteProduct(id) {
    try {
      await api.delete(`products/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      alert("Erro ao deletar caso, tente novamente.");
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push("/");
  }

  return (
    <div className='profile-container'>
      <header>
        <img src={logoImg} alt='Super Now' />
        <span>Bem vindo ao Super Now</span>

        <Link className='button' to='/products/new'>
          Novo produto
        </Link>
        <button onClick={handleLogout} type='button'>
          <FiPower size={18} color='#E02041' />
        </button>
      </header>

      <h1>Produtos cadastrados</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>PRODUTO:</strong>
            <p>{product.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{product.description}</p>

            <strong>STATUS:</strong>
            <p>{product.status}</p>

            <button
              onClick={() => handleDeleteProduct(product.id)}
              type='button'
            >
              <FiTrash2 size={20} color='#a8a8b3' />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
