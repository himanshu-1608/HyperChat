import { Component } from "react";
import styles from './Button.module.css';
class Button extends Component{
    render(){
        return(
            <div className={styles.button_box} onClick={this.props.onClick}>
                {this.props.display}
            </div>
        );
    }
}
export default Button;