import React, { Component } from 'react'
import request from 'superagent';
import { Link } from 'react-router-dom';
import PokeItem from './PokeItem.js';
import Paging from './Paging.js';

export default class ListPage extends Component {
    state = {
        searchQuery: this.props.match.params.search,
        pokeArray: [],
        numResults: '',
    }

    async componentDidMount() {
        if(this.props.match.params.search) {
            const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${this.props.match.params.search}`)

            this.setState({pokeArray: data.body.results})
        } else if(!this.props.match.params.search) {
            const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=`)

            this.setState({pokeArray: data.body.results})
        } 
    }

    //should fix problem of Home link not working from search results page
    async componentWillUpdate(nextProps) {
        const param = this.props.match.params.search;
        let nextParam = nextProps.match.params.search;
        if (param !== nextParam && !nextParam) {
            this.setState({ 
                pokeArray: [],
                searchQuery: ''
            })         
        }
    }
    
    handleChange = (event) => this.setState({ searchQuery: event.target.value });

    handleSearch = async (e) => {
        e.preventDefault();

        const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${this.state.searchQuery}`)

        this.setState({ 
            pokeArray: data.body.results,
            numResults: data.body.count,
        });

        this.props.history.push(this.state.searchQuery);
    }


    render() {
        return (
            <div className="App">
                <header>
                    <form onSubmit={this.handleSearch}>
                        <input 
                            name="search" 
                            value={this.state.searchQuery}
                            onChange={this.handleChange} />
                        <button>Search by Name</button>
                    </form>
                </header>
                <Paging numResults={this.state.numResults} />
                <ul>
                    {
                        this.state.pokeArray.map(pokeObject => 
                            <Link to={`pokeItem/${pokeObject.pokemon}`} key={`link_${pokeObject._id}`}>
                            <PokeItem pokeObject={pokeObject} key={pokeObject._id} />
                        </Link>)
                    }
                </ul>
            </div>
        )
    }
}
