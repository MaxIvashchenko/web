import React from 'react'

export default class Layout extends React.Component {
    render() {
        return (
            <div className='layout'>
            <main>
                
                {this.props.children}
            </main>
            </div>
        )
    }
}