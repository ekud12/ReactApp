import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, View ,Button, Alert,Vibration,TextInput,FlatList,ListItem, Keyboard} from 'react-native';
import { TextInputWoW } from './Components/TextInputWOW';
import SocketIOClient from 'socket.io-client';
import SoundBox from './Components/Soundbox/index';
import { connect } from 'react-redux';
import { getAllImages,incrementOne } from '../app/actions';
 class lotsOfTexts extends Component{
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
    this.updateAllpics();
}

  sendMessage = (newMsg) => { 
      this.socket.emit('chat message', newMsg);
  }

  updateAllpics = () => {
    this.props.getAllImages();
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
            <View style={{flex:1,justifyContent: 'center', alignItems:'center',flexDirection:'row'}}>
              <SoundBox fileName="rain.mp3" fileNameImage="Rain.jpg" />
              <SoundBox fileName="thunder.mp3" fileNameImage="Thunder.jpg"/>
            </View>
            <Button onPress={this.props.incrementOne} title="AddOne"></Button>
            <Text>{this.props.counter},{this.props._images}</Text>
      </View>
    );
  }
}


mapStateToProps = (state) => {
  return {
      _images : state.files,
      counter: state.count
  }
}
export default connect(mapStateToProps, { getAllImages,incrementOne })(lotsOfTexts);

// skip this line if using Create React Native App
AppRegistry.registerComponent('TextInANest', () => lotsOfTexts);
