import React from 'react'
import './Drawer.css'

const links = [1, 2, 3]


export default class Drawer extends React.Component {
    renderLinks = () => {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <a href='/'>Link {link}</a>
                </li>
            )
        })
    }

    render() {
const cls = ['drawer']

if(!this.props.isOpen) {
    cls.push('close')
}

        return (
            <nav className={cls.join(' ')}>
                <ul>
                    {this.renderLinks()}
                </ul>
            </nav>
        )
    }

}