import React from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import { selectProduct, selectAttributes, fetchProducts } from "../actions";
class ProductList extends React.Component{

    constructor(props){
        super(props)
        this.state = {selectedProducts:[],modal:false,currentId:'',option:true}
    }

    componentDidMount(){
      this.props.fetchProducts()
    }

    productPrice(priceArray){
      return priceArray.map(m=>{
        if(m.currency.label === this.props.currentCurrency){
          return(
            <div key={m.currency.label}>
              <span>{m.currency.symbol}</span>
              {m.amount}
            </div>
          )
        }

      })

    }

    checkAttr=(id,label,val)=>{
        
      for(let list of this.props.attrReducer){
          if(list.id === id && list.attrLabel === label && list.attrVal === val){
              return 'active'
          }
      }
      
    }

    validateAttr=(product)=>{
      let current = this.props.attrReducer.filter(f=>f.id===product.id)
      if(current.length === product.attributes.length){
        this.props.selectProduct(product)
        this.setState({option:true})
        this.setState({modal:false})
      }
      else{
        this.setState({option:false})
      }
    }
    
    renderAttrubtes(attrubteArray,id,product){

      if(attrubteArray){
          return(
          <>
          {attrubteArray.map((m)=>{
              if(m.type === 'swatch'){
                  return(
                  <div className="attrContainer__render__swatch" key={m.name} >
                  <div className="attrContainer__render__swatch__firstChild">
                  {m.name}
                  </div>
                  {m.items.map((e)=>(
                      <div onClick={()=>{this.props.selectAttributes(e.value,id,m.name)}} className={`miniCheckoutCnt__item_attr_color ${this.checkAttr(id,m.name,e.value)}`} key={e.value} style={{backgroundColor:`${e.value}`}}></div>))}
                  </div>
                  )
                  
              }
              else{
                  return(
                  <div className="attrContainer__render__text" key={m.name}>
                      <div className="attrContainer__render__text__firstChild">
                      {m.name}
                      </div>
                      {m.items.map((e)=>(
                      <div className={`miniCheckoutCnt__item_attr_text ${this.checkAttr(id,m.name,e.value)}`} key={e.value} onClick={()=>{this.props.selectAttributes(e.value,id,m.name)}}>{e.value}</div>))}
                  </div>
                  )
              }
          })}
          <div className="miniBuyBtn" onClick={()=>{
            this.validateAttr(product)
            }}>Add</div>
            <div className="pdp__errorCnt">{this.state.option ? '' : <div className="pdp__errorCnt__msg">Select all options</div>}</div>
          </>
          )
      }
      else{
          return ''
      }
  }

    render(){
        return(
          <>
            {this.props.productsList.map((m,index)=>{
              
                return(
                  <div className="productATag" key={m.id}>
                  <Link to={`/pdp/${m.id}`} className="productATag"  >
                  <div className={`product ${m.inStock === false ? 'not' : ''}`}>
                    <div className="product__imgCnt">
                      {m.inStock === false ? <div className="out">OUT OF STOCK</div> : ''}
                      <img className="product__img" src={m.gallery[0]} alt="Product Img" />
                      <div className="product__purchase" onClick={(e)=>{
                        e.preventDefault()

                        if(m.attributes.length > 0){
                          this.setState({modal:!this.state.modal})
                          // this.popUp(m.attributes,m.id)
                          
                          this.setState({currentId:m.id})
                        }
                        else{
                          this.props.selectProduct(m)
                        }


                      }}>
                        <div className="product__purchase_img"></div>
                      </div>
                    </div>
                    <div className="product__name">{m.name}</div>
                    <div className="product__price">{this.productPrice(m.prices)}</div>
      
                  </div>
                  </Link>
                  <div className={`modal ${this.state.modal && this.state.currentId === m.id ? 'active' : ''}`} onClick={(e)=>{if(e.target.className === 'modalChild'){this.setState({modal:false})}}}><div className="modalChild"></div>{this.state.modal && this.state.currentId === m.id && m.attributes.length > 0 ? 
                  <div>
                    <div className="attrContainer">
                      {this.renderAttrubtes(m.attributes,m.id,m)}
                    </div>
                  </div>
                    : ''}</div>
                  </div>
                )
              })}
          </>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
      selectedProducts: state.selectedProducts,
      attrReducer: state.attrReducer,
      currentCurrency: state.selectedCurrency,
      productsList: state.productsList
    }
}

export default connect(mapStateToProps,{selectProduct,selectAttributes,fetchProducts})(ProductList);