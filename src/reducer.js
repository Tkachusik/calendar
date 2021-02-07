import calendar from "./calendar";

const initDaysMap = () => {
    let map = new Map([
        ["Mon", undefined],
        ["Tue", undefined],
        ["Wed", undefined],
        ["Thu", undefined],
        ["Fri", undefined],
    ]);
    return map
}

const initCalendarMap = () => {
    let map = new Map([
        ["10:00",initDaysMap()],
        ["11:00",initDaysMap()],
        ["12:00",initDaysMap()],
        ["13:00",initDaysMap()],
        ["14:00",initDaysMap()],
        ["15:00",initDaysMap()],
        ["16:00",initDaysMap()],
        ["17:00",initDaysMap()],
        ["18:00",initDaysMap()],
    ])
    return map
}

const initialState = {
    users: ["Liza", "Jenia", "Katya", "Den"],
    calendar: initCalendarMap(),
    eventName: '',
    eventSelectedUsers: [],
    eventSelectedDay: 'Mon',
    eventSelectedTime: '10:00',
    isEventTimeFree: true,
    isEventCreatedSuccessfuly: false,
    filterByMember: 'All members',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_TEXT_EVENT": 
            return {
            ...state,
            eventName: action.text,
        }
        case "SELECT_EVENT_USERS":
            return {
                ...state,
                eventSelectedUsers: action.selectedUsers,
            }
        case "SELECT_EVENT_DAY":
            return {
                ...state,
                eventSelectedDay: action.selectedDay,
            }
        case "SELECT_EVENT_TIME":
            return {
                ...state,
                eventSelectedTime: action.selectedTime,
            }
        case "CREATE_EVENT": 
            if (state.eventName == '' || state.eventSelectedUsers.length == 0) {
                return state;
            }

            if (state.calendar.get(state.eventSelectedTime).get(state.eventSelectedDay) != undefined) {
                return {
                    ...state,
                    isEventTimeFree: false,
                };
            }

            const newCalendar = new Map(state.calendar);
            newCalendar.get(state.eventSelectedTime).set(state.eventSelectedDay, {eventText: state.eventName, users: state.eventSelectedUsers});
            
            return {
                ...state,
                calendar: newCalendar,
                isEventCreatedSuccessfuly: true,
            }
        case "RESET_TO_DEFAULT":
            return {
                ...state,
                eventName: '',
                eventSelectedUsers: [],
                eventSelectedDay: 'Mon',
                eventSelectedTime: '10:00',
                isEventTimeFree: true,
                isEventCreatedSuccessfuly: false,
            }
        case "SELECT_CALENDAR_MEMBER":
            return {
                ...state,
                filterByMember: action.selectedMember,
            }
        case "DELETE_EVENT":
            const newCalendarAfterDelete = new Map(state.calendar);
            newCalendarAfterDelete.get(action.time).set(action.day, undefined);

            return {
                ...state,
                calendar: newCalendarAfterDelete,
            }
        default:
            return state;
    }
};

export default reducer;