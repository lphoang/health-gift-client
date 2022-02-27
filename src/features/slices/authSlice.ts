import { LoginRequest, RegisterRequest } from '../../utils/types';
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
    isLogged: false,
    verifiedToken: "",
    accessToken: "",
    apiState: getInitialApi(),
    user: getInitialUserInfo(),
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLogged: (state) => { state.isLogged = true },
        setIsNotLogged: (state) => { state.isLogged = false },
        authLoading: (state) => { state.apiState = getLoading() },
        authLogout: () => { return initialState },
        authDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.user = action.payload.userDetails;
            state.isLogged = action.payload.userDetails.enabled;
            state.verifiedToken = action.payload.verifiedToken;
            state.accessToken = action.payload.accessToken;
        },
        authError: (state, action: PayloadAction<string>) => {
            state.apiState = getError(state.apiState, action.payload);
            state.isLogged = false;
        },
        emptyError: (state) => {
            state.apiState.isError = false;
            state.apiState.errorMessage = "";
        }
    }
})

export const authLogin = ({ email, password }: LoginRequest) => (dispatch: any) => {
    dispatch(actions.authLoading());
    return api().auth().login({ email, password })
        .then((response: any) => {
            dispatch(actions.authDone(response.data))
        })
        .catch((error: any) => {
            dispatch(actions.authError(getErrorMsg(error)))
        })
}

export const authRegister = ({ firstName, lastName, email, password, appRole }: RegisterRequest) => (dispatch: any) => {
    dispatch(actions.authLoading());
    return api().auth().register({ firstName, lastName, email, password, appRole })
        .then((response: any) => {
            dispatch(actions.authDone(response.data))
        })
        .catch((error: any) => {
            dispatch(actions.authError(getErrorMsg(error)))
        })
}

export const authLogout = (dispatch: any) => {
    dispatch(actions.authLoading());
    dispatch(actions.authLogout());
    localStorage.removeItem("state");
}

export const emptyError = (dispatch: any) => {
    dispatch(actions.emptyError())
}

export const actions = authSlice.actions;

export const selectApiState = (state: any) => state.auth.apiState;

export const selectIsLogged = (state: any) => state.auth.isLogged;

export default authSlice.reducer;