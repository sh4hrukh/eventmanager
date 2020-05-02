import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
class EventForm extends Component {
render() {
return (
  <div className="container align-center" style={{width:"100%"}}>
<div className="row">
          <div className="col s8 offset-s2">
            <br/>
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              dashboard
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>{this.props.location.event.title}</b>
              </h4>
              <h5>{this.props.location.getPrintableDate(this.props.location.event.date)}</h5>
              <p>{this.props.location.event.description}</p>
            </div>
            </div>
            </div>
            </div>
    );
  }
}
export default EventForm;