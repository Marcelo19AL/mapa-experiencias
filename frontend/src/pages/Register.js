import React, { useState } from "react";
import api from "../api/axios";

const Register = () => {
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Registro exitoso");
    } catch (err) {
      alert("Error en el registro");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Register;
