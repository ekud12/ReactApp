import React, { Component } from 'react';
import { Text, View,TextInput} from 'react-native';

export class TextInputWoW extends Component {
    constructor(props){
      super(props);
      this.state = { text: ''};
    }
  
    render() {
      return (
        <View style={{padding: 10}}>
          <TextInput
            style={{height: 40,width:130, borderColor:'white', borderWidth:1}}
            placeholder="Type here to translate!"
            onChangeText={(text) => this.setState({text})}
          />
          <Text style={{padding: 10, fontSize: 42}}>
            {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
          </Text>
        </View>
      );
    }
  }