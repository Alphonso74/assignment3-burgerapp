import React, {Component} from "react";
import Aux from '../../HOC/Aux';
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component{

    state = {
      ingredients: {
          salad: 0,
          bacon: 0,
          cheese: 0,
          meat: 0
      }


    };

    render() {

        return(
            <Aux>
                <div>
                    <Burger ingredients = {this.state.ingredients}/>
                </div>
                <div>
                    Build Controls
                </div>

            </Aux>
        );
    }

}

export default BurgerBuilder;
