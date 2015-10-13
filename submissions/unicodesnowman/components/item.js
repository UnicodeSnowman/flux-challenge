import React, { Component } from 'react'
import cn from 'classnames'

export default class Item extends Component {
    render() {
        const { className } = this.props
        const { name, homeworld } = this.props.item
        return (
            <li className={cn('css-slot', className)}>
                {
                    name && homeworld && homeworld.name ?
                        <div>
                            <h3>{name}</h3>
                            <h6>Homeworld: {homeworld.name}</h6>
                        </div> : null
                }
            </li>
        )
    }
}

Component.defaultProps = {
    item: {}
}
