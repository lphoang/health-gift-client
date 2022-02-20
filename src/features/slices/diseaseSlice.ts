import { IApiState } from 'utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    getError,
    getErrorMsg,
    getSuccess,
    getLoading,
    getInitialApi,
    getInitialDiseaseInfo,
} from '../../apis/initialInformation'
import api from 'apis/commonActions';

const initialDiseases: string[] = [];
const initialState = {
    apiState: getInitialApi(),
    diseases: initialDiseases,
    disease: getInitialDiseaseInfo(),
}

const diseaseSlice = createSlice({
    name: 'diseases',
    initialState: initialState,
    reducers: {
        loading: (state) => { state.apiState = getLoading() },
        diseasesDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.diseases = action.payload;
        },
        diseaseDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.disease = action.payload;
        },
        error: (state, action: PayloadAction<string>) => {
            state.apiState = getError(state.apiState, action.payload);
        }
    }
})

export const getAllDiseases = () => async (dispatch: any) => {
    dispatch(actions.loading);
    try {
        const response = await api().diseases().getAllDiseases();
        dispatch(actions.diseasesDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const getDisease = (id: string) => async (dispatch: any) => {
    dispatch(actions.loading);
    try {
        const response = await api().diseases().getDisease(id);
        dispatch(actions.diseaseDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const actions = diseaseSlice.actions;

export const selectApiState = (state: { auth: { apiState: IApiState; }; }) => state.auth.apiState;

export default diseaseSlice.reducer;
