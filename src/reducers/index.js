import { combineReducers } from "redux";
import { selectProductReducer } from "./selectProductReducer";
import attributesReducer from "./attributesReducer";
import currencyReducer from "./currencyReducer";
import { fetchReducer } from "./fetchReducer";
import { categoriesReducer } from "./categoriesReducer";

export default combineReducers({
    selectedProducts: selectProductReducer,
    attrReducer: attributesReducer,
    selectedCurrency: currencyReducer,
    productsList: fetchReducer,
    allCategories: categoriesReducer
})