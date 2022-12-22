import React, {useRef} from 'react'
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { setUserId } from '../redux/result_reducer';
import '../styles/Main.css'
export default function Main() {

  const inputRef = useRef(null)
  const dispatch = useDispatch()

  function startQuiz(){
    if(inputRef.current?.value){
        dispatch(setUserId(inputRef.current?.value))
    }
  }
  return (
    <div className='container'>
      <h1 className='title text-light'>Quiz</h1>

      <ol>
        <li>You will be asked 10 questions one after another</li>
        <li>10 Points is awarded for the correct answer</li>
        <li>Each question has three options, You can chose only questions</li>
        <li>You can review and change answers before the quis finish</li>
        <li>the result will be declared at the end for the quiz</li>
      </ol>

      <form id="form">
      <input ref={inputRef} className="userid" type="text" placeholder='Username'/>
      </form>

      <div className='start'>
      <Link className='btn' to={'quiz'} onClick={startQuiz}>Start quiz</Link>
      </div>
    </div>
  )
}

