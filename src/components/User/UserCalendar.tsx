import React, { useEffect } from 'react';
import {
    Inject,
    Week,
    Month,
    Agenda,
    Day,
    ScheduleComponent,
    WorkWeek,
    EventSettingsModel,
    ViewsDirective,
    ViewDirective,
} from '@syncfusion/ej2-react-schedule';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getAllAppointmentsByPatientId, updateStatus } from 'features/slices/appointmentSlice';
import { AppointmentStatus, AppointmentType } from 'utils/types';
import { generateEndTime, generateStartTime } from 'utils/helpers';


function UserCalendar() {
    const dispatch = useAppDispatch();
    const appointments = useAppSelector(state => state.appointments.appointments);

    const id = useAppSelector(state => state.auth.user?.id);
    const token = useAppSelector(state => state.auth.accessToken);

    useEffect(() => {
        dispatch(getAllAppointmentsByPatientId(id, token))
        appointments.forEach((app) => {
            if ((generateEndTime(app).getTime() < new Date().getTime()) && app.appointment?.status !== AppointmentStatus.DONE) {
            dispatch(updateStatus("DONE", token, app.appointment?.id));
        }
    })
}, [])


useEffect(() => {
    document.title = "Lịch hẹn"
})

const dataSource: any[] = [];
appointments.map((app) => {
    let color = AppointmentStatus[app.appointment?.status] === "INCOMING" ? "#4B0082" : "#808080";
    let calendarData = {
        Id: app.appointment?.id,
        StartTime: generateStartTime(app),
        EndTime: generateEndTime(app),
        EventType: AppointmentType[app.appointment?.appointmentType],
        Title: app.appointment?.title,
        CategoryColor: color,
        Description: app.appointment?.description,
        Location: app.location,
    }
    return dataSource.push(calendarData);
})

console.log(dataSource);

const data: EventSettingsModel = {
    dataSource: dataSource,
    fields: {
        subject: { name: "Title", default: 'No title is provided' },
        startTime: { name: "StartTime" },
        endTime: { name: "EndTime" },
        description: { name: "Description" },
        location: { name: "Location" }
    }
}

console.log(data.dataSource);

return (
    <div className="w-full h-full">
        <ScheduleComponent height="70vh" width="100%" currentView="Week" selectedDate={new Date()} eventSettings={data}>
            <ViewsDirective>
                <ViewDirective option="Day"></ViewDirective>
                <ViewDirective option="Week"></ViewDirective>
                <ViewDirective option="Month" isSelected={true} showWeekNumber={true}></ViewDirective>
                <ViewDirective option="WorkWeek"></ViewDirective>
                <ViewDirective option="Agenda"></ViewDirective>
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
    </div>
);
}

export default UserCalendar;