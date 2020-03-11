import React from 'react'
import './FinishedQuiz.css'

export default function FinishedQuiz({ results, quiz, onRetry }) {
    const successCounter = Object.keys(results).reduce((total, key) => {
        if (results[key] === 'success') {
            total++
        }
        return total;
    }, 0)

    return (
        <div className="finishedQuiz">
            <ul>
                {
                    quiz.map((quizItem, index) => {
                        const classes = ['fa'];

                        if (results[index] === 'error') {
                            classes.push('fa-times errorFa')
                        } else {
                            classes.push('fa-check successFa')
                        }
                        return (
                            <li key={index}>

                                <strong>{index + 1} </strong>
                                {quizItem.question}
                                <i className={classes.join(' ')} />
                            </li>
                        )
                    })
                }
            </ul>

            <p>Правильно: {successCounter} of {quiz.length}</p>
            <div><button onClick={onRetry}>AGAIN</button></div>
        </div>
    )
}