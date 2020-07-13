import { ADD_USER, DELETE_USER, EDIT_USER } from "../actions/constant";


const initState = {
    users: []
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
            }
        case EDIT_USER:
            return {

            }
        case DELETE_USER:
            return {

            }
        default:
            return state;
    }
}

export default userReducer;