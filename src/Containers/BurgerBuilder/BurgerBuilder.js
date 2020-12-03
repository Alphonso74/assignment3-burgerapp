import React, {Component} from "react";
import Aux from '../../HOC/Aux/Aux';
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component{

    state = {
        purchasing:false,
    };

     componentDidMount() {
         this.props.onInitIngredients()
     }


    updatePurchaseState (ingredients) {


        const sum = Object.keys(ingredients)
            .map(igKey => {
             return ingredients[igKey];
        })
            .reduce( (sum, el) => {
                return sum + el;
        }, 0 );

        return sum > 0;
    }



    purchaseHandler = () => {

         if(this.props.isAuthenticated){
             this.setState({purchasing: true});

         }
         else {
             this.props.onSetAuthRedirectPath('/checkout')
             this.props.history.push('/auth')
         }

    };

    purchaseCancelHandler = () => {

        this.setState({purchasing:false})
    };

    purchaseContinueHandler = () => {

        this.props.onInitPurchased();
        this.props.history.push('/checkout');

    };

    render() {

        const disabledInfo = {

            ...this.props.ings
        };

        for( let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0

        }


        let orderSummary= null;



        let burger = this.props.error ? <p>Ingredients cant be loaded...</p> : <Spinner/>;

        if(this.props.ings){

             burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings}/>
                    <BuildControls ingredintRemoved={this.props.onIngredientRemoved}
                                   ingredientAdded={this.props.onIngredientAdded}
                                   disabled={disabledInfo}
                                   purchasable={this.updatePurchaseState(this.props.ings)}
                                   ordered={this.purchaseHandler}
                                   price={this.props.price}
                                   isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary
                price={this.props.price}
                purchasedCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ings}/>;

        }


        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                {burger}

            </Aux>
        );
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients:  () => dispatch(actions.initIngredients()),
        onInitPurchased: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
