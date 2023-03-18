import React from "react";
import ProductList from "./ProductList";
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
        <ProductList selectAttr={this.props.selectAttr} attrList={this.props.attrList} currentCurrency={this.props.currentCurrency} list={this.props.productsArray} addCart={this.props.addCart}/>

      </div>
      </div>
    )
  }
}

export default Home;
