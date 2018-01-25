import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, View ,Button, Alert,Vibration,TextInput,FlatList,ListItem, Keyboard} from 'react-native';
import { TextInputWoW } from './TextInputWOW';
import SocketIOClient from 'socket.io-client';
export default class lotsOfTexts extends Component{
  constructor(props){
    super(props);
    this.state = { lastMessage: '', 
                   listOfMessage: [''],
                   firstRun: 'true'};
    this.socket = SocketIOClient('http://yay-server.herokuapp.com');

    this.socket.on('chat message', (msg) => {
      this.state.lastMessage = msg;
      var oldMsg = this.state.listOfMessage.concat(msg);
      this.setState({ listOfMessage: oldMsg, lastMessage: this.lastMessage})
    })
}

  sendMessage = (newMsg) => { 
      this.socket.emit('chat message', newMsg);
  }


  render(){
    return(
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <View style={{
            backgroundColor:'white',
            flex:1,        
            justifyContent: 'center', 
            alignItems: 'center'
          }}>
          <TextInput style={{width:150}} onChangeText={(newTxt) => this.setState({ lastMessage : newTxt}) }>
            </TextInput>
          <Button
              onPress={() => {this.sendMessage(this.state.lastMessage)}}
              title="Send Message!"
            />
            </View>
            <View style={{flex:1,backgroundColor:'yellow'}}>
            <FlatList
                data={this.state.listOfMessage}
                renderItem={({item}) => <Text>{item}</Text>}
                keyExtractor={(item, index) => index}
                extraData={this.state}
          />
            </View>
      </View>
    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('TextInANest', () => lotsOfTexts);
