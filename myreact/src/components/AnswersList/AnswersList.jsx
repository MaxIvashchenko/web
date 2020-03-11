import React from 'react'
import './AnswersList.css'
import AnswersItem from '../AnswerItem/AnswersItem'


export default function AnswersList(props) {

    return (<ul className="answersList">
        {props.answers.map((answer, index) => {
            return (
                <AnswersItem
                    key={index}
                    answer={answer}
                    onAnswerClick={props.onAnswerClick}
                    state={props.state ? props.state[answer.id] : null }
                />
            )
        })}
    </ul>)
}

