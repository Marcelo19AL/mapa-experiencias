const { Experiencia } = require("../models");

// Crear una nueva experiencia
const createExperiencia = async (req, res) => {
  try {
    const experiencia = await Experiencia.create(req.body);
    res.status(201).json(experiencia);
  } catch (error) {
    res.status(400).json({ error: "Error al crear la experiencia" });
  }
};

// Actualizar una experiencia existente
const updateExperiencia = async (req, res) => {
  try {
    const { id } = req.params;
    const experiencia = await Experiencia.findByPk(id);
    if (!experiencia) {
      return res.status(404).json({ error: "Experiencia no encontrada" });
    }
    await experiencia.update(req.body);
    res.json(experiencia);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar la experiencia" });
  }
};

// Obtener experiencias cercanas (latitud y longitud)
const getNearbyExperiences = async (req, res) => {
  try {
    const { latitud, longitud, radio } = req.query;

    if (!latitud || !longitud || !radio) {
      return res.status(400).json({ error: "Faltan parámetros de ubicación" });
    }

    const experiencias = await Experiencia.findAll({
      where: sequelize.where(
        sequelize.fn(
          "ST_DWithin",
          sequelize.col("geom"), // Suponiendo que tienes una columna geométrica en PostGIS
          sequelize.fn("ST_MakePoint", longitud, latitud),
          radio
        ),
        true
      ),
    });

    res.json(experiencias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener experiencias cercanas" });
  }
};

module.exports = {
  createExperiencia,
  updateExperiencia,
  getNearbyExperiences,
};
