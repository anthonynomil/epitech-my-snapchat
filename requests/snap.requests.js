import axios from "axios";
import {url} from "../config/api.config";

const API_URL_SNAP = url + "snap/";

export const sendSnap = async (snap, token) => {
    const options = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL_SNAP, snap, options)
    return response.data
}

export const getUserSnap = async (token) => {
    const options = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL_SNAP, options)
    return response.data
}

export const getSnapById = async (token, id) => {
    const options = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL_SNAP + id, options)
    return response.data
}

export const seeSnap = async (token, id) => {
    const options = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL_SNAP + "/seen/" + id, {}, options)
    return response.data
}
