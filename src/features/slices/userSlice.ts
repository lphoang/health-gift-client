import { emptyMessage } from './doctorSlice';
import { IApiState } from 'utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    getError,
    getErrorMsg,
    getSuccess,
    getLoading,
    getInitialApi,
    getInitialUserInfo,
} from '../../apis/initialInformation'
import api from 'apis/commonActions';

const initialState = {
    apiState: getInitialApi(),
    user: getInitialUserInfo()
}

const doctorSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        loading: (state) => { state.apiState = getLoading() },
        userDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.user = action.payload;
        },
        error: (state, action: PayloadAction<string>) => {
            state.apiState = getError(state.apiState, action.payload);
        },
        emptyMessage: (state) => {
            state.apiState = getInitialApi();
        }
    }
})

export const getUserInfo = (id: string, token: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().user().getUserInfo(token, id);
        dispatch(actions.userDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const updateUserInfo = (request: any, token: string, id: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().user().updateUserInfo(request, token, id);
        dispatch(actions.userDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const emptyMsg = () => async (dispatch: any) => {
    await dispatch(actions.emptyMessage());
};

export const actions = doctorSlice.actions;

export const selectApiState = (state: { auth: { apiState: IApiState; }; }) => state.auth.apiState;

export default doctorSlice.reducer;
