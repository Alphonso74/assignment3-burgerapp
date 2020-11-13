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
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component{

    state = {
        purchasing:false,
        loading: false,
        error: false


    };

     componentDidMount() {
         // axios.get('https://burger-app-1173d.firebaseio.com/ingredients%20.json')
         //     .then(response => {
         //
         //         this.setState({ingredients: response.data})
         //     })
         //     .catch(error => {
         //         this.setState({error: true})
         //     })
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
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {

        this.setState({purchasing:false})
    };

    purchaseContinueHandler = () => {

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



        let burger = this.state.error ? <p>Ingredients cant be loaded...</p> : <Spinner/>;

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
                    />
                </Aux>
            );

            orderSummary = <OrderSummary
                price={this.props.price}
                purchasedCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ings}/>;

        }

        if(this.state.loading){

            orderSummary = <Spinner/>

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
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName }),

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
