import React, { Component } from 'react'

export default class PokeItem extends Component {
    render() {
        const { pokeObject } = this.props;
        const {
            pokemon,
            type_1,
            type_2,
            url_image,
            pokebase
        } = pokeObject

        return (
            <li>
                <h2>{ pokemon }</h2>
                <img src={ url_image } alt={ pokebase }></img>
                <h4>Type: {  type_1 }/{ type_2 }</h4>
            </li>
        )
    }
}
