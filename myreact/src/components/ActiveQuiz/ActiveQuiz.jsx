import React from 'react'
import './ActiveQuiz.css'
import AnswersList from '../AnswersList/AnswersList'

export default function ActiveQuiz(props) {

    return (
        <div className='activeQuiz'>
            <p className='question'>
                <span>
                    <strong>{props.answerNumber}. </strong>
                    {props.question}
                </span>
                <small>{props.answerNumber} из {props.quizLength}</small>
            </p>
            <AnswersList
                state={props.state}
                answers={props.answers}
                onAnswerClick={props.onAnswerClick}

            />
        </div>
    )
}