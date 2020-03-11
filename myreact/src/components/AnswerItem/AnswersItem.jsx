import React from 'react'
import '../AnswersList/AnswersList.css'

const AnswersItem = props => {
let classes = ['answerItem']
    if (props.state) {
        classes.push(props.state)
    }

    return (
        <li className={classes.join(' ')} onClick={() => props.onAnswerClick(props.answer.id)}>
            {props.answer.text}
        </li>
    )
}

export default AnswersItem;