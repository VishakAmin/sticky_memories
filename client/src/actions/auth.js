import { AUTH } from '../constants/actionType'
import * as api from '../api/index.js'
console.log(api);

export const signin = (formData, history) => async (dispatch) => {
    try {

        const { data } = await api.signin(formData);

        dispatch({ type: AUTH, data });


        history.push('/')
    }
    catch (error) {

    }
};

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signup(formData);

        dispatch({ type: AUTH, data });

        history.push('/')
    } catch (error) {
        console.log(error);
    }
}
