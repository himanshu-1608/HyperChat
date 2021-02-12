import { Component } from 'react';
import styles from './CreateChannelModal.module.css';
import { VscChromeClose } from 'react-icons/vsc';

class CreateChannelModal extends Component {

    state = {
        channelName: '',
        channelDesc: ''
    }

    isDataValid = () => {
        const { channelName, channelDesc } = this.state;
        return channelName.trim().length && channelDesc.trim().length;
    }

    inputChangeHandler = (e) => this.setState({[e.target.name]: e.target.value});

    addChannelClickHandler = () => {
        if(!this.isDataValid())
            return;

        const { channelName, channelDesc } = this.state;
        const channel = {
            channelName: channelName,
            channelDesc: channelDesc
        }
        this.props.createChannel(channel, this.props.hideModal);
    }

    render() {
        const { hideModal } = this.props;
        return (
            <div className={styles.modal}>
                <div className={styles.modal_box}>
                    <div className={styles.modal_inner_box}>
                        <div className={styles.modal_title}>
                            Create a Channel
                        </div>
                        <div className={styles.modal_desc}>
                            Channels are where your team communicates. They’re
                            best when organized around a topic — #marketing, for
                            example.
                        </div>
                        <div className={styles.modal_inputs}>
                            <div className={styles.input_label}>Name</div>
                            <div className={styles.input_box}>
                                <input
                                    className={styles.input}
                                    name='channelName'
                                    placeholder="#  e.g plan-budget"
                                    value={this.state.channelName}
                                    onChange={this.inputChangeHandler}
                                />
                            </div>
                            <div className={styles.input_label}>
                                Description
                            </div>
                            <div className={styles.input_box}>
                                <input 
                                    className={styles.input}
                                    name='channelDesc'
                                    value={this.state.channelDesc}
                                    onChange={this.inputChangeHandler} />
                            </div>
                            <div className={styles.text}>
                                What’s this channel about?
                            </div>
                        </div>
                        <div className={styles.create_btn_box}>
                            <div className={styles.create_btn} onClick={this.addChannelClickHandler}>Create</div>
                        </div>
                        <div className={styles.cancel_btn} onClick={hideModal}>
                            <VscChromeClose />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default CreateChannelModal;
