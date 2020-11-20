import React, {Component} from "react";
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from "./ContactData/ContactData";
import {connect} from 'react-redux';
// import * as actions from '../../store/actions/index';


class Checkout extends Component {


    // componentWillMount() {
    //
    //     this.props.onInitPurchase();
    //
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
            console.log(this.props.purchased)
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null

            summary = (

                <div>
                    {purchasedRedirect}
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
        purchased: state.order.purchased

    }
};

// const mapDispatchToProps = dispatch => {
//     return {
//         onInitPurchase: () => dispatch(actions.purchaseInit())
//     }
// }

export default connect(mapStateToProps)(Checkout);
