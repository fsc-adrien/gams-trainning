import { ADD_USER, DELETE_USER, EDIT_USER } from "../Action/constant";


const initState ={
    users: []
}

const reducer = (state = initState, action) => {
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

export default reducer;