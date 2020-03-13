import React from 'react'
import './FinishedQuiz.css'
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom'

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

                                <strong>{index + 1}. </strong>
                                {quizItem.question}
                                <i className={classes.join(' ')} />
                            </li>
                        )
                    })
                }
            </ul>

            <p>Правильно: {successCounter} of {quiz.length}</p>

            <div>

                <Button onClick={onRetry} type='primary'>Повторить</Button>
                <Link to='/'>
                    <Button type='successBtn'>Перейти в список тестов</Button>
                </Link>
            </div>
        </div>
    )
}