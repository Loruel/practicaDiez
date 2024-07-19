import { Router } from "express";
import { usersRoutes } from "./userRoutes.js"

const API_router = Router()

export const router = (app) => {
    app.use('/api/v1', API_router)

    API_router.use('/user', usersRoutes)

}