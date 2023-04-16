import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import {Route,withRouter} from 'react-router-dom'
import Pdp from "./components/Pdp";
import Plp from "./components/Plp";
import { subtractProduct,removeAttribute,fetchCategories} from "./actions";
import { connect } from "react-redux";

class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {productsArray:[]}
  }

  componentDidMount(){
    this.props.fetchCategories()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
        let k = 0;
        this.props.allCategories.map(m=>{

          if(m.name === window.location.pathname.replace('/','') || window.location.pathname === "/")
          {
            k = 1;
          }
        
        })
      // if(k === 1)
      // {
      //   const reRunFetch = () => {
      //     this.props.fetchProducts()
      // }
      //   reRunFetch()
      // }
    }
  }

  onSubstruct = (product) =>{
    if(product.coun === 1){
      this.props.removeAttribute(product.id)
    }
    this.props.subtractProduct(product)
  }

  render(){

    return(
        <>
        <Header onSubstruct={this.onSubstruct} />

        {this.props.allCategories.map(m=>{
          return(
            <Route key={m.name} exact path={m.name === 'all' ? '/' : `/${m.name}`}>
                <Home ctgName={m.name} />
            </Route>
          )
        })}

        <Route exact path="/pdp/:id" render={({ match }) => (
          <Pdp data={match.params.id} />
          )} />
        
        <Route path="/plp">
          <Plp onSubstruct={this.onSubstruct} />
        </Route>
        </>

    )
  }

}

const mapStateToProps = (state) => {
  return {
            selectedProducts: state.selectedProducts,
            selectedCurreny: state.selectedCurrency,
            allCategories: state.allCategories
         }
}

export default connect(mapStateToProps,{subtractProduct,fetchCategories,removeAttribute})(withRouter(App));
