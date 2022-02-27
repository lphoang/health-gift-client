import React from 'react';
import { IApiState } from '../../utils/types';
import Loading from './Loading';

export default function ApiState({ isLoading, isSuccess, isError, errorMessage }: IApiState) {
    return <>
        {isLoading && <div style={{ "color": "white", "textAlign": "center", "margin": "1rem" }}><Loading /></div>}
        {isSuccess && <div style={{ "color": "white", "textAlign": "center", "margin": "1rem" }}>Done!</div>}
        {isError && <div style={{ "color": "red", "textAlign": "center", "margin": "1rem" }}>{errorMessage}</div>}
    </>;
}