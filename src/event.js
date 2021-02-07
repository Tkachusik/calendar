import React from 'react';
import { connect } from 'react-redux';
import { changeTextEvent, selectEventUsers, selectEventDay, selectEventTime, createEvent } from './actions';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const Event = ({eventName, changeTextEvent, users, selectEventUsers, calendar, selectEventDay, selectEventTime, createEvent, isEventTimeFree, isEventCreatedSuccessfuly}) => {
    if (isEventCreatedSuccessfuly === true) {
        return(<Redirect to="/calendar" />)
    }
    return (
        <div className="container">
            {isEventTimeFree ? "" : 
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Failed to create an event! Time slot is already booked</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 new-event">
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-4 col-form-label">Name of the event:</label>
                        <div className="col-8">
                            <input onChange={(event) => changeTextEvent(event.target.value)} value={eventName} className="form-control" type="text" placeholder="FE team sync"></input>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-4 col-form-label">Participants:</label>
                        <div className="col-8">
                            <DropdownMultiselect options={users} name="users" handleOnChange={(selected) => selectEventUsers(selected)} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-4 col-form-label">Day:</label>
                        <div className="col-8">
                            <select className="form-select" onChange={(event) => selectEventDay(event.target.value)}>
                                {[...calendar.get("10:00").keys()].map(day => (
                                    <option value={day} key={day}>{day}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-4 col-form-label">Time:</label>
                        <div className="col-8">
                            <select className="form-select" onChange={(event) => selectEventTime(event.target.value)}>
                                {[...calendar.keys()].map(time => (
                                    <option value={time} key={time}>{time}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col align-self-end">
                            <Link to="/calendar" className="btn btn-light distance">Cancel</Link>
                            <button className="btn btn-light distance" onClick={() => createEvent()}>Create</button>
                        </div>
                    </div>
                </div>
                <div className="col-3"></div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        eventName: state.eventName,
        users: state.users,
        calendar: state.calendar,
        isEventTimeFree: state.isEventTimeFree,
        isEventCreatedSuccessfuly: state.isEventCreatedSuccessfuly,
    }
}

const mapDispatchToProps = {
    changeTextEvent,
    selectEventUsers,
    selectEventDay,
    selectEventTime,
    createEvent,
}
export default connect(mapStateToProps, mapDispatchToProps)(Event);