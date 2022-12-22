import { Router } from "express";
const router = Router();

//Importar controlador
import * as controller from '../controllers/controller.js';

//preguntas routes api
router.route('/questions')
.get(controller.getQuestions)//get request
.post(controller.insertQuestions)//post request
.delete(controller.dropQuestions)//delete request

router.route('/result')
    .get(controller.getResult)
    .post(controller.storeResult)
    .delete(controller.dropResult)


export default router;