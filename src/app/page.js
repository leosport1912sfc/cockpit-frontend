"use client";
import { useState } from 'react';
import { signIn } from "next-auth/react";
import Link from 'next/link';
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const fazerLogin = async (e) => {
    e.preventDefault(); // Impede a página de recarregar
    setErro('');

    // Chama o nosso segurança configurado no route.js
    const resultado = await signIn('credentials', {
      redirect: false,
      email: email,
      password: senha,
    });

    if (resultado.error) {
      setErro('Credenciais inválidas. Tente novamente, meu caro!');
    } else {
      // Deu certo! Vamos para a Home
      window.location.href = '/home';
    }
  };

  return (
    <main className="d-flex flex-column justify-content-center align-items-center vh-100 bg-warning">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-dark">trânsito.mg</h1>
        <p className="lead text-dark">Cockpit de Gestão de Frota</p>
      </div>

      <div className="card shadow border-0" style={{ width: '22rem', borderRadius: '15px' }}>
        <div className="card-body p-4 text-center">
          <h5 className="card-title mb-4">Acesso ao Sistema</h5>
          
          <form onSubmit={fazerLogin}>
            <div className="mb-3 text-start">
              <label className="form-label text-muted small fw-bold">E-mail</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="admin@transito.mg.gov.br" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4 text-start">
              <label className="form-label text-muted small fw-bold">Senha</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="123456"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            {erro && <div className="alert alert-danger py-2 small">{erro}</div>}
            
            <button type="submit" className="btn btn-dark w-100 mb-3 py-2 fw-bold" style={{ transition: '0.3s' }}>
              Entrar
            </button>
          </form>
          
          <a href="#" className="text-decoration-none small text-muted">
            Esqueceu a senha?
          </a>
        </div>
      </div>
    </main>
  );
}
