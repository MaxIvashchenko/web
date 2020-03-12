import React from 'react'
import './Button.css'

export default function Button(props) {
    const cls = ['button', props.type]

    return (
        <button
        onClick={props.onClick}
        className={cls.join(' ')}
        disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}