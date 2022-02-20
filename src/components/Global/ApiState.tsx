import React from 'react';
import { IApiState } from '../../utils/types';

export default function ApiState({ isLoading, isSuccess, isError, errorMessage }: IApiState) {
    return <>
        {isLoading &&  <p style={{ "color": "white", "textAlign": "center", "margin": "1rem" }}>Loading!</p>}
        {isSuccess && <p style={{ "color": "white", "textAlign": "center", "margin": "1rem" }}>Done!</p>}
        {isError && <p style={{ "color": "red", "textAlign": "center", "margin": "1rem" }}>{errorMessage}</p>}
    </>;
}