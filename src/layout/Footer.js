import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        let date = new Date();
        let year = date.getFullYear();
        return (
            <div className="footer text-white">
                <i className="fa fa-copyright" aria-hidden="true">© Anna, Lauri & Roni {year}</i>
            </div>
        )
    }
}
