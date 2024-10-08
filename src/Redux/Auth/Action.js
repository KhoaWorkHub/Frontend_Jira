import {
    GET_USER_REQUEST, GET_USER_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, LOGOUT,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from "@/Redux/Auth/ActionType.js";
import {API_BASE_URL} from "@/config/api.js";
import axios from "axios";


export const register = (userData) => async (dispatch) => {
    dispatch({type: REGISTER_REQUEST})
    try {
        const {data} = await axios.post(`${API_BASE_URL}auth/signup`, userData)
        if (data.data.jwt) {
            localStorage.setItem("jwt", data.data.jwt)
            dispatch({type: REGISTER_SUCCESS, payload: data})
        }
        console.log("register success", data)
    } catch (error) {
        console.log(error)
    }
}


export const login = (userData) => async (dispatch) => {
    dispatch({type: LOGIN_REQUEST})
    try {
        const {data} = await axios.post(`${API_BASE_URL}auth/login`, userData)
        if (data.data.jwt) {
            localStorage.setItem("jwt", data.data.jwt)
            dispatch({type: LOGIN_SUCCESS, payload: data})
        }
        console.log("login success", data)
    } catch (error) {
        console.log(error)
    }
}

export const getUser = () => async (dispatch) => {
    dispatch({type: GET_USER_REQUEST})
    try {
        const token = localStorage.getItem("jwt");
        if (!token) throw new Error("No token found");

        const {data} = await axios.get(`${API_BASE_URL}api/user/profile`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        dispatch({type: GET_USER_SUCCESS, payload: data.data})
        console.log("getUser success", data)
    } catch (error) {
        console.log(error)
    }
}


export const logout = () => async (dispatch) => {
    dispatch({type: LOGOUT})
    localStorage.clear()
}
