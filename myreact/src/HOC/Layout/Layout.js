import React from 'react'
import MenuToggle from '../../components/MenuToggle/MenuToggle'
import Drawer from '../../components/Drawer/Drawer'

export default class Layout extends React.Component {

    state = { menu: false }


    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    render() {
        return (
            <div className='layout'>
                <Drawer
                    isOpen={this.state.menu}
                />

                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}