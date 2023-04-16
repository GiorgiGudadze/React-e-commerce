import React from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import { selectProduct, selectAttributes } from "../actions";
class ProductsBag extends React.Component{

    constructor(props){
        super(props)
        this.state={myProductsArray:[]}

    }

    renderAttrubtes(attrubteArray,id){

        if(attrubteArray){
            return attrubteArray.map((m)=>{
                if(m.type === 'swatch'){
                    return(
                    <div key={m.name} className="miniCheckoutCnt__item_flex1__render__swatch">
                    {m.items.map((e)=>(
                        <div onClick={()=>{this.props.selectAttributes(e.value,id,m.name)}} className={`miniCheckoutCnt__item_attr_color ${this.checkAttr(id,m.name,e.value)}`} key={e.value} style={{backgroundColor:`${e.value}`}}></div>))}
                    </div>
                    )
                    
                }
                else{
                    return(
                    <div className="miniCheckoutCnt__item_flex1__render__text" key={m.name}>
                        {m.items.map((e)=>(
                        <div className={`miniCheckoutCnt__item_attr_text ${this.checkAttr(id,m.name,e.value)}`} key={e.value} onClick={()=>{this.props.selectAttributes(e.value,id,m.name)}}>{e.value}</div>))}
                    </div>
                    )
                }
            })
        }
        else{
            return ''
        }
    }

    checkAttr=(id,label,val)=>{
        
        for(let list of this.props.attrReducer){
            if(list.id === id && list.attrLabel === label && list.attrVal === val){
                return 'active'
            }
        }
        
    }

    productPrice(priceArray,mult){
        return priceArray.map(m=>{
          if(m.currency.label === this.props.currentCurrency){
            return(
                <div key={m.currency.label} className="miniCheckoutCnt__item_price">{m.currency.symbol}{(Math.round((m.amount * mult) * 100) / 100).toFixed(2)}</div>
            )
          }
        })
      }

      currencySymbol = () => {
        return this.props.currencyArray.map(m=>(
            this.props.currentCurrency === m.label ? <span key={m.symbol}>{m.symbol}</span> : ''
        ))

    }
    displayMiniCart(){
        
        let uniqueArray = new Set(this.props.selectedProducts)
        let myProductsArray = Array.from(uniqueArray)
        const uniqueIds = [];

    myProductsArray = myProductsArray.filter(element => {
  const isDuplicate = uniqueIds.includes(element.id);

  if (!isDuplicate) {
    uniqueIds.push(element.id);

    return true;
  }
});

        return(
            <div>
            {myProductsArray.map((m)=>{
                return(
                <div key={m.id}>
                    <div className="miniCheckoutCnt__item">

                        <div className="miniCheckoutCnt__item_flex1">
                            <div className="miniCheckoutCnt__item_name">{m.name}</div>
                            <div className="miniCheckoutCnt__item_price">{this.productPrice(m.prices,m.coun)}</div>
                            <div className="miniCheckoutCnt__item_attr">{this.renderAttrubtes(m.attributes,m.id)}</div>
                        </div>
                        <div className="miniCheckoutCnt__item_quantityCnt">
                            <div onClick={()=>{this.props.selectProduct((m))}}><img className="miniCheckoutCnt__item_quantityCnt__img" src="/plus.png" alt="plus" /></div>
                            <div className="miniCheckoutCnt__item_quantityCnt_count">{m.coun}</div>
                            <div onClick={()=>{this.props.onSubstruct(m)}}><img className="miniCheckoutCnt__item_quantityCnt__img" src="/minus.png" alt="minus" /></div>
                        </div>

                        <div className="miniCheckoutCnt__item_gallery">
                            <div style={{backgroundImage: `url(${m.gallery[0]})`}}></div>
                        </div>
                    
                    </div>

                </div>
                )
            })}
            <div className="total__flex">
                <div>Total:</div>
                <div>{this.currencySymbol()}{this.props.total}</div>
            </div>
            
            <div className="productBagFlex">
                <Link className="productBagFlex__a" to="/plp"><div className="miniBuyBtn2">VIEW BAG</div></Link>
                <div className="miniBuyBtn">CHECK OUT</div>
            </div>

            </div>
        )
    }
    


    render(){
        let uniqueArray = new Set(this.props.selectedProducts)
        let myProductsArray = Array.from(uniqueArray)
        return(
            <div className="miniCheckoutCnt">
            <div className="miniCheckoutCnt__firstChild"><span className="miniCheckoutCnt__span">My Bag, </span>{myProductsArray.length} items</div>
                {this.displayMiniCart()}
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

export default connect(mapStateToProps,{selectProduct,selectAttributes})(ProductsBag)