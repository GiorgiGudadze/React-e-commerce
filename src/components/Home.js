import React from "react";
import ProductList from "./ProductList";
import { connect } from "react-redux";

class Home extends React.Component{

  constructor(props){
    super(props)
    this.state = {selectedProducts:[]}

  }

  render(){
    return(
      <div className="productsCnt">
          <div className="currentCtg">{this.props.ctgName}</div>
          <div className="productsWrap">
            <ProductList/>
          </div>
      </div>
    )
  }
}
const mapStateToProps = (state) =>{
  return {selectedProducts: state.selectedProducts}
}

export default connect(mapStateToProps)(Home);
