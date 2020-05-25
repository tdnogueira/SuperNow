import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./styles.css";

import logoImg from "../../assets/logo.svg";
import api from "../../services/api";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const history = useHistory();
  const userToken = localStorage.getItem("userToken");

  async function handleNewProduct(e) {
    e.preventDefault();

    const data = {
      title,
      description,
    };

    try {
      await api.post("products", data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      history.push("/product");
    } catch (err) {
      alert("Erro ao cadastrar produto, tente novamente.");
    }
  }

  return (
    <div className='new-product-container'>
      <div className='content'>
        <section>
          <img src={logoImg} alt='Super Now' />

          <h1>Cadastrar novo produto</h1>
          <p>Descreva o produto detalhadamente.</p>

          <Link className='back-link' to='/product'>
            <FiArrowLeft size={16} color='#E02041' />
            Voltar para o início
          </Link>
        </section>

        <form onSubmit={handleNewProduct}>
          <input
            placeholder='Produto'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder='Descrição'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className='button' type='submit'>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
