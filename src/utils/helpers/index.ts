import { IAppointmentResponse } from './../types/common';
export const formatDate = (dateArr: any) => {
    if (dateArr && dateArr.length >= 6) {
        let year = dateArr[0];
        let month = dateArr[1];
        let day = dateArr[2];
        let hour = dateArr[3];
        let minitues = dateArr[4];
        let seconds = dateArr[5];
        return `${hour}h ${minitues}m ${seconds}s - ${day}-${month}-${year}`
    }
}

export const formatToDate = (dateArr: any) => {
    if (dateArr && dateArr.length >= 6) {
        let year = dateArr[0];
        let month = dateArr[1];
        let day = dateArr[2];
        let hour = dateArr[3];
        let minitues = dateArr[4];
        let seconds = dateArr[5];
        return `${day} Tháng ${month}, ${year}, ${hour}:${minitues}:${seconds}`
    }
}

export const getFirstLetters = (arr: any) => {
    return arr?.map((letter: any) => letter.name[0])
        .filter((v: any, i: number, a: string) => a.indexOf(v) === i);
}

export const formatDay = (dateArr: any) => {
    if (dateArr !== null && dateArr.length === 3) {
        let year = dateArr[0].length === 1 ? `0${dateArr[0]}` : dateArr[0];
        let month = dateArr[1].length === 1 ? `0${dateArr[1]}` : dateArr[1];
        let day = dateArr[2];
        let date = new Date(year, month, day);
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        return (`${ye}-${mo}-${da}`);
    }
}

export const generateStartTime = (appointment: IAppointmentResponse) => {
    if (appointment) {
        return new Date(appointment.appointment?.appointmentDate ? appointment.appointment?.appointmentDate[0] : new Date().getFullYear(),
            appointment.appointment?.appointmentDate ? appointment.appointment?.appointmentDate[1] - 1 : new Date().getMonth(),
            appointment.appointment?.appointmentDate ? appointment.appointment?.appointmentDate[2] - 1 : new Date().getDate(),
            appointment.appointment?.timeSlot?.startTime.slice(0, 2), 0)
    } else return new Date()
}

export const generateEndTime = (appointment: IAppointmentResponse) => {
    if (appointment) {
        return new Date(appointment.appointment?.appointmentDate ? appointment.appointment?.appointmentDate[0] : new Date().getFullYear(),
            appointment.appointment?.appointmentDate ? appointment.appointment?.appointmentDate[1] - 1 : new Date().getMonth(),
            appointment.appointment?.appointmentDate ? appointment.appointment?.appointmentDate[2] - 1 : new Date().getDate(),
            appointment.appointment?.timeSlot?.endTime.slice(0, 2), 0)
    } else return new Date()
}