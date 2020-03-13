import React from 'react'
import './input.css'


function isInvalid({ valid, touched, shouldValidate }) {
    return !valid && touched && shouldValidate;
}


export default function Input(props) {
    const inputType = props.type || 'text'
    const cls = ['input'];
    const htmlFor = `${inputType}-${Math.random(0,5)}`

    if (isInvalid(props)) {
        cls.push('invalid')
    }


    return (
        <div className={cls.join(' ')} >
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            ></input>
            {isInvalid(props) ? <span>{props.errorMessage || "Введите верное значение"}</span> : null}

        </div>
    )
}

