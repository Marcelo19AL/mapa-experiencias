'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Asociación con Experiencia
      Usuario.hasMany(models.Experiencia, { 
        foreignKey: 'user_id',
        as: 'experiencias' 
      });

      // Asociación con Comentarios (si los incluimos más adelante)
      Usuario.hasMany(models.Comentario, { 
        foreignKey: 'usuario_id',
        as: 'comentarios' 
      });
    }
  }
  
  Usuario.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100] // Entre 3 y 100 caracteres
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true // Validación de formato de correo
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 100] // Mínimo 6 caracteres
      }
    },
    foto_perfil: {
      type: DataTypes.TEXT,
      allowNull: true, // Opcional
      validate: {
        isUrl: true // Validación de URL válida si se proporciona
      }
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios', // Nombre explícito de la tabla
    timestamps: true, // Campos createdAt y updatedAt habilitados
    hooks: {
      beforeCreate: async (usuario, options) => {
        // Encriptación de contraseña antes de guardar el usuario
        const bcrypt = require('bcrypt');
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
      }
    }
  });
  
  return Usuario;
};
