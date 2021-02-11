import { Component } from 'react';
import styles from './Search.module.css';
import { BiSearch } from 'react-icons/bi';

class Search extends Component {
    render() {
        return (
            <div className={styles.search_box}>
                <div className={styles.search_icon}>
                    <BiSearch />
                </div>
                <input
                    className={styles.search_input}
                    placeholder="Search by channel name"
                />
            </div>
        );
    }
}
export default Search;
