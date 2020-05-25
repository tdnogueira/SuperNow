import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";

import api from "../../services/api";
import logoImg from "../../assets/logo.svg";

export default function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      username,
      email,
      password,
      admin,
    };

    try {
      console.log(data);
      const response = await api.post("users", data);
      alert("Usuário cadastrado com sucesso.");

      history.push("/");
    } catch (err) {
      alert("Erro no cadastro, tente novamente.");
    }
  }

  return (
    <div className='register-container'>
      <div className='content'>
        <section>
          <img src={logoImg} alt='Super Now' />

          <h1>Cadastro</h1>
          <p>Faça seu cadastro para acessar a plataforma.</p>

          <Link className='back-link' to='/'>
            <FiArrowLeft size={16} color='#E02041' />
            Página inicial
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder='Nome'
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type='email'
            placeholder='E-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <session className='admin'>
            <input
              placeholder='Administrador'
              type='boolean'
              value={admin}
              onChange={(e) => setAdmin(e.target.value)}
            />
          </session>

          <button className='button' type='submit'>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
