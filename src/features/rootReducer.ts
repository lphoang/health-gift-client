import authReducer from 'features/slices/authSlice'
import doctorReducer from 'features/slices/doctorSlice'
import patientReducer from 'features/slices/patientSlice'
import appointmentReducer from 'features/slices/appointmentSlice'
import blogReducer from 'features/slices/blogSlice'
import diseaseReducer from 'features/slices/diseaseSlice'
import specialistReducer from 'features/slices/specialistSlice'
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
    auth: authReducer,
    doctors: doctorReducer,
    patients: patientReducer,
    appointments: appointmentReducer,
    blogs: blogReducer,
    diseases: diseaseReducer,
    specialists: specialistReducer
})