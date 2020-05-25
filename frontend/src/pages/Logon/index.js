import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";
import supernowimg from "../../assets/supernow.png";

export default function Logon() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("sessions", { email, password });

      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      localStorage.setItem("userToken", response.data.token);
      localStorage.setItem("userName", response.data.username);

      history.push("/product");
    } catch (err) {
      alert("Falha no login, tente novamente.");
    }
  }

  return (
    <div className='logon-container'>
      <section className='form'>
        <img src={logoImg} alt='Super Now' />

        <form onSubmit={handleLogin}>
          <h1>Super Now</h1>

          <input
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
          <button className='button' type='submit'>
            Entrar
          </button>

          <Link className='back-link' to='/register'>
            <FiLogIn size={16} color='#E02041' />
            Nao tenho cadastro
          </Link>
        </form>
      </section>

      <img src={supernowimg} alt='Super Now' />
    </div>
  );
}
