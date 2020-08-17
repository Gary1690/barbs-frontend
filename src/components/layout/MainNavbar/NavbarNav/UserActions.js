import React from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {logout} from "../../../../actionCreators"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    const {user} = this.props
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={user.picture&& user.picture.url}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">{this.props.user? `${user.name} ${user.lastname}` :"No user"}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="/profile">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={()=>this.props.logout()} as={Link} to="/" className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
const msp = (state) => {
  return {
    user:state.user
  }
}

const mdp = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}


export default connect(msp,mdp)(UserActions)