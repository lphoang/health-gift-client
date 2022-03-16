import { IMeetingRequest } from './../../utils/types/common';
import { IApiState } from 'utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    getError,
    getErrorMsg,
    getSuccess,
    getLoading,
    getInitialApi,
    getInitialMeetingResponse,
    getInitialZoomUser,
    getInitialOAuthToken,
} from '../../apis/initialInformation'
import api from 'apis/commonActions';

const initialState = {
    apiState: getInitialApi(),
    oauthToken: getInitialOAuthToken(),
    user: getInitialZoomUser(),
    meeting: getInitialMeetingResponse(),
    oauthCode: ''
}

const zoomSlice = createSlice({
    name: 'zoom',
    initialState: initialState,
    reducers: {
        loading: (state) => { state.apiState = getLoading() },
        tokenDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.oauthToken = action.payload;
        },
        userDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.user = action.payload;
        },
        meetingDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.meeting = action.payload;
        },
        codeDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.oauthCode = action.payload;
        },
        error: (state, action: PayloadAction<string>) => {
            state.apiState = getError(state.apiState, action.payload);
        },
        emptyMessage: (state) => {
            state.apiState = getInitialApi();
        }
    }
})

export const setOAuthCode = (code: any) => async (dispatch: any) => {
    dispatch(actions.codeDone(code));
}


export const getToken = (code: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().zoom().oauth(code);
        dispatch(actions.tokenDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const getUserInfo = (token: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().zoom().getUserInfo(token);
        dispatch(actions.userDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const createMeeting = (request: IMeetingRequest, token: string, id: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().zoom().createMeeting(request, token, id);
        dispatch(actions.meetingDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const actions = zoomSlice.actions;

export const selectApiState = (state: { auth: { apiState: IApiState; }; }) => state.auth.apiState;

export default zoomSlice.reducer;
