import React, { Component } from 'react'
import './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import { createControl, validate, validateForm } from '../../form/formFramework'
import Input from '../../components/UI/input/Input'
import Select from '../../components/UI/Select/Select'
import axios from '../../axios/axios-quiz'

function createOptionControl(num) {
    return createControl({
        label: `Вариант ${num}`,
        errorMessage: 'Значение не может быть пустым',
        id: num
    }, { required: true })
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, { required: true }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

export default class QuizCreator extends Component {

    state = {
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }
    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }; // копия всех инпутов
        const control = { ...formControls[controlName] } // навзание копированого инпута

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;
        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })

    }

    renderControls = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <React.Fragment key={controlName + index}>
                    <Input

                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}

                    />
                    {index === 0 ? <hr /> : null}
                </React.Fragment>
            )
        })
    }


    addQuestionHandler = e => {
        e.preventDefault();

        const quiz = this.state.quiz.concat();
        const index = quiz.length + 1;

        const questionItem = {
            question: this.state.formControls.question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                { text: this.state.formControls.option1.value, id: this.state.formControls.option1.id },
                { text: this.state.formControls.option2.value, id: this.state.formControls.option2.id },
                { text: this.state.formControls.option3.value, id: this.state.formControls.option3.id },
                { text: this.state.formControls.option4.value, id: this.state.formControls.option4.id }
            ]
        }

        quiz.push(questionItem)
        this.setState({
            quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })

    }
    createQuizHandler = async event => {
        event.preventDefault();

        try {
            await axios.post('/quizes.json', this.state.quiz)

            this.setState({
                quiz: [],
                isFormValid: false,
                rightAnswerId: 1,
                formControls: createFormControls()
            })
        } catch (error) {
            console.log(error)
        }
    }

    selectChangeHandler = e => {
        this.setState({ rightAnswerId: +e.target.value })
    }

    

    render() {

        const select = <Select
            label='Выберите правильный ответ'
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 }
            ]}
        />
        return (
            <div className='quizCreator'>
                <div>
                    <h1>QuizCreator</h1>
                    <form onSubmit={e => e.preventDefault()}>
                        {this.renderControls()}
                        {select}

                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                        >
                            Добавить вопрос
                    </Button>

                        <Button
                            type='success'
                            onClick={this.createQuizHandler}
                        >
                            Создать тест
                    </Button>

                    </form>
                </div>
            </div>
        )
    }
}
