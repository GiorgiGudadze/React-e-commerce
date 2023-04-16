export const selectProductReducer = (state=[], action) =>{
    if(!!localStorage.getItem('selectedProducts')){
      state = JSON.parse(localStorage.getItem('selectedProducts'))
    }

    switch(action.type){
      case "SELECT_PRODUCT" :
        if(state.length > 0){
            let j = 0;
            let temp_element = {...action.payload};
            let indx;
            state.forEach((m,index)=>{
                if(m.id === action.payload.id){
                  j=1;
                  indx = index;
                  if(!temp_element.coun){
                    temp_element.coun = m.coun
                  }
                }
              })
              if(j === 0){
                temp_element.coun = 1;
                localStorage.setItem('selectedProducts',JSON.stringify([...state, temp_element]))
                return [...state, temp_element]
              }
              else{
                temp_element.coun += 1;
                state[indx] = temp_element;
                localStorage.setItem('selectedProducts',JSON.stringify([...state]))
                return [...state]
              }
    
          }
          else{
            let temp_element = {...action.payload}
            temp_element.coun = 1;
            localStorage.setItem('selectedProducts',JSON.stringify([...state, temp_element]))
            return [...state, temp_element]
          }

        case "SUBTRACT_PRODUCT":
          let updatedState = state.map((m) => {
            if (m.id === action.payload.id) {
              if (m.coun === 1) {
                return null;
              } else {
                return { ...m, coun: m.coun - 1 };
              }
            }
            return m;
          }).filter(Boolean); 
          
          localStorage.setItem('selectedProducts', JSON.stringify(updatedState));
          return updatedState;

        default:
          return state;
    }
}