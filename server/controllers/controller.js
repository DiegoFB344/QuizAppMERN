import  Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, { answers} from '../database/data.js'
import resultSchema from "../models/resultSchema.js";

//Obtener todas las preguntas
export async function getQuestions(req, res){
    try {
        const q = await Questions.find();
        res.json(q)
    }catch(error){
        res.json({ error})
    }
}

//insertar todas las preguntas
export async function insertQuestions(req, res){
    try {
        Questions.insertMany({ questions: questions, answers: answers}, function(err,data) {
            res.json({msg: "Data saved succefelly"})
        })
    }catch(error){
        res.json({ error})
    }
}

//borrar todas las preguntas
export async function dropQuestions(req, res){
   try{
        await Questions.deleteMany();
        res.json({msg: "Question delete succesfy"});
   }catch(error){
    res.json({error})
   }
}

//obtener todos los resultados 
export async function getResult(req, res){
    try {
        const r = await Results.find();
        res.json(r)
    }catch(error){
        res.json({ error})
    }
}


//obtener post de los resultados 
export async function storeResult(req, res){
    try{
       const {username, result, attempts,points, archived} = req.body;
       if(!username && !result) throw new Error('data no prevista');

       Results.create({username, result, attempts,points, archived}, function(err,data){
        res.json({msg: "result saved succesfely!!"})
       })
    }catch (error){
        res.json({error})
    }
}

//borrar todos los resultados
export async function dropResult(req, res){
    try{
      await Results.deleteMany();
      res.json({msg: "borrado result succesfly"})
     }catch (error){
         res.json({error})
     }
}