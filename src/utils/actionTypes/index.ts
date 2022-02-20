import { Status } from 'utils/types';

export const ActionTypes = {
    USER_LOGIN_SUCCESS: undefined,
    USER_LOGIN_REQUEST: undefined,
    USER_LOGIN_FAILURE: undefined,
    USER_REGISTER_REQUEST: undefined,
    USER_REGISTER_SUCCESS: undefined,
    USER_REGISTER_FAILURE: undefined,
}

export const STATUS: Status = {
    IDLE: 'idle',
    RUNNING: 'running',
    ERROR: 'error',
    SUCCESS: 'success'
}