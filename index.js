import { AppRegistry } from 'react-native';
import App from './app/App';
import React from 'react';
import {Provider} from 'react-redux';
import store from './app/config/store';

const AppContainer = () => 
    <Provider store={store}>
       <App/> 
    </Provider>;

AppRegistry.registerComponent('AwesomeProject', () => AppContainer);
