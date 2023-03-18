import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import categoriesJson from './Api/categories.json'
import productsByCtgJson from './Api/category.json'

import {Route,withRouter} from 'react-router-dom'
import Pdp from "./components/Pdp";
import Plp from "./components/Plp";
class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {selectedProducts:[],checker:'',productsArray:[],currentCurrency:'USD',selectedAttr:[],ctgArray:[],testFetch:[]}
  }

  selectCurrency = (label)=>{
    this.setState({currentCurrency:label})
  }

  componentDidMount(){
    let getData = async ()=>{

      let path = window.location.pathname === '/' ? 'all' : window.location.pathname.replace('/','')
      let fetchProduct = await productsByCtgJson.data

      let newArray = fetchProduct[path].map(m=>{
        return {...m,coun:0}
      })

      let allCategories = await categoriesJson
      let ctg = allCategories.data.categories

      this.setState({productsArray:newArray})
      this.setState({ctgArray:ctg})

      this.setState({testFetch:fetchProduct})

    }
    getData()

  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      let k = 0;
      this.state.ctgArray.map(m=>{

        if(m.name === window.location.pathname.replace('/','') || window.location.pathname === "/")
        {
          k = 1;
        }
        
      })

      if(k === 1)
      {
      const reRunFetch = async () =>{
        let path = window.location.pathname === '/' ? 'all' : window.location.pathname.replace('/','')
        let fetchProduct = await productsByCtgJson.data
        let newArray = fetchProduct[path]

        this.setState({productsArray:newArray})

      }
      reRunFetch()
      }
    }
  }
  checkoutBag = (product,index)=>{
    
    this.setState((prevState) => {
      if(prevState.selectedProducts.length > 0){
        let j = 0;
          prevState.selectedProducts.map((m,index)=>{
            if(m.id === product.id){
              j=1;

                  product.coun = m.coun;
              let temp_state = this.state.selectedProducts;

              let temp_element = product;
          
              temp_element.coun = temp_element.coun+1;
              temp_state[index] = temp_element;

              return{
                selectedProducts: [...temp_state]
              }
              
            }
          })
          if(j === 0){
            product.coun = 1;
            return{
              selectedProducts: [...prevState.selectedProducts, product]
            }
          }

      }
      else{
        product.coun = 1;
        return{
          selectedProducts: [...prevState.selectedProducts,product]
        }
      }
    });
  }

  sumUp = (product,index) =>{
    let indx;
    let temp_state = this.state.selectedProducts;
    temp_state.forEach((e,index)=>{
      if(e.id === product.id){
        indx= index;
      }
    })

    let temp_element = product;

    temp_element.coun = temp_element.coun+1;

    temp_state[indx] = temp_element;


    this.setState({selectedProducts:temp_state})
  }
  onSubstruct = (product) =>{


      if(product.coun === 1){
        product.coun = 0
        this.setState((prevState) => ({
          selectedProducts: prevState.selectedProducts.filter(f=> product.id !== f.id )

        }))

        if(this.state.selectedAttr.length>0){
          let newArray = this.state.selectedAttr.filter(m=>{
            return m.id !== product.id

          })
            this.setState({selectedAttr:newArray})
        }


      }
      else{
        product.coun -= 1
        this.setState(prevState => ({
          selectedProducts: [...prevState.selectedProducts]
          
        }))
      }


  }

  selectAttr= (attrVal,id,attrLabel)=>{
        
    if(this.state.selectedAttr.length >0){
        let k = 0;
        let newArray = this.state.selectedAttr.filter(m=>{
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
            this.setState({selectedAttr:newArray})
        }
        else{
            this.setState(prevState => ({
            selectedAttr:[...prevState.selectedAttr,{attrVal,id,attrLabel}]
        }))

        }

    }
    else{
        this.setState({selectedAttr:[{attrVal,id,attrLabel}]})
    }

}

  render(){
    return(
        <>
        <Header ctgArray={this.state.ctgArray} selectAttr={this.selectAttr} currentCurrency={this.state.currentCurrency} selectedCurrency={this.selectCurrency} onSubstruct={this.onSubstruct} sumUp={this.sumUp}  addedProductsArray={this.state.selectedProducts} attrList = {this.state.selectedAttr}/>

        {this.state.ctgArray.map(m=>{
          return(
            <Route key={m.name} exact path={m.name === 'all' ? '/' : `/${m.name}`}>
                
                <Home selectAttr={this.selectAttr} attrList = {this.state.selectedAttr} ctgName={m.name} currentCurrency={this.state.currentCurrency} productsArray={this.state.productsArray}
                   addCart={this.checkoutBag}
                   />
            </Route>
          )
        })}

        <Route exact path="/pdp/:id" render={({ match }) => (
          <Pdp selectedProducts={this.state.selectedProducts} selectAttr={this.selectAttr} attrList = {this.state.selectedAttr} addCart={this.checkoutBag} currentCurrency={this.state.currentCurrency} quant={this.state.productsArray.filter(f=>f.id === match.params.id).map(m=>m.coun)} data={match.params.id} />
          )} />
        
        <Route path="/plp" >
          <Plp onSubstruct={this.onSubstruct} sumUp={this.sumUp} selectAttr={this.selectAttr} attrList = {this.state.selectedAttr} selectedProducts={this.state.selectedProducts} currentCurrency={this.state.currentCurrency} />
        </Route>
        </>

    )
  }

}

export default withRouter(App);
