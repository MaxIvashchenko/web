import React from 'react'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

export default class Quiz extends React.Component {
    state = {
        results: {}, // {[id]: 'success' or 'error'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]: 'success' or 'error'}
        quiz: [
            {
                question: 'Какой город является столицей Украины?',
                rightAnswerId: 4,
                answers: [
                    { text: 'Питер', id: 1 },
                    { text: 'Москва', id: 2 },
                    { text: 'Харьков', id: 3 },
                    { text: 'Киев', id: 4 }
                ]
            },
            // {
            //     question: 'Чей Крым?',
            //     rightAnswerId: 1,
            //     answers: [
            //         { text: 'Наш', id: 1 },
            //         { text: 'Не наш', id: 2 },
            //         { text: 'Их', id: 3 },
            //         { text: 'Ничей', id: 4 }
            //     ]
            // },
            // {
            //     question: 'Какой по счету президент Зеленский?',
            //     rightAnswerId: 2,
            //     answers: [
            //         { text: 'четвертый', id: 1 },
            //         { text: 'четвертый, если забыть пороха', id: 2 },
            //         { text: 'кто такой Зеленский', id: 3 },
            //         { text: 'третий', id: 4 }
            //     ]
            // }
        ]
    }

    onAnswerClickHandler = answerId => {
        if (this.state.answerState) {
            if (this.state.answerState[answerId] === 'success') { return }
        }
        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if (question.rightAnswerId === answerId) { // правильный ответ
            if (!results[this.state.activeQuestion]) {
                results[this.state.activeQuestion] = 'success'
            }
            this.setState({
                answerState: { [answerId]: 'success' },
                results: results
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({ isFinished: true })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null // обнуляет результат предыдущего ответа
                    });
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            if (results[this.state.activeQuestion]) {
                return
            }             // неправильный ответ
            results[this.state.activeQuestion] = 'error';
            this.setState({
                answerState: { [answerId]: 'error' },
                results: results
            });
        }

    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }
    retryHandler = () => {
        this.setState({
            results: {}, // {[id]: 'success' or 'error'}
            isFinished: false,
            activeQuestion: 0,
            answerState: null, // {[id]: 'success' or 'error'}
        })
    }
    render() {

        return (
            <div className="quiz">
                <div className='quizWrapper'>
                    <h1>Знаешь ли ты Нэньку?</h1>

                    {this.state.isFinished ?
                        <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                        :
                        <ActiveQuiz
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            question={this.state.quiz[this.state.activeQuestion].question}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            state={this.state.answerState}
                        />
                    }
                </div>

            </div>
        )
    }
}