import { GET_PRODUCTS } from "../actionTypes"


const initialState = {
    products: []
  };

const productReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case GET_PRODUCTS:
          { console.log("entering productReducer",payload)
           console.log ({...state, products: payload})
           return { ...state, products: payload };
          }
    default:
        return state;
    }
}
    

  
export default productReducer;