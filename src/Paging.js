import React, { Component } from 'react';

export default class Paging extends Component {
    constructor() {
        super();
        this.state = { page: 1 };
    }

    componentDidMount() {
        this.updateControls();
        
        window.addEventListener('hashchange', () => {
            this.updateControls();
        })
    }

    updatePage(increment) {
        const queryString = window.location.hash.slice(1);
        const searchParams = new URLSearchParams(queryString);
        searchParams.set('page', this.state.page + increment)

        window.location.hash = searchParams.toString();
    }

    updateControls() {
        const queryString = window.location.hash.slice(1);
        const searchParams = new URLSearchParams(queryString);
        let pageToUse = this.state.page;

        const parsedPage = Number(searchParams.get('page'));
        if (isNaN(parsedPage)) {
            pageToUse = 1;
        } else {
            pageToUse = parsedPage;
        }

        this.setState({ page: pageToUse });
    }

    render() {
        const perPage = 50;
        const { numResults } = this.props;
        const queryString = window.location.hash.slice(1);
        const searchParams = new URLSearchParams(queryString);
        const parsedPage = parseInt(searchParams.get('page'));

        let pageToUse;
        if (isNaN(parsedPage)) {
            pageToUse = 1;
        } else {
            pageToUse = parsedPage;
        }

        if (!numResults) {
            return <p>This search did not catch any Pokemon. Try something else!</p>
        }

        const lastPage = Math.ceil(numResults / perPage);

        return(
            <div>
                <button 
                    disabled={pageToUse === 1 ? 'true' : ''}
                    onClick={() => this.updatePage(-1)}
                    type="button"
                >
                    Previous
                </button>
                <button
                    disabled={pageToUse === lastPage ? 'true' : ''}
                    onClick={() => this.updatePage(1)}
                    type="button"
                >Next</button>
            </div>
        )
    }
}