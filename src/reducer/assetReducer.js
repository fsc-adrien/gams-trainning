const { CHOOSE_ASSET, CLEAR_ASSET } = require("../actions/constant");

const initialState = {
    chosenAsset: '',
    assets: []
};

const assetReducer = (state = initialState, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
}

export default assetReducer;