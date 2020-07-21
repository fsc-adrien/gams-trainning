import {
    CHOOSE_ASSET,
    CLEAR_ASSET,
    SET_GROUPS,
    SET_SITES,
    SET_SUPPLIERS,
    SET_TYPES,
    SET_MANUFACTURERS,
    SET_ASSETS,
    SET_STATUS,
} from "../actions/constant";

const initialState = {
    chosenAsset: '',
    assets: [],
    types: [],
    groups: [],
    manufacturers: [],
    suppliers: [],
    sites: [],
    status: [],
};

const assetReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ASSETS:
            return {
                ...state,
                assets: action.payload
            }
        case CHOOSE_ASSET:
            return {
                ...state,
                chosenAsset: action.code
            };
        case CLEAR_ASSET:
            return {
                ...state,
                chosenAsset: ""
            };
        case SET_GROUPS:
            return {
                ...state,
                groups: action.payload,
            }
        case SET_MANUFACTURERS:
            return {
                ...state,
                manufacturers: action.payload,
            }
        case SET_SITES:
            return {
                ...state,
                sites: action.payload,
            }
        case SET_SUPPLIERS:
            return {
                ...state,
                suppliers: action.payload,
            }
        case SET_TYPES:
            return {
                ...state,
                types: action.payload,
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.payload,
            }
        default:
            return state;
    }
}

export default assetReducer;