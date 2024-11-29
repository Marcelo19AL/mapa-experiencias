const express = require("express");
const { createExperiencia, updateExperiencia, getNearbyExperiences } = require("../controllers/experienciaController");
const router = express.Router();

router.post("/", createExperiencia);
router.put("/:id", updateExperiencia);
router.get("/nearby", getNearbyExperiences);

module.exports = router;
