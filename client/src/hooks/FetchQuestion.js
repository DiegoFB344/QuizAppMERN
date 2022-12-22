
import { useEffect, useState } from "react"
import {useDispatch} from "react-redux";
import data, { answers } from "../database/data";
import { getServerData } from "../helper/helper";

// redux action

import * as Action from '../redux/question_reducer'

// fetch question hook to fetch api data and set value store
export const useFetchQuestion = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({ isLoading: false, apiData: [] , serverError: null})

    useEffect(() =>{
        setGetData(prev => ({...prev, isLoading: true}));

        //async function fetch backend data

        (async () => {
            try {
                let question = await data;
                const [{ questions, answers}] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, (data) => data)
                console.log({ questions, answers})
                if(questions.length > 0){
                    setGetData(prev => ({...prev, isLoading: false}));
                    setGetData(prev => ({...prev, apiData: {question, answers}}));

                    //dispatch
                    dispatch(Action.startExamAction({question : questions, answers}))
                }else {
                    throw new Error("No pregunta disponible");
                }
            }catch (error){
                setGetData(prev => ({...prev, isLoading: false}));
                setGetData(prev => ({...prev, serverError: error}));
            }
        })();
    }, [dispatch]);

    return [getData, setGetData];
}

//Move action dispatch function

export const moveNextQuestion = () => async (dispatch) => {
    try{
        dispatch(Action.moveNextAction());
    }catch(error){
        console.log(error)
    }
}

//Prev Move action dispatch function

export const movePrevQuestion = () => async (dispatch) => {
    try{
        dispatch(Action.movePrevAction());
    }catch(error){
        console.log(error)
    }
}