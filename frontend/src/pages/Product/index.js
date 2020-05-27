import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2, FiThumbsUp, FiThumbsDown } from "react-icons/fi";

import api from "../../services/api";
import logoImg from "../../assets/logo.svg";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("");
  const [approvedby_id, setApprovedby_id] = useState("");

  const history = useHistory();

  const productId = localStorage.getItem("productId");
  const userToken = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");

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

  async function handleStatusProduct(e, id, stat) {
    e.preventDefault();

    setStatus(status, stat);
    setApprovedby_id(approvedby_id, userId);
    const data = {
      status,
      approvedby_id,
    };

    try {
      await api.put(`products/${id}`, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      history.push("/product");
    } catch (err) {
      alert(`${err} ao aprovar/reprovar produto, tente novamente.`);
    }
  }

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
    <div className='product-container'>
      <head></head>
      <body>
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
        <main>
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

                <approve
                  onClick={(e) =>
                    handleStatusProduct(e, product.id, "aprovado")
                  }
                  type='button'
                >
                  <FiThumbsUp size={20} color='#a8a8b3' />
                </approve>

                <reprove
                  onClick={(e) =>
                    handleStatusProduct(e, product.id, "reprovado")
                  }
                  type='button'
                >
                  <FiThumbsDown size={20} color='#a8a8b3' />
                </reprove>
              </li>
            ))}
          </ul>
        </main>
      </body>
    </div>
  );
}
