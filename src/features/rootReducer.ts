import authReducer from 'features/slices/authSlice'
import doctorReducer from 'features/slices/doctorSlice'
import patientReducer from 'features/slices/patientSlice'
import appointmentReducer from 'features/slices/appointmentSlice'
import blogReducer from 'features/slices/blogSlice'
import diseaseReducer from 'features/slices/diseaseSlice'
import specialityReducer from 'features/slices/specialitySlice'
import hospitalReducer from 'features/slices/hospitalSlice'
import certificateReducer from 'features/slices/certificateSlice'
import bucketReducer from './slices/bucketSlice'
import timeslotReducer from './slices/timeslotSlice'
import userReducer from './slices/userSlice'
import zoomReducer from './slices/zoomSlice'
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
    auth: authReducer,
    doctors: doctorReducer,
    patients: patientReducer,
    appointments: appointmentReducer,
    blogs: blogReducer,
    diseases: diseaseReducer,
    specialities: specialityReducer,
    hospitals: hospitalReducer,
    timeslots: timeslotReducer,
    certificates: certificateReducer,
    buckets: bucketReducer,
    user: userReducer,
    zoom: zoomReducer
})