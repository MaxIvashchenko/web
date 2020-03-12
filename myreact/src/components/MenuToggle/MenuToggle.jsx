import React from 'react'
import './MenuToggle.css'

export default function MenuToggle(props) {
const style = ['menuToggle', 'fa']

if(props.isOpen) {
    style.push('fa-times')
    style.push('open')
} else {
    style.push('fa-bars')
}

    return (
        <i 
        className={style.join(' ')}
        onClick={props.onToggle}
        />
    )
    
}