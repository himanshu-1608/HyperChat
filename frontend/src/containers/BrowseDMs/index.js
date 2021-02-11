import { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from '../../actions/index';

class BrowseDms extends Component{

    componentDidMount(){
        this.props.fetchUsers()
    }

    render(){
        return(
            <div>BrowseDms</div>
        );

    }
}


const mapStateToProps = state => {
    return {
        users: state.general.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(actionCreators.fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseDms);