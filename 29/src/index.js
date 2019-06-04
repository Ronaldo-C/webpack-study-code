import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './home.js'
import List from './list.js'
import axios from 'axios'

class App extends Component {
	// UNSAFE_componentWillMount() {
	// 	axios.get('/react/api/header.json').then(res => {
	// 		console.log(res)
	// 	})
	// }
	
	render() {
		return (
			<BrowserRouter>
				<div>
					<Route path='/' exact component={Home} />
					<Route path='/list' component={List} />
				</div>
			</BrowserRouter>
		)
	}

}

ReactDOM.render(
	<App />,
	document.getElementById('root')
  );