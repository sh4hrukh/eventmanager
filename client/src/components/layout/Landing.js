import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Landing extends Component {

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
  }

  render() {
    return (
      <div  className="container valign-wrapper" style={{backgroundColor:"rgb(255,255,255,0.9)"}}>
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Welcome!</b>
            </h4>
            <p className="flow-text text-lighten-1">
            Event Manager is a web based App. It helps you manage events easily.<br/>
              Get started by registering your account or login in if you already have an account.
            </p>
            <br />
            <div className="col s12">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
              <br/>
              <br/>
            </div>
            <div className="col s12">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Landing);