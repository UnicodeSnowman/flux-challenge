import React, { Component } from 'react'
import { connect } from 'react-redux'
import List from '../components/list'
import ActivePlanet from '../components/active_planet'
import { getMasters, getApprentices, fetchJedisStartingWith } from '../action_creators'

export default class Root extends Component {

    componentDidMount() {
        this.props.fetchJedisStartingWith(3616)
    }

    render() {
        const { planet, items, onClickUp, onClickDown } = this.props

        return (
            <div className="app-container">
                <div className="css-root">
                    <ActivePlanet planet={planet} />
                    <List
                        onClickUp={onClickUp}
                        onClickDown={onClickDown}
                        activePlanet={planet}
                        items={items} />
                </div>
            </div>
        )
    }
}

export default connect(
    state => {
        return {
            items: state.items,
            planet: state.planet
        }
    },
    {
        onClickUp: getMasters,
        onClickDown: getApprentices,
        fetchJedisStartingWith
    })(Root)
