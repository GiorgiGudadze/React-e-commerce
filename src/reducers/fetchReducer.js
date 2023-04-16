export const fetchReducer = (state = [], action) =>{

    if(action.type === 'FETCH_PRODUCTS'){
        return action.payload
    }

    return state

}