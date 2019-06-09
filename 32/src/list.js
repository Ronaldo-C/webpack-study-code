import React, { Component } from 'react'
import ReactDom from 'react-dom'
import _ from 'lodash'

class List extends Component {
	render() {
		return (
			<div>
				<h1>{_.join(['this','is','List'], ' ')}</h1>
			</div>
		)
	}
}

ReactDom.render(<List />, document.getElementById('root'))