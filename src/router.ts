import { Router } from "express";
import { body } from 'express-validator'
import { createAccount, getUser, getUserByHandle, login, serachByHandle, updateProfile, uploadImage } from "./handlers";
import { handleInputErrors } from "./middleware/validation";
import { authenticate } from "./middleware/auth";

const router = Router()

//Autenticacion y Registro
router.post('/auth/register', 
    body('handle')
            .notEmpty()
            .withMessage('El handle no puede ir vacío'),
    body('name')
            .notEmpty()
            .withMessage('El nombre no puede ir vacío'),
    body('email')
            .isEmail()
            .withMessage('El email no válido'),
    body('password')
            .isLength({min: 8})
            .withMessage('El passwprd debe tener almenos 8 caracteres'),
    handleInputErrors,
    createAccount
)

router.post('/auth/login', 
    body('email')
            .isEmail()
            .withMessage('El email no válido'),
    body('password')
            .notEmpty()
            .withMessage('El passwprd es obligatorio'),
    handleInputErrors,
    login
)

router.get('/user', 
        authenticate,
        getUser
)
router.patch('/user',
        body('handle')
            .notEmpty()
            .withMessage('El handle no puede ir vacío'),
        handleInputErrors,
        authenticate,
        updateProfile
)

router.post('/user/image',authenticate, uploadImage)

router.get('/:handle',
        getUserByHandle
)

router.post('/search',
        body('handle')
            .notEmpty()
            .withMessage('El handle no puede ir vacío'),
            handleInputErrors,
        serachByHandle
)


export default router