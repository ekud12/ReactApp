import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, View ,Button, Alert,Vibration,TextInput,FlatList,ListItem, Keyboard} from 'react-native';
import { TextInputWoW } from './TextInputWOW';
import SocketIOClient from 'socket.io-client';
export default class lotsOfTexts extends Component{
  constructor(props){
    super(props);
    this.state = { lastMessage: '', 
                   listOfMessage: ['']};
    this.socket = SocketIOClient('http://yay-server.herokuapp.com');
    this.listOfMessage = this.listOfMessage.bind(this);
    this.listOfMessage();
  }

  listOfMessage = () => {
    this.socket.on('chat message', function(msg){
      this.state.listOfMessage.push(msg);
      Alert.alert(msg);
    });  
  }

  sendMessage = (newMsg) => {
  
      this.socket.emit('chat message', newMsg);
      this.state.listOfMessage.push(this.state.lastMessage);
      this.setState({ listOfMessage : this.state.listOfMessage });
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
               {/* <View style={{flex:1}}>
                  <Text>{this.state.newMessage}</Text>
               </View>  */}
            <FlatList
                data={this.state.listOfMessage}
                renderItem={({item}) => <Text>{item}</Text>}
                keyExtractor={(item, index) => index}
                extraData={this.state}
               // style ={{flex:5}}
          />
            </View>
      </View>
    );
  }
}

// class TextInANest extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       titleText: "Welcome",
//       bodyText: 'Best App Ever.',
//       onPressTitle: 'OMG',
//       isFirstColor: true,
//     };

//     setInterval(() => {
//       this.setState(previousState => {
//         return { isFirstColor: !previousState.isFirstColor };
//       });
//     }, 1000);
    
//     const DURATION = 1000
//     const PATTERN = [1000, 2000, 3000]
//     //Vibration.vibrate(DURATION)
//   }

//   changeTextOnTap = (txt)=> this.setState({titleText: txt});
  
//   render() {
//     return (  
//       <Text style={headerTextStyles.baseText}>
//         <Text 
//             style={this.state.isFirstColor ? headerTextStyles.titleTextRed : headerTextStyles.titleText} 
//             onPress={(event)=>this.changeTextOnTap("L")}> {this.state.titleText}
//         </Text>
//         {'\n'}
//         <Text>
//           {this.state.bodyText}
//         </Text>
//       </Text>
//     );
//   }
// }

// const headerTextStyles = StyleSheet.create({
//   baseText: {
//     fontFamily: 'Cochin',
//     textAlign: 'center',
//   },
//   titleText: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: 'blue',
//     textAlign: 'center',
//   },
//   titleTextRed: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: 'red',
//     textAlign: 'center',
//   },
// });

// skip this line if using Create React Native App
AppRegistry.registerComponent('TextInANest', () => lotsOfTexts);
