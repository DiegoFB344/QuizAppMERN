import React, { useEffect,useState } from 'react'
import Questions from './Questions';
import { moveNextQuestion, movePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';
/**redux store import */
import { useSelector, useDispatch } from 'react-redux'
import {Navigate} from 'react-router-dom'


function Quiz() {

  const result = useSelector(state => state.result.result);

  const [check, setChecked] = useState(undefined);
  const { queue, trace } = useSelector(state => state.questions);
  const dispatch = useDispatch()


  //next button evento
  function onNext() {
    if (trace < queue.length) {
      //actualizar move next action
      dispatch(moveNextQuestion());
      //ingresa un nuevo resultado al array
     if(result.length <= trace){
      dispatch(PushAnswer(check))
     }
    }
//resetear el valor de cada varible
setChecked(undefined)
  }
  //env button evento
  function onPrev() {
    if (trace > 0) {
      //actualizar move next action
      dispatch(movePrevQuestion());
    }

  }

  function onChecked(check) {
    console.log(check);
    setChecked(check)
  }

  /** finish exam after result  */
  if(result.length && result.length >= queue.length){
    return <Navigate to={'/result'} replace={true}></Navigate>
  }


  return (
    <div className='container'>
      <h1 className='title text-light'>Quiz</h1>

      {/**display de las preguntas */}
      <Questions onChecked={onChecked}/>

      <div className='grid'>
        { trace > 0 ?         <button className='btn prev' onClick={onPrev}>Anterior</button> : <div></div>}
        <button className='btn next' onClick={onNext}>Siguiente</button>
      </div>
    </div>
  )
}

export default Quiz