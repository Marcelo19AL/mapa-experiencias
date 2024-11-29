'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Experiencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Asociación con Usuario
      Experiencia.belongsTo(models.Usuario, { 
        foreignKey: 'user_id',
        as: 'usuario'
      });

      // Asociación con Comentarios
      Experiencia.hasMany(models.Comentario, { 
        foreignKey: 'experiencia_id',
        as: 'comentarios'
      });
    }
  }
  Experiencia.init({
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 255] // El título debe tener entre 3 y 255 caracteres
      }
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    latitud: {
      type: DataTypes.DECIMAL(10, 8), // Formato para coordenadas precisas
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: true
      }
    },
    longitud: {
      type: DataTypes.DECIMAL(11, 8), // Formato para coordenadas precisas
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: true
      }
    },
    multimedia_url: {
      type: DataTypes.TEXT,
      allowNull: true, // Opcional
      validate: {
        isUrl: true // Validación para URL válida
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true
      }
    }
  }, {
    sequelize,
    modelName: 'Experiencia',
    tableName: 'experiencias', // Nombre de tabla explícito
    timestamps: true // Incluye campos createdAt y updatedAt
  });
  return Experiencia;
};
