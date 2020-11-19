import React, {Component} from "react";
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from "./ContactData/ContactData";
import {connect} from 'react-redux';


class Checkout extends Component {

    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for(let param of query.entries()){
    //         if(param[0] === 'price' ){
    //
    //             price = param[1];
    //
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }

    checkoutSuccess = () => {
        this.props.history.replace('/checkout/contact-data')

    }

    checkoutCancelled = () => {
        this.props.history.goBack();

    }

    render() {

        let summary = <Redirect to="/"/>

        if(this.props.ings){
            summary = (

                <div>
            <CheckoutSummary
                checkoutCancelled={this.checkoutCancelled}
                checkoutSuccess={this.checkoutSuccess}
                ingredients={this.props.ings}/>

                <Route path={this.props.match.path + '/contact-data'}
                    component={ContactData}/>

                 </div>

                )
        }
        return (

            <div>
                {summary}
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,

    }
};

export default connect(mapStateToProps)(Checkout);
