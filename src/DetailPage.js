import React, { Component } from 'react'
import request from 'superagent';
import PokeItem from './PokeItem.js';
import './Detail.css';

export default class DetailPage extends Component {
    state = { 
        pokeObject: {}
    }

    async componentDidMount() {
        const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${this.props.match.params.pokemon}`)

        console.log(this.props.match.params.pokemon);
        console.log(data);
        if (data.body.results) {
            this.setState({ pokeObject: data.body.results[0] })
        }
    }

    render() {
        const { pokeObject } = this.state;

        return (
            <PokeItem key={pokeObject._id} pokeObject={pokeObject} />
        )
    }
}