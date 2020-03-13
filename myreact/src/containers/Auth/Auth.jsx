import React from 'react'
import './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/input/Input'
import is from 'is_js'

export default class Auth extends React.Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: "Email",
                errorMessage: 'Введите корректный email !',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: "Пароль",
                errorMessage: 'Введите корректный Пароль !',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }


    registerHandler = () => { }
    loginHandler = () => { }
    submitHandler = (event) => event.preventDefault();

    validateControl = (value, validation) => {
        if (!validation) { return true }
        let isValid = true;
        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (validation.email) {
            isValid = is.email(value) && isValid;
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }

        return isValid;
    }
    onChangeHandler = (event, controlName) => {

        const formControls = { ...this.state.formControls }; // копия всех инпутов
        const control = { ...formControls[controlName] } // навзание копированого инпута

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = false;

        const arrWithValidation = Object.keys(formControls).reduce((arr, name) => {
            arr.push(formControls[name].valid);

            return arr;
        }, [])
        let isAllFormsValid = arrWithValidation.every(elem => elem === true)

        if (isAllFormsValid) { isFormValid = true } 


        this.setState({ formControls, isFormValid })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className='auth'>
                <div>
                    <h1>Авторизация</h1>
                    <form className='authForm' action="" onSubmit={this.submitHandler}>

                        {this.renderInputs()}
                        <Button
                            type='success'
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Войти</Button>

                        <Button
                            type='primary'
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Зарегестрироваться</Button>
                    </form>
                </div>
            </div>
        )
    }
}