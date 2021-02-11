import { Component } from "react";
import styles from './SubscribersModal.module.css';

class SubscribersModal extends Component{
    render(){
        return(
            <div className={styles.modal}>
                <div className={styles.modal_box}>
                    <div className={styles.modal_inner_box}>
                        <div className={styles.total_members}>
                            25 members in 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default SubscribersModal;