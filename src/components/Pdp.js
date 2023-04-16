import React from "react";
import productById from '../Api/productById.json'
import { connect } from "react-redux";
import { selectProduct, selectAttributes } from "../actions";
class Pdp extends React.Component{

    constructor(props){
        super(props)
        this.myRef = React.createRef();
        this.state = {currentPicIndex:0,option:true,description:'',pdpData:{}}
        this.parser = new DOMParser();
    }

    onPictureChange(indx){
        this.setState({currentPicIndex:indx})
    }

    checkAttr=(id,label,val)=>{
        
        for(let list of this.props.attrReducer){
            if(list.id === id && list.attrLabel === label && list.attrVal === val){
                return 'active'
            }
        }
        
    }

    validate = ()=>{
        let current = this.props.attrReducer.filter(f=>f.id===this.state.pdpData.id)
        if(this.state.pdpData.inStock === true && current.length === this.state.pdpData.attributes.length){
            this.props.selectProduct(this.state.pdpData) 
            this.setState({option:true})
        }
        else{
            this.setState({option:false})
        }
    }

    errorChecker = () =>{

        if(this.state.option && this.state.pdpData.inStock === true){
            return ''
        }
        else if(this.state.pdpData.inStock === false){
            return (<div className="pdp__details__error">Out of stock</div>)
        }
        else{
            return (<div className="pdp__details__error">Select all options</div>)
        }

    }

    htmlParser = (element) => {
        return element;
    }

    fetchData = async () =>{

        let res = await productById.data[this.props.data]
        this.setState({pdpData:res})
    }

    componentDidMount(){
        this.fetchData()
    }

    componentDidUpdate(){
        if(Object.keys(this.state.pdpData).length > 0){
            if(this.myRef.current.innerHTML === ""){
                this.myRef.current.append(this.parser.parseFromString(this.state.pdpData.description,"text/html").body)
            }
        }
    }

    render(){

        if(Object.keys(this.state.pdpData).length > 0 ){
            return(
                <div className="pdp">
                    <div className="pdp__side">
                        {this.state.pdpData.gallery.map((m,index)=>(<img onClick={()=>{this.onPictureChange(index)}} key={m} src={m} alt="side img" />))}
                    </div>
    
                    <div className="pdp__main">
                        <img src={this.state.pdpData.gallery[this.state.currentPicIndex]} alt="main img" />
                    </div>
    
                    <div className="pdp__details">
    
                        <div className="pdp__details__title">{this.state.pdpData.name}</div>
                        <div className="pdp__details__ctg">{this.state.pdpData.category}</div>
    
                        <div className="pdp__details__attr">
    
                            {this.state.pdpData.attributes.map((m,index)=>{
                                
                                if(m.type === 'text'){
                                    return(
                                        <div className="pdp__details__attr__cnt" key={m.name}>
                                        <p className="pdp__details__attr__cnt__p">{m.name}</p>
                                            {m.items.map((e,index)=>(
                                            <div key={e.displayValue} onClick={()=>{this.props.selectAttributes(e.value,this.state.pdpData.id,m.name)}} className={`pdp__details__attr__text ${this.checkAttr(this.state.pdpData.id,m.name,e.value)}`}>{e.value}</div>
                                            ))}
                                        </div>
                                    )
                                    
                                }
                                else{
                                    return(
                                        <div className="pdp__details__attr__swatch" key={m.name}>
                                        <p className="pdp__details__attr__swatch__p">{m.name}</p>
                                            {m.items.map((e,index)=>(
                                            <div onClick={()=>{this.props.selectAttributes(e.value,this.state.pdpData.id,m.name)}} className={`miniCheckoutCnt__item_attr_color ${this.checkAttr(this.state.pdpData.id,m.name,e.value)} swatchPdp`} key={e.displayValue} style={{backgroundColor:`${e.value}`}}></div>
                                            ))}
                                        </div>
                                )}
                            })}
                        </div>
                        
                        <div className="pdp__details__priceCnt">
                            <div className="pdp__details__priceCnt__firstChild">PRICE:</div>
                            {this.state.pdpData.prices.map(m=>{
                            if(m.currency.label === this.props.currentCurrency){
                                return(
                                    <div key={m.currency.symbol} className="pdp__details__price">{m.currency.symbol}{m.amount}</div>
                                )
                              }
    
                            })}
    
    
                        </div>
    
                        <div className={`pdp__details__purchase ${this.state.pdpData.inStock === false ? 'not' : '' }`} onClick={()=>{
                            this.validate()
                            }}>ADD TO CART</div>
                        <div>{this.errorChecker()}</div>
                        <div className="pdp__details__desc" ref={this.myRef}></div>
    
                    </div>
                </div>
     
            )
        }
        else{
            return <div>Loading</div>
        }

    }
}

const mapStateToProps = (state) =>{
    return{
        selectedProducts: state.selectedProducts,
        attrReducer: state.attrReducer,
        currentCurrency: state.selectedCurrency
    }
  }

export default connect(mapStateToProps,{selectProduct,selectAttributes})(Pdp);