import React, { Component } from 'react'
import ReactDom from 'react-dom'
import _ from 'lodash'

class App extends Component {
	render() {
		return (
			<div>
				<h1>{_.join(['this','is','App'], ' ')}</h1>
			</div>
		)
	}
}

ReactDom.render(<App />, document.getElementById('root'))