// Greeter.js
import React, {Component} from 'react'
import config from '../data/config.json';

import styles from './Greeter.css';//µº»Î

class Greeter extends Component {
    render() {
        return (
            <div className={styles.root}>
                {config.greetText}
            </div>
        );
    }
}

class HelloMessage extends Component {
    render() {
        return (
            <div className={styles.root}>
                <h1>Hello {this.props.name}</h1>
            </div>
        );
    }
}

exports.Greeter = Greeter;
exports.HelloMessage = HelloMessage;