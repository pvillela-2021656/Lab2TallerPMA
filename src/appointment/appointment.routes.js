import { Router } from "express";
import { createAppointmentValidator, deleteAppointmentValidator, getAppointmentByIdValidator } from "../middlewares/appointment-validators.js";
import { deleteAppointment, getAppointmentsFromUser, saveAppointment } from "./appointment.controller.js";

const router = Router();
//POST para crear el dato nuevo, el Validator de los middlewares y la lógica de el controlador (saveAppointment)
router.post("/createAppointment", createAppointmentValidator, saveAppointment);
//GET para la lista de las citas del usuario, validador del middleware y lógica del controlador.
router.get("/listAppointments/:uid", getAppointmentByIdValidator, getAppointmentsFromUser);
//DELETE como funcion de cancelar la cita del usuario, por propositos de simplesa no se le cambio a "cancelar" y se dejo en "delete"
router.delete("/deleteAppointment/:uid", deleteAppointmentValidator, deleteAppointment);
export default router;
