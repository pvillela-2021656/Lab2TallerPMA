import { Router } from "express";
import { createAppointmentValidator } from "../middlewares/appointment-validators.js";
import { saveAppointment } from "./appointment.controller.js";

const router = Router();

router.post("/createAppointment", createAppointmentValidator, saveAppointment);


export default router;