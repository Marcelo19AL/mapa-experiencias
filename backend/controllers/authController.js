const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");

const register = async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Usuario.create({ nombre, email, password: hashedPassword });
    res.status(201).json({ message: "Usuario registrado exitosamente", newUser });
  } catch (err) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usuario.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id }, "secreto", { expiresIn: "1h" });
    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (err) {
    res.status(500).json({ error: "Error en el inicio de sesión" });
  }
};

module.exports = { register, login };
