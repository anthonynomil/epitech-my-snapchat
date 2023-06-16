import axios from "axios";
import {url} from "../config/api.config";

const API_URL_USER = url + "user/";

export const registerUser = async (data) => {
    const response = await axios.post(API_URL_USER, data)
    return response.data
}

export const loginUser = async (data) => {
    const response = await axios.put(API_URL_USER, data)
    return response.data
}

export const deleteUser = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL_USER, config)
    return response.data
}

export const getUserFriends = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL_USER + "friends", config)
    return response.data
}

export const getUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL_USER, config)
    return response.data
}

export const getUserById = async (token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL_USER + id, config)
    return response.data
}
