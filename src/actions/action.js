import {
    ADD_USER,
    EDIT_USER,
    DELETE_USER,
    CHOOSE_ASSET,
    CLEAR_ASSET,
    SET_GROUPS,
    SET_SUPPLIERS,
    SET_SITES,
    SET_MANUFACTURERS,
    SET_TYPES,
    SET_ASSETS,
    SET_STATUS
} from "./constant";
// USER
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

// ASSET
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

export const setTypes = (types) => {
    return {
        type: SET_TYPES,
        payload: types,
    }
}

export const setGroups = (groups) => {
    return {
        type: SET_GROUPS,
        payload: groups,
    }
}

export const setManufacturers = (manufacturers) => {
    return {
        type: SET_MANUFACTURERS,
        payload: manufacturers,
    }
}

export const setSuppliers = (suppliers) => {
    return {
        type: SET_SUPPLIERS,
        payload: suppliers,
    }
}

export const setSites = (sites) => {
    return {
        type: SET_SITES,
        payload: sites,
    }
}

export const setAssets = (assets) => {
    return {
        type: SET_ASSETS,
        payload: assets
    }
}

export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        payload: status
    }
}