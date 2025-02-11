import { Router } from "express"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"
import { deleteUserValidator, getUserByIdValidator, updatePasswordValidator, updateProfilePicValidator, updateUserValidator } from "../middlewares/user-validators.js"
import { deleteUser, getUserById, getUsers, updatePassword, updateProfilePicture, updateUser } from "./user.controller.js"

const router = Router()

router.get("/findUser/:uid", getUserByIdValidator, getUserById)

router.get("/", getUsers)

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword)

router.put("/updateUser/:uid", updateUserValidator, updateUser)

router.patch("/updateProfilePicture/:uid", uploadProfilePicture.single("profilePicture"), updateProfilePicValidator, updateProfilePicture)
export default router
