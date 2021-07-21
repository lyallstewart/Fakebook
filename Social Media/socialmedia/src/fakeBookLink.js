import React, { Component } from 'react'
import history from './history.js'

export class FakeBookLink extends Component {
    constructor() {
        super()
        this.linkClicked = this.linkClicked.bind(this)
    }
    linkClicked(e) {
        e.preventDefault()
        history.push(this.props.href)
    }
    render() {
        return (
            <a onClick={this.linkClicked} href={this.props.href} className={this.props.className} style={this.props.style}>
                {this.props.children}
            </a>
        )
    }
}

export default FakeBookLink
