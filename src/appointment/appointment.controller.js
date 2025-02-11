//Importaciones de parte de appointment.model, pet.model y user.model para la creación de las funciones
import Appointment from "../appointment/appointment.model.js";
import Pet from "../pet/pet.model.js";
import User from "../user/user.model.js";

export const saveAppointment = async (req, res) => {
  try {
    const data = req.body;

    const isoDate = new Date(data.date); //Fecha a formato ISO
    
    //Verifica si la fecha es valida en la cita
    if (isNaN(isoDate.getTime())) {
      return res.status(400).json({
        success: false,
        msg: "Fecha inválida",//Manejo de errores.
      });
    }
    //Revisa si la mascota/pet existe en la base de datos
    const pet = await Pet.findOne({ _id: data.pet });
    if (!pet) {
      return res.status(404).json({
        success: false,
        msg: "No se encontró la mascota"//Manejo de errores.
      });
    }
    //Verifica si ya existe una cita para el usuario y la mascota en la misma fecha
    const existAppointment = await Appointment.findOne({
      pet: data.pet,
      user: data.user,
      date: {
        $gte: new Date(isoDate).setHours(0, 0, 0, 0),
        $lt: new Date(isoDate).setHours(23, 59, 59, 999),
      },
    });
    //Manejo de errores.
    if (existAppointment) {
      return res.status(400).json({
        success: false,
        msg: "El usuario y la mascota ya tienen una cita para este día",
      });
    }

    const appointment = new Appointment({ ...data, date: isoDate });
    await appointment.save();

    return res.status(200).json({
      success: true,
      msg: `Cita creada exitosamente en fecha ${data.date}`,
    });//Almacena nuevos datos al ser exitoso

  } catch (error) {
    //Manejo de errores.
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "Error al crear la cita",
      error
    });
  }
};

export const getAppointmentsFromUser = async (req, res) => {
  try {
    const { limite = 5, desde = 0 } = req.query //Parametros con valores por defecto
    const { uid } = req.params; //ID del usuario

    const user = await User.findById(uid)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No se pudo obtener a este User"//Manejo de errores.
      })
    }
    //Para obtener citas que existan
    const query = { status: "CREATED", user: uid }
    //Consultas simultaneas para mejorar el rendimiento
    const [total, appointment] = await Promise.all([
      Appointment.countDocuments(query),
      Appointment.find(query)
        .skip(Number(desde))
        .skip(Number(limite))

    ])
    return res.status(200).json({
      //Si es exitoso
      success: true,
      total,
      appointment
    })

  } catch (err) {
    return res.status(500).json({
      success: false,//Manejo de errores.
      message: "Error al obtener el usuario",
      error: err.message
    })
  }
}

export const deleteAppointment = async (req, res) => {
  try {
    //Obtiene el ID de la cita
    const { uid } = req.params;

    //Buscando la cita en la base de datos
    const appointment = await Appointment.findByIdAndUpdate(uid, { status: "CANCELLED" }, { new: true })

    //Respuesta exitosa
    return res.status(200).json({
      success: true,
      message: "Cita Cancelada",
      appointment,
    });

  } catch (err) {
    //Manejo de errores.
    return res.status(500).json({
      success: false,
      message: "Error al cancelar la cita",
      error: err.message,
    });
  }
}

export const updateAppointment = async(req, res) => {
  try{
    const { uid } = req.params
    const { newDate } = req.body
    
    const appointment = await Appointment.findByIdAndUpdate(uid, { date: newDate }, { new: true });

    return res.status(200).json({
      success: true,
      message: "Cita Actualizada"
    })
  }catch(err){
    return res.status(500).json({
      success: false,
      message: "Error al actualizar la cita",
      error: err.message
    })
  }
}