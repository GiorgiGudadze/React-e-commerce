const attributesReducer = (state=[],action) =>{

    if(!!localStorage.getItem('selectedAttr')){
        state = JSON.parse(localStorage.getItem('selectedAttr'))
    }

    switch(action.type){
        case 'SELECT_ATTRIBUTES':
            const {attrVal,id,attrLabel} = action.payload
            if(state.length > 0){
                let k = 0;
                let newArray = state.filter(m=>{
                    if(m.attrLabel === attrLabel && m.id === id){
                        k=1;
                        m.attrLabel = attrLabel
                        m.id = id
                        m.attrVal = attrVal
                        return {attrVal,attrLabel,id}
                    }
                    else{
                        return m
                    }
                })
                if(k===1){
                    localStorage.setItem('selectedAttr', JSON.stringify(newArray))
                    return newArray
                }
                else{
                    localStorage.setItem('selectedAttr', JSON.stringify([...state,{attrVal,id,attrLabel}]))
                    return [...state,{attrVal,id,attrLabel}]
                }
        
            }
            else{
                localStorage.setItem('selectedAttr', JSON.stringify([{attrVal,id,attrLabel}]))
                return [{attrVal,id,attrLabel}]
            }
        case "REMOVE_ATTRIBUTE":
            if(state.length>0){
                localStorage.setItem('selectedAttr', JSON.stringify(state.filter(m=>{
                    return m.id !== action.payload
                  })))
                return state.filter(m=>{
                  return m.id !== action.payload
                })
            }
            return state

        default:
            return state
    }

}

export default attributesReducer