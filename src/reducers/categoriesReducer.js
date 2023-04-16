export const categoriesReducer = (state=[], action) =>{

    if(action.type === "FETCH_CATEGORIES"){
        return action.payload
    }

    return state
}