import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEvent, updateEvent } from "../../actions/authActions";
import M from 'materialize-css'
class EventForm extends Component {
  constructor() {
    super();
    let dateNow=new Date();
    this.state = {
      title: "",
      description: "",
      date: dateNow,
      time:{hour: dateNow.getHours(), mins: dateNow.getMinutes()}
    };
  }

  componentDidMount(){

    var context=this;
    var elems = document.querySelectorAll('.datepicker');
    var instances=M.Datepicker.init(elems, {
      onSelect: date=>{
        context.setState({date});
      }
    });
    elems = document.querySelectorAll('.timepicker');
    M.Timepicker.init(elems, {
      onSelect: (hour,mins)=>{
        context.setState({time: {hour,mins}});
      }

    });
    let event=this.props.location.event;
    if(event)
    {
      let parsedDate=new Date(event.date);
      this.setState({
        title: event.title,
        description: event.description,
        date: parsedDate,
        time: {hour:parsedDate.getHours(),mins:parsedDate.getMinutes()}
      });
      elems= document.querySelectorAll('label');
      elems.forEach(x=> x.classList.add('active'));
      console.log(document.querySelectorAll('label'));
    }
    M.updateTextFields();
  }

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e =>{
    e.preventDefault();
    const { user } = this.props.auth;
let date = this.state.date;
date.setHours(this.state.time.hour);
date.setMinutes(this.state.time.mins);
const newEvent = {
      title: this.state.title,
      description: this.state.description,
      date: date,
      user: user.id
    };
    if(this.props.location.event)
    {
      this.props.updateEvent({...newEvent,
        id: this.props.location.event._id},this.props.history);
    }
    else
      this.props.addEvent(newEvent,this.props.history);
  };
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
                <b>New Event</b>
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  
                  onChange={this.onChange}
                  value={this.state.title||''}
                  id="title"
                  type="text"
                />
                <label htmlFor="title">Title</label>
              </div>
              <div className="input-field col s12">
                <input
                  
                  onChange={this.onChange}
                  value={this.state.description||''}
                  id="description"
                  type="text"
                />
                <label htmlFor="description">Description</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  id="date"
                  type="text"
                  className="datepicker"
                  value={new Date(this.state.date).toDateString()}
                />
                
                <label htmlFor="date">Date</label>
              </div>
              <div className="input-field col s12">
                <input
                  id="time"
                  type="text"
                  className="timepicker"
                  value={this.state.time.hour+':'+this.state.time.mins}
                />
                
                <label htmlFor="time">Time</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Add Event
                </button>
                <br/>
                <br/>
                <br/>
              </div>
            </form>
          </div>
        </div>
        </div>
    );
  }
}
EventForm.propTypes = {
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    {addEvent, updateEvent}
  )(withRouter(EventForm));