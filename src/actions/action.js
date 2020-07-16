import { ADD_USER, EDIT_USER, DELETE_USER, CHOOSE_ASSET, CLEAR_ASSET } from "./constant";

export const addUser = (id) => {
    return {
        type: ADD_USER,
        id
    }
}

export const editUser = (id) => {
    return {
        type: EDIT_USER,
        id
    }
}

export const deleteUser = (id) => {
    return {
        type: DELETE_USER,
        id
    }
}

export const chooseAsset = (code) => {
    return {
        type: CHOOSE_ASSET,
        code,
    }
}

export const clearAsset = () => {
    return {
        type: CLEAR_ASSET
    }
}