import React, { Component } from 'react'

export default class ActivePlanet extends Component {
    render() {
        return <h1 className="css-planet-monitor">Obi-Wan currently on {this.props.planet.name}</h1>
    }
}
