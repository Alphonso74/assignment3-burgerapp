import React from "react";
import Aux from '../../../HOC/Aux'
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return (
        <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
        </li> );
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><stong>Total Price: {props.price.toFixed(2)}</stong></p>
            <p>Continue to Checkout?</p>

            <Button btnType="Danger" clicked={props.purchasedCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>

        </Aux>

    );


};


export default orderSummary;
