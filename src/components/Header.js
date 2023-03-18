import React from "react";
import ProductsBag from "./ProductsBag";
import currencyJson from "../Api/currency.json";
import {NavLink} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {showBag:false,showCurrency:false,currencyArray:[],selectedAttr:[],totalPrice:0}
        this.checkAttribute = ''
        this.myRef = React.createRef();
    }

    UNSAFE_componentWillUpdate(){

        let onOutsideCurrenyClick=(e)=>{
            
            if (this.myRef.current && !this.myRef.current.contains(e.target) && !e.target.closest('.checkoutNav__currencyCnt')) {
                this.setState({showCurrency:false})
              }

        }

        document.addEventListener('click', onOutsideCurrenyClick, true);
        return () => {
          document.removeEventListener('click', onOutsideCurrenyClick, true);
        };
        
    }

    equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    componentDidMount(){
      let getCurrency = async ()=>{

      let currencyData = await currencyJson
      let currencyArray = currencyData.data.currencies
    
      this.setState({currencyArray})
      
    }
    getCurrency()


    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
          this.setState({ showBag: false })
        }
    }

    countTotal=()=>{
        let total = 0
        let uniqueArray = new Set(this.props.addedProductsArray)
        let myProductsArray = Array.from(uniqueArray)

        myProductsArray.map(m=>{
            m.prices.map(e=>{

            if(e.currency.label === this.props.currentCurrency){
                total+=e.amount * m.coun

            }

            })

        })
        
        return (Math.round(total * 100) / 100).toFixed(2)
        
    }

    componentDidUpdate(nextProps) {
        if (nextProps.currentCurrency !== this.props.currentCurrency) {
          this.countTotal()
        }

        if(this.state.showBag === true){
            if(this.props.addedProductsArray.length === 0){
                this.setState({showBag:false})
            }
        }


      }

    miniCheckout(){
        return(
            <ProductsBag currencyArray={this.state.currencyArray} total={this.countTotal()} attrList={this.props.attrList} selectAttr={this.props.selectAttr} currentCurrency={this.props.currentCurrency} onSubstruct={this.props.onSubstruct} sumUp={this.props.sumUp} selectedProducts={this.props.addedProductsArray} />
        )
    }

    handleBackground(e){
        if(e.target.className.includes('backgroundCover')){
            this.setState({showBag:false})
        }
    }

    displayCurrency(m){
        return(
            <div ref={this.myRef} className="currencyCnt">
                <ul className="currencyCnt__ul">
                    {this.state.currencyArray.map(m=>(
                        
                    <li key={m.label} onClick={()=>{
                        this.props.selectedCurrency(m.label)
                        this.setState({showCurrency:false})
                    }} className={`currencyCnt__ul__li ${this.props.currentCurrency === m.label ? 'active' :''}`}>{m.label} {m.symbol}</li>
                    ))}

                </ul>
            </div>
        ) 
    }

    currencySymbol(){
        return this.state.currencyArray.map(m=>(
            this.props.currentCurrency === m.label ? <div key={m.symbol} className="currencySymbol">{m.symbol}</div> : ''
        ))

    }



    
    render(){
        let uniqueArray = new Set(this.props.addedProductsArray)
         
        return(
            <>
            <div className="headerCnt">
            <header>
                <div className="category">
                    <ul className="category__ul">
                        {this.props.ctgArray.map((m)=>{
                        return(
                            <li key={m.name}><NavLink exact activeClassName="active" to={m.name === 'all' ? '/' : `/${m.name}`}>{m.name}</NavLink><div className="category__line"></div></li>
                        )
                        })}

                    </ul>
                </div>
                <div className="pdpLogo">
                    <div className="divPdp"><div className="pdpLogo__img"></div></div>
                </div>
                <div className="checkoutNav">
                    <div className="checkoutNav__flex">
                        <div className="checkoutNav__currencyCnt" onClick={()=>{this.setState({showCurrency:!this.state.showCurrency})}}>

                            {this.currencySymbol()}
                            <img className={`${this.state.showCurrency ? 'turnArrow' : ''} `} src="/downArrow.png" alt="arrow" />
                        </div>
                        {this.state.showCurrency === true ? this.displayCurrency() : ''}
                        <div className="checkoutNav__flex_cartCnt">
                            {uniqueArray.size > 0 ? <div onClick={()=>{this.setState({showBag:!this.state.showBag}) }}>{uniqueArray.size}</div> : ''}
                            <img src="/cartIcon.png" className="checkoutNav__flex_cartCnt_img" alt="cart" onClick={()=>{this.setState({showBag:!this.state.showBag}) }} />
                        </div>
                    </div>

                    
                    {this.state.showBag === true && this.props.addedProductsArray.length > 0 ? this.miniCheckout() : ''}

                </div>
            </header>
            </div>
            {/* {this.state.showBag === true && this.props.addedProductsArray.length>0 ?  this.coverBackground(): ''} */}
            <div className={`backgroundCover ${this.state.showBag === true && this.props.addedProductsArray.length > 0 ? 'visible' : ''}`} onClick={(e)=>{this.handleBackground(e)}}></div>

            
            {/* {this.state.showBag === true && this.props.addedProductsArray.length>0 ?  this.coverBackground(): ''} */}
            </>
        )
    }
}

export default withRouter(Header);