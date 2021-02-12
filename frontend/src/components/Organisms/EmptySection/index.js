import { Component } from "react";
import styles from './EmptySection.module.css';
import logo from '../../../assests/images/hyperverge.jpg'

class EmptySection extends Component{
    render(){
        return(
            <div className={styles.empty_section}>
                <img src={logo} alt="Company Logo"/>
                <div className={styles.company_name}>
                    HyperVerge
                </div>
            </div>
        );
    }
}
export default EmptySection;