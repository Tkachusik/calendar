
export const changeTextEvent = (text) => ({type:"CHANGE_TEXT_EVENT", text});
export const selectEventUsers = (selectedUsers) => ({type:"SELECT_EVENT_USERS", selectedUsers});
export const selectEventDay = (selectedDay) => ({ type: "SELECT_EVENT_DAY", selectedDay});
export const selectEventTime = (selectedTime) => ({ type: "SELECT_EVENT_TIME", selectedTime});
export const createEvent = () => ({ type: "CREATE_EVENT" });
export const resetToDefault = () => ({ type: "RESET_TO_DEFAULT" });
export const selectCalendarMember = (selectedMember) => ({ type: "SELECT_CALENDAR_MEMBER", selectedMember});
export const deleteEvent = (time, day) => ({ type: "DELETE_EVENT", time, day});