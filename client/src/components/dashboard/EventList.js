import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getEvents ,deleteEvent } from "../../actions/authActions";
import {bindActionCreators} from 'redux';


class EventList extends Component {
  constructor() {
    super();
    this.state = {
      eventlist:[]
    };
  }
    componentDidMount() {

    const {user}=this.props.auth;
    this.props.getEvents(user.id);
    this.setState({eventlist:this.props.auth.events});
  }

  render() {
    const events=this.props.auth.events;
    var message=<p>No Events Added Yet! </p>;
    var cards;
    var addEventButton=<Link
    to="/dashboard/add"
    style={{
      width: "140px",
      borderRadius: "3px",
      letterSpacing: "1.5px"
    }}
    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
  >
    Add New Event
  </Link>;
    if(events.length>0)
    {
     
    cards= events.map(x=><div className="col s12 m6 l4"><div className="row s12">
    <div className="col s12">
      <div className="card " style={{backgroundColor: "rgb(0,0,0,0.7)"}}>
        <div className="card-content white-text">
          <span className="card-title">{x.title}</span>
          <p>{ getPrintableDate(x.date)}</p>
          <p>{x.description}</p>
        </div>
        <div className="card-action">
        <Link
    to={{pathname:"/dashboard/view",event: x,getPrintableDate}}
    /*style={{
      width: "140px",
      borderRadius: "3px",
      letterSpacing: "1.5px"
    }}*/
    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
  >
    View
  </Link>
          <Link
    to={{pathname:"/dashboard/add",event: x}}
    /*style={{
      width: "140px",
      borderRadius: "3px",
      letterSpacing: "1.5px"
    }}*/
    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
  >
    Edit
  </Link>
          <button onClick={()=>this.props.deleteEvent(x._id,this.props.history)}>Delete</button>
        </div>
      </div>
    </div>
  </div>
  </div>
         );
    return (
      <div className="container valign-wrapper">
        <div className="row" >
           {cards}
           <div className="col center-align s12">
           {addEventButton}
            </div>
           </div>
           
                </div>
      );

    }
    else
      return (
        <div style={{ height: "50vh"}} className="container valign-wrapper center-align">
          <div style={{ width:"100%"}} className="row center-align">
            <div  className="col s12 center-align">
          {message}
          {addEventButton}
            </div>
            </div>
        </div>
    );
  }
}

const getPrintableDate= dateString=>{
  var date=new Date(dateString);
  return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes();
}

EventList.propTypes = {
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });

  function MapDispatchToProps(dispatch){
    return bindActionCreators({getEvents, deleteEvent},dispatch); 
}

  export default connect(
    mapStateToProps,
    MapDispatchToProps
  )(withRouter(EventList));