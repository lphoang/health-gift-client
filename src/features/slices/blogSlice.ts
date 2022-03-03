import { IApiState, IBlog } from 'utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    getError,
    getErrorMsg,
    getSuccess,
    getLoading,
    getInitialApi,
    getInitialBlogInfo,
} from '../../apis/initialInformation'
import api from 'apis/commonActions';

const initialBlogs: IBlog[] = [];
const initialState = {
    apiState: getInitialApi(),
    blogs: initialBlogs,
    blog: getInitialBlogInfo(),
}

const blogSlice = createSlice({
    name: 'blogs',
    initialState: initialState,
    reducers: {
        loading: (state) => { state.apiState = getLoading() },
        blogsDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.blogs = action.payload;
        },
        blogDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.blog = action.payload;
        },
        error: (state, action: PayloadAction<string>) => {
            state.apiState = getError(state.apiState, action.payload);
        }
    }
})

export const getAllBlogs = () => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().blogs().getAllBlogs();
        dispatch(actions.blogsDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const getBlog = (id: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().blogs().getBlog(id);
        dispatch(actions.blogDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const createBlog = (request: any, token: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().blogs().create(request, token);
        dispatch(actions.blogDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const updateBlog = (request: any, token: string, id: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().blogs().update(request, token, id);
        dispatch(actions.blogDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const deleteBlog = (token: string, id: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().blogs().delete(token, id);
        dispatch(actions.blogDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const actions = blogSlice.actions;

export const selectApiState = (state: { auth: { apiState: IApiState; }; }) => state.auth.apiState;

export default blogSlice.reducer;
