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
    menuCloseHandler= () => {
        this.setState({menu: false})
    }

    render() {
        return (
            <div className='layout'>
                <Drawer
                    isOpen={this.state.menu}
                    onClose={this.menuCloseHandler}
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