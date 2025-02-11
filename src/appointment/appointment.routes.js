import { Router } from "express";
import { createAppointmentValidator, deleteAppointmentValidator, getAppointmentByIdValidator } from "../middlewares/appointment-validators.js";
import { deleteAppointment, getAppointmentsFromUser, saveAppointment } from "./appointment.controller.js";

const router = Router();

router.post("/createAppointment", createAppointmentValidator, saveAppointment);

router.get("/listAppointments/:uid", getAppointmentByIdValidator, getAppointmentsFromUser);

router.delete("/deleteAppointment/:uid", deleteAppointmentValidator, deleteAppointment);
export default router;
