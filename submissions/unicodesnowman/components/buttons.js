import React, { Component } from 'react'
import cn from 'classnames'

export default class Buttons extends Component {

    render() {
        return (
            <div className="css-scroll-buttons">
                <button 
                    className={cn('css-button-up', {
                        'css-button-disabled': this.props.disableUp
                    } )}
                    disabled={this.props.disableUp}
                    onClick={this.props.onClickUp} />
                <button 
                    className={cn('css-button-down', {
                        'css-button-disabled': this.props.disableDown
                    } )}
                    disabled={this.props.disableDown}
                    onClick={this.props.onClickDown}/>
            </div>
        )
    }
}
