import React, { Component } from 'react'
import Item from './item'
import Buttons from './buttons'
import Rx from 'rx-dom'
import cn from 'classnames'

export default class List extends Component {
    firstHasMaster() {
        const first = this.props.items.filter(item => item)[0]
        if (first && !first.master) {
            return true
        }
        return Boolean(first && first.master && first.master.id)
    }

    lastHasApprentice() {
        // can't use last index for last... need to use last "defined"
        // value
        const items = this.props.items.filter(item => item)
        const last = items[items.length - 1]
        if (last && !last.apprentice) {
            return true
        }
        return Boolean(last && last.apprentice && last.apprentice.id)
    }

    isActive(item) {
        const { activePlanet } = this.props 

        return (activePlanet && activePlanet.name) ===
            (item && item.homeworld && item.homeworld.name)
    }

    render() {
        const hasMatchingPlanet = Boolean(this.props.items.find(item => {
            return (item && item.homeworld && item.homeworld.name) ===
                (this.props.activePlanet.name)
        }))

        return (
            <section className="css-scrollable-list">
                <ul className="css-slots">
                    {
                        this.props.items.map((item, i) =>
                            <Item
                                className={cn({
                                    active: this.isActive(item)
                                })}
                                key={i}
                                item={item} />)
                    }
                </ul>
                <Buttons
                    disableUp={hasMatchingPlanet || !this.firstHasMaster()}
                    disableDown={hasMatchingPlanet || !this.lastHasApprentice()}
                    onClickDown={this.props.onClickDown}
                    onClickUp={this.props.onClickUp} />
            </section>
        )
    }
}

List.defaultProps = {
    items: []
}
