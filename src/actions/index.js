import productsByCtgJson from '../Api/category.json'
import categoriesJson from '../Api/categories.json'
export const selectProduct = (product) =>{

    return{
        type: "SELECT_PRODUCT",
        payload: product
    }
}
export const subtractProduct = (product) =>{

    return{
        type: "SUBTRACT_PRODUCT",
        payload: product
    }
}

export const selectAttributes = (attrVal,id,attrLabel) =>{

    return{
        type: "SELECT_ATTRIBUTES",
        payload: {attrVal,id,attrLabel}
    }
}

export const selectCurrency = (currency) =>{
    return {
        type: "SELECT_CURRENCY",
        payload: currency
    }
}

export const fetchProducts = () => async (dispatch) =>{
    let path = window.location.pathname === '/' ? 'all' : window.location.pathname.replace('/','')
    let fetchProduct = await productsByCtgJson.data

    dispatch({type:"FETCH_PRODUCTS", payload: fetchProduct[path]})
}

export const fetchCategories = () => async (dispatch) =>{
    let fetchCategories = await categoriesJson.data.categories

    dispatch({type:"FETCH_CATEGORIES", payload: fetchCategories})
}

export const removeAttribute = (id) =>{
    return{
        type: 'REMOVE_ATTRIBUTE',
        payload: id
    }
}