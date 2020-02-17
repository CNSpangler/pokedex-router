import React, { Component } from 'react'
import request from 'superagent';
import { Link } from 'react-router-dom';
import PokeItem from './PokeItem.js';
import Paging from './Paging.js';

export default class ListPage extends Component {
    state = {
        searchQuery: '',
        pokeArray: [],
        numResults: '',
    }

    handleSearch = async (e) => {
        e.preventDefault();

        const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${this.state.searchQuery}`)

        this.setState({ 
            pokeArray: data.body.results,
            numResults: data.body.count, 
        });
    }

    render() {
        console.log(this.state);
        return (
            <div className="App">
                <header>
                    <form onSubmit={this.handleSearch}>
                    <input onChange={(e) => this.setState({ searchQuery: e.target.value })}/>
                    <button>Search by Name</button>
                    </form>
                </header>
                <Paging numResults={this.state.numResults} />
                <ul>
                    {
                        this.state.pokeArray.map(pokeObject => 
                            <Link to={pokeObject.pokemon}>
                            {console.log(pokeObject)}
                            <PokeItem pokeObject={pokeObject} key={pokeObject._id} />
                        </Link>)
                    }
                </ul>
            </div>
        )
    }
}
