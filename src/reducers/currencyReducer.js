const currencyReducer = (state='USD', action) =>{
    if(!!localStorage.getItem('selectedCurrency')){
        state = localStorage.getItem('selectedCurrency')
    }
    if(action.type === "SELECT_CURRENCY"){
        localStorage.setItem('selectedCurrency', action.payload)
        return action.payload
    }
    return state
}

export default currencyReducer