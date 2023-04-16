import React from "react";
import { connect } from "react-redux";
import { selectProduct, selectAttributes } from "../actions";

class Plp extends React.Component{
    constructor(props){
        super(props)
        this.state = {currentIndx:0}
    }
    productPrice(priceArray,mult){
        return priceArray.map(m=>{
          if(m.currency.label === this.props.currentCurrency){
            return(
                <div key={m.currency.symbol}>
                {m.currency.symbol}
                {(Math.round((m.amount * mult) * 100) / 100).toFixed(2)}
                </div>
            )
          }
        })
      }

    onLeftArrowClick=(galleryArray,element,indx)=>{

        if(galleryArray.length > 1){
            
            let div = element.target.nextElementSibling 
            let getImg = window.getComputedStyle(div, false)  
            let bi = getImg.backgroundImage.slice(4, -1).replace(/"/g, "");  
            
            if(bi === galleryArray[0]){
                let indx = galleryArray.length - 1;
                element.target.nextElementSibling.style=`background-image:url(${galleryArray[indx]})`
            }
            else{
                let indx = galleryArray.indexOf(bi)
                element.target.nextElementSibling.style=`background-image:url(${galleryArray[indx -1]})`
            }
        }
        
    }
    
    onRightArrowClick = (galleryArray,element) =>{

        if(galleryArray.length > 1){
            let div = element.target.previousElementSibling 
            let getImg = window.getComputedStyle(div, false)  
            let bi = getImg.backgroundImage.slice(4, -1).replace(/"/g, "");  
            

            if(bi === galleryArray[galleryArray.length - 1]){
                element.target.previousElementSibling.style=`background-image:url(${galleryArray[0]})`
            }
            else{
                let indx = galleryArray.indexOf(bi)
                element.target.previousElementSibling.style=`background-image:url(${galleryArray[indx + 1]})`

            }
        }


    }

      checkAttr = (id,label,val) => {
        for(let list of this.props.attrReducer){
            if(list.id === id && list.attrLabel === label && list.attrVal === val){
                return 'active'
            }
        }
      }

      renderAttrubtes(attrubteArray,id){

        if(attrubteArray){
            
            return attrubteArray.map((m)=>{
                if(m.type === 'swatch'){
                    return(
                    <div className="plp__cnt__flex__swatch" key={m.name}>
                    {m.items.map((e)=>(
                        <div onClick={()=>{this.props.selectAttributes(e.value,id,m.name)}} className={`miniCheckoutCnt__item_attr_color ${this.checkAttr(id,m.name,e.value)}`} key={e.value} style={{backgroundColor:`${e.value}`}}></div>))}
                    </div>
                    )
                    
                }
                else{
                    return(
                    <div className="plp__cnt__flex__text" key={m.name} >
                        {m.items.map((e)=>(
                        <div onClick={()=>{this.props.selectAttributes(e.value,id,m.name)}} className={`pdp__details__attr__text ${this.checkAttr(id,m.name,e.value)}`} key={e.value}>{e.value}</div>))}
                    </div>
                    )
                }
            })
        }
        else{
            return ''
        }
    }

    render(){
        let uniqueArray = new Set(this.props.selectedProducts)
        let myProductsArray = Array.from(uniqueArray)
        return(
            <div className="plp">
                <div className="plp__header">Cart</div>
                {myProductsArray.map(m=>{
                return(
                <div className="plp__cnt" key={m.id}>

                    <div className="plp__cnt__flex">
                        <div className="plp__name">{m.name}</div>
                        <div className="plp__ctg">{m.category}</div>
                        <div className="plp__price">{this.productPrice(m.prices,m.coun)}</div>
                        <div className="plp__attr">{this.renderAttrubtes(m.attributes,m.id)}</div>
                    </div>
                    <div className="plp__quantityCnt">
                        <div onClick={()=>{this.props.selectProduct(m)}}><img className="plp__quantityCnt__img" src="/big-plus.png" alt="plus" /></div>
                        <div className="plp__count">{m.coun}</div>
                        <div onClick={()=>{this.props.onSubstruct(m)}}><img className="plp__quantityCnt__img" src="/big-minus.png" alt="minus" /></div>
                    </div>

                    <div className="plp__cnt__gallery">
                        {m.gallery.length > 1 ? <img onClick={(e)=>{this.onLeftArrowClick(m.gallery,e)}} className="leftArrow" src="/arrow-left.png" alt="left" /> : ''}
                        <div className="plp__cnt__gallery__img" style={{backgroundImage: `url(${m.gallery[0]})`}}></div>
                        {m.gallery.length > 1 ? <img onClick={(e)=>{this.onRightArrowClick(m.gallery,e)}} className="rightArrow" src="/arrow-right.png" alt="right" /> : ''}
                    </div>

                </div>
                )})}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        selectedProducts: state.selectedProducts,
        attrReducer: state.attrReducer,
        currentCurrency: state.selectedCurrency
    }
}

export default connect(mapStateToProps,{selectProduct,selectAttributes})(Plp)