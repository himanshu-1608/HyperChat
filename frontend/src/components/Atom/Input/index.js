import React, { Component } from 'react';
import styles from './Input.module.css';
class Input extends Component {
    render() {
        return (
            <div className={styles.input}>
                <div className={styles.icon}>
                    {this.props.icon}
                </div>
                <div className={styles.input_section}>
                    <input
                        name={this.props.name}
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        className={styles.input_box}
                    />
                </div>
            </div>
        );
    }
}
export default Input;
