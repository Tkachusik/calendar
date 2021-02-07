import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetToDefault, selectCalendarMember, deleteEvent } from './actions';


const Calendar = ({ users, calendar, resetToDefault, isEventCreatedSuccessfuly, selectCalendarMember, filterByMember, deleteEvent }) => {
    if (isEventCreatedSuccessfuly === true) {
        resetToDefault();
    }

    const filterByMembers = ['All members', ...users];
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-6">
                    <h1 className="position1">Calendar</h1>
                </div>
                <div className="col-6">
                    <div className="control-btn">
                        <Link to="/create-event" className="btn btn-light">New event +</Link>
                        <div className="filter-by">
                            <select className="form-select" onChange={(event) => selectCalendarMember(event.target.value)}>
                                {filterByMembers.map(member => (
                                    <option value={member} key={member}>{member}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <table className="table table-bordered table-hover">
                        <colgroup>
                            <col className="col-2"></col>
                            <col className="col-2"></col>
                            <col className="col-2"></col>
                            <col className="col-2"></col>
                            <col className="col-2"></col>
                            <col className="col-2"></col>
                        </colgroup>
                        <thead className="table-light">
                            <tr>
                                <th>Name</th>
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...calendar.keys()].map(time => {
                                const isAvailable = (day) => {
                                    const isDefined = calendar.get(time).get(day);
                                    if (isDefined === undefined) return undefined;

                                    if (filterByMember !== 'All members' && isDefined.users.includes(filterByMember) === false) {
                                        return undefined;
                                    }
                                    
                                    return isDefined
                                }
                                return(
                                    <tr>
                                        <td>{time}</td>
                                        <td className={isAvailable("Mon") ? "table-success" : ""}>{isAvailable("Mon") ? <div>{isAvailable("Mon").eventText} <span onClick={() => window.confirm(`Are you sure you want to delete "${isAvailable("Mon").eventText}" event?`) ? deleteEvent(time, "Mon") : ''}>X</span></div> : ""}</td>
                                        <td className={isAvailable("Tue") ? "table-success" : ""}>{isAvailable("Tue") ? <div>{isAvailable("Tue").eventText} <span onClick={() => window.confirm(`Are you sure you want to delete "${isAvailable("Tue").eventText}" event?`) ? deleteEvent(time, "Tue") : ''}>X</span></div> : ""}</td>
                                        <td className={isAvailable("Wed") ? "table-success" : ""}>{isAvailable("Wed") ? <div>{isAvailable("Wed").eventText} <span onClick={() => window.confirm(`Are you sure you want to delete "${isAvailable("Wed").eventText}" event?`) ? deleteEvent(time, "Wed") : ''}>X</span></div> : ""}</td>
                                        <td className={isAvailable("Thu") ? "table-success" : ""}>{isAvailable("Thu") ? <div>{isAvailable("Thu").eventText} <span onClick={() => window.confirm(`Are you sure you want to delete "${isAvailable("Thu").eventText}" event?`) ? deleteEvent(time, "Thu") : ''}>X</span></div> : ""}</td>
                                        <td className={isAvailable("Fri") ? "table-success" : ""}>{isAvailable("Fri") ? <div>{isAvailable("Fri").eventText} <span onClick={() => window.confirm(`Are you sure you want to delete "${isAvailable("Fri").eventText}" event?`) ? deleteEvent(time, "Fri") : ''}>X</span></div> : ""}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        calendar: state.calendar,
        users: state.users,
        isEventCreatedSuccessfuly: state.isEventCreatedSuccessfuly,
        filterByMember: state.filterByMember,
    }
}
const mapDispatchToProps = {
    resetToDefault,
    selectCalendarMember,
    deleteEvent,
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);