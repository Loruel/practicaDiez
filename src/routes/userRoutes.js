import { Router } from "express";
import { readUser, createUser, deleteUser, updateUser } from "../controller/userController.js"

export const usersRoutes = Router()

usersRoutes.get('/all', readUser)

usersRoutes.post('/create', createUser)

usersRoutes.delete('/delete/:id', deleteUser)

usersRoutes.put('/update/:id', updateUser)


