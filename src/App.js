import React, {Component} from 'react';
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./Containers/Checkout/Checkout";
import {Route, Switch} from 'react-router-dom';
import Orders from "./Containers/Orders/Orders";
import Auth from "./Containers/Auth/Auth";
import Logout from "./Containers/Auth/Logout/Logout";
import {connect} from 'react-redux';
import * as action from './store/actions/index';

class App extends Component {


    componentDidMount() {
        this.props.onTryAutoSignIn();
    }

    render() {

    return (

    <div >
      <Layout>
          {/*{this.state.show ? <BurgerBuilder/> : null }*/}
          {/*<BurgerBuilder/>*/}
          {/*<Checkout/>*/}

          <Switch>

              <Route path="/checkout" component={Checkout}/>
              <Route path="/orders" component={Orders}/>
              <Route path="/auth"  component={Auth}/>
              <Route path="/logout"  component={Logout}/>
              <Route path="/" exact component={BurgerBuilder}/>

          </Switch>

      </Layout>
    </div>
  );
}

}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignIn: () => dispatch(action.authCheckState())
    }
}

export default connect(null,mapDispatchToProps)(App);
