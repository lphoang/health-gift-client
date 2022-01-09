import React, { useEffect } from 'react';
import {
    Inject,
    Day,
    Week,
    Month,
    Agenda,
    ScheduleComponent
} from '@syncfusion/ej2-react-schedule';

function Calendar() {

    useEffect(() => {
        document.title = "Lịch hẹn"
    })

    return (
        <div>
            <ScheduleComponent>
                <Inject services={[Day, Week, Month, Agenda]} />
            </ScheduleComponent>
        </div>
    );
}

export default Calendar;