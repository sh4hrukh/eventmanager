import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import EventList from "./EventList";
import EventForm from "./EventForm";
import ViewEvent from "./ViewEvent";
import { Route, Switch } from "react-router-dom";
import {subscribeUser} from "../../subscription"

class Dashboard extends Component {
  componentDidMount(){
    const { user } = this.props.auth;
    console.log(user);
    subscribeUser(user.id);
  }


  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth;
return (
      <div style={{ width: "70vw" }} className="container grey lighten-4">

        <div className="row">
          <div className="col s12 ">
            <h4 className="left" style={{display:"inline"}}>
              <b>Hey there,</b> {user.name.split(" ")[0]}

            </h4>
              
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
                
              }}
              onClick={this.onLogoutClick}
              className="right btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
            </div>
            <Switch>
        <Route  exact path="/dashboard" component={EventList}/>
        <Route   exact path="/dashboard/add" component={EventForm}/>
        <Route   exact path="/dashboard/view" component={ViewEvent}/>
        </Switch>
          
        </div>
      </div>
      
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);