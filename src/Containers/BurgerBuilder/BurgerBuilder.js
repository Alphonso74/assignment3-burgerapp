import React, {Component} from "react";
import Aux from '../../HOC/Aux/Aux';
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {

    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component{

    state = {
      ingredients: {
          salad: 0,
          bacon: 0,
          cheese: 0,
          meat: 0
      },
        totalPrice: 4,
        purchasable: false,
        purchasing:false,
        loading: false


    };


    udpatePurchaseState (ingredients) {


        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce( (sum, el) => {
            return sum + el;
        }, 0 );

        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];



        const updateCount = oldCount + 1;
        const updateIngredients = {

            ...this.state.ingredients
        };

        updateIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updateIngredients})

        this.udpatePurchaseState(updateIngredients);
    };

    removeIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0){
            return;
        }
        const updateCount = oldCount - 1;
        const updateIngredients = {

            ...this.state.ingredients
        };

        updateIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updateIngredients})
        this.udpatePurchaseState(updateIngredients);

    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {

        this.setState({purchasing:false})
    };

    purchaseContinueHandler = () => {

        // alert('You Continue!');

        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Alphonso Mckenzie',
                address: {
                    street: 'MY STREET',
                    zipCode: '12354',
                    country: 'US'
                },
                email: 'Alphonso6809@gmail.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => this.setState({loading:false , purchasing: false}));



    };

    render() {

        const disabledInfo = {

            ...this.state.ingredients
        };

        for( let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0

        }

        //{salad: true, meat: false.....}

        let orderSummary = <OrderSummary
            price={this.state.totalPrice}
            purchasedCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            ingredients={this.state.ingredients}/>;

        if(this.state.loading){

            orderSummary = <Spinner/>

        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls ingredintRemoved={this.removeIngredientHandler}
                                   ingredientAdded={this.addIngredientHandler}
                                   disabled={disabledInfo}
                                   purchasable={this.state.purchasable}
                                   ordered={this.purchaseHandler}
                                    price={this.state.totalPrice}
                    />
            </Aux>
        );
    }

}

export default BurgerBuilder;
