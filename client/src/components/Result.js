import React, { useEffect } from 'react'
import '../styles/Result.css'
import { Link } from "react-router-dom";
import { attempts_Number,earnPoints_Number, flagResult } from '../helper/helper';

import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';

/**Import actions */
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { usePublihResult } from '../hooks/setResult';


function Result() {

    const dispatch = useDispatch()
    const { questions: {queue, answers} , result : {result, userId}} = useSelector(state => state)


    const totalPoints = queue.length * 10;
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers,10)
    const flag = flagResult(totalPoints, earnPoints)

    //Store user result
    usePublihResult({result, username: userId, attempts, points: earnPoints, archived : flag ? "Passed" : "Failed"})

    function onRestart() {
       dispatch(resetAllAction())
       dispatch(resetResultAction())
    }
    return (
        <div className='container'>
            <h1 className='title text-light'>Quiz</h1>
            <div className='result flex-center'>
                <div className='flex'>
                    <span>username</span>
                    <span className='bold'>{userId || ""} </span>
                </div>
                <div className='flex'>
                    <span>Total Quiz points:</span>
                    <span className='bold'>{totalPoints || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total questions:</span>
                    <span className='bold'>{ queue.length || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total attempts:</span>
                    <span className='bold'>{ attempts || 0} </span>
                </div>
                <div className='flex'>
                    <span>Total Earn points:</span>
                    <span className='bold'>{earnPoints || 0} </span>
                </div>
                <div className='flex'>
                    <span>Quiz result: </span>
                    <span style={{ color: `${flag ? "#2aff95" : "#ff2a66"}`}} className='bold'>{flag ? "Passed" : "Failed"}</span>
                </div>

            </div>
            <div className='start'>
                <Link className='btn' to={'/'} onClick={onRestart}>Re intentar</Link>
 
            </div>

            <div className='container'>
                {/* tabla de puntuacion */}
                <ResultTable />
            </div>
        </div>
    )
}

export default Result