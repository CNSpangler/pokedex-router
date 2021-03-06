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
                <div id="pokeBox">
                    <h2>{ pokemon }</h2>
                        <div id="pokeBall">
                            <img src={ url_image } alt={ pokebase }></img>
                        </div>
                    <h4>Type: {  type_1 }/{ type_2 }</h4>
                </div>
            </li>
        )
    }
}
