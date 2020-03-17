import React from 'react'
import './Loader.css'

export default function Loader(props) {
    return (
        <div className="center">
            <div className="lds-ripple " >
                <div>            </div>
                <div>            </div>
            </div>
        </div>
    )
}