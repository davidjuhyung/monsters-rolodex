import React, { Component } from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
class App extends Component {
	state = {
		isFetching: true,
		monsters: [],
		searchField: '',
		title: ''
	};

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({ monsters: users, isFetching: false }));
	}

	handleChange = e => {
		this.setState({ searchField: e.target.value, title: e.target.value });
	};

	render() {
		const { monsters, searchField, title } = this.state;

		const filteredMonsters = monsters.filter(monster =>
			monster.name.toLowerCase().includes(searchField.toLowerCase())
		);

		return (
			<div className="App">
				<h1>{title}</h1>
				<SearchBox
					placeholder="search monsters..."
					handleChange={this.handleChange}
				></SearchBox>
				<CardList
					monsters={filteredMonsters}
					isFetching={this.state.isFetching}
				></CardList>
			</div>
		);
	}
}

export default App;
