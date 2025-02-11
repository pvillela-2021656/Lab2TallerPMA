import { Router } from "express";
import { createAppointmentValidator, getAppointmentByIdValidator } from "../middlewares/appointment-validators.js";
import { getAppointmentsFromUser, saveAppointment } from "./appointment.controller.js";

const router = Router();

router.post("/createAppointment", createAppointmentValidator, saveAppointment);

router.get("/listAppointments/:uid", getAppointmentByIdValidator, getAppointmentsFromUser);


export default router;
