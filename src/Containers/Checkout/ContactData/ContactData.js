import React, {Component} from "react";
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },

        loading: false
    }


    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                this.setState({loading: false});
                this.props.history.push('/')
            })
            .catch(error => this.setState({loading:false}));



    }

    render() {
        let form = (
            <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>

            <Button clicked={this.orderHandler} btnType="Success">Order</Button>
            </form>
            );

        if(this.state.loading){
            form = <Spinner/>
        }

        return (

            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>

                {form}
            </div>
        )
    }


}

export default ContactData;
