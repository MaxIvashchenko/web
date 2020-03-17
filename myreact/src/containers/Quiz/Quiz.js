import React from 'react'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

export default class Quiz extends React.Component {
    state = {
        title: 'Quiz test ?',
        results: {}, // {[id]: 'success' or 'error'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]: 'success' or 'error'}
        quiz: [],
        // [
        //     {
        //         question: 'Какой город является столицей Украины?',
        //         rightAnswerId: 4,
        //         answers: [
        //             { text: 'Питер', id: 1 },
        //             { text: 'Москва', id: 2 },
        //             { text: 'Харьков', id: 3 },
        //             { text: 'Киев', id: 4 }
        //         ]
        //     },
        //     {
        //         question: 'Чей Крым?',
        //         rightAnswerId: 1,
        //         answers: [
        //             { text: 'Наш', id: 1 },
        //             { text: 'Не наш', id: 2 },
        //             { text: 'Их', id: 3 },
        //             { text: 'Ничей', id: 4 }
        //         ]
        //     },
        //     {
        //         question: 'Какой по счету президент Зеленский?',
        //         rightAnswerId: 2,
        //         answers: [
        //             { text: 'четвертый', id: 1 },
        //             { text: 'четвертый, если забыть пороха', id: 2 },
        //             { text: 'кто такой Зеленский', id: 3 },
        //             { text: 'третий', id: 4 }
        //         ]
        //     }
        // ],
        loading: true,
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
    async componentDidMount() {
        console.log('quiz id = ', this.props.match.params.id)
        try {
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`);
            const quiz = response.data;
            this.setState({ quiz, loading: false })
        }
        catch (error) {
            console.log(error)
        }
    }
    render() {

        return (
            <div className="quiz">
                <div className='quizWrapper'>
                    <h1>{this.state.title}</h1>
                    {this.state.loading ? <Loader /> :

                        this.state.isFinished ?
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