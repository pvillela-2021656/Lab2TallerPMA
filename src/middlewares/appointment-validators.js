import { body, param } from "express-validator";
import { userExists } from "../helpers/db-validators.js";
import { handleErrors } from "./handle-errors.js";
import { validarCampos } from "./validate-fields.js";
//Todos los validadores de la logica para la creación de citas/appointments
//Verifica que los campos obligatorios esten presentes para que se ejecute correctamente
export const createAppointmentValidator = [
    body("date").notEmpty().withMessage("La fecha es requerida"),
    body("pet").notEmpty().withMessage("La mascota es requerida"),
    body("pet").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];
//Middleware de validación para obtener una cita por ID de usuario.
export const getAppointmentByIdValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
];
//Middleware de validación para eliminar una cita.
export const deleteAppointmentValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];


