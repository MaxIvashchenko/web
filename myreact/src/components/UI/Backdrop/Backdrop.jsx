import React from 'react'
import './Backdrop.css'

export default function Backdrop({ onClose }) {
    return (
        <div className='backdrop' onClick={onClose} />
    )
}