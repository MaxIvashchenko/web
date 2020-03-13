import React from 'react'
import './Select.css'

export default function Select(props) {

    const htmlFor = `${props.label}-${Math.random(5)}`

    return (
        <div className='select'>
            <label htmlFor={htmlFor}></label>
            <select
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            >
                {props.options.map((option, index) => {
                    return (
                        <option
                            value={option.value}
                            key={option.value + index}
                        >{option.text}</option>
                    )
                })}
            </select>
        </div>
    )

}
