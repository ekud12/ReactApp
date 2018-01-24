import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, View ,Button, Alert,Vibration,TextInput} from 'react-native';

export default class lotsOfTexts extends Component{
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
         <TextInANest/>
         </View>
         <View style={{
           backgroundColor:'black',
           flex:1,        
           justifyContent: 'center', 
           alignItems: 'center'
         }}>
         <TextInputWoW/>
          <Button
              onPress={() => {
                Alert.alert('You tapped the button!');
              }}
              title="Press Me"
            />
            </View>
      </View>
    );
  }
}

class TextInputWoW extends Component {
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

class TextInANest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "Welcome",
      bodyText: 'Best App Ever.',
      onPressTitle: 'OMG',
      isFirstColor: true,
    };

    setInterval(() => {
      this.setState(previousState => {
        return { isFirstColor: !previousState.isFirstColor };
      });
    }, 1000);
    
    const DURATION = 1000
    const PATTERN = [1000, 2000, 3000]
    //Vibration.vibrate(DURATION)
  }

  changeTextOnTap = (txt)=> this.setState({titleText: txt});
  
  render() {
    return (  
      <Text style={headerTextStyles.baseText}>
        <Text 
            style={this.state.isFirstColor ? headerTextStyles.titleTextRed : headerTextStyles.titleText} 
            onPress={(event)=>this.changeTextOnTap("L")}> {this.state.titleText}
        </Text>
        {'\n'}
        <Text>
          {this.state.bodyText}
        </Text>
      </Text>
    );
  }
}

const headerTextStyles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
    textAlign: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
  },
  titleTextRed: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('TextInANest', () => lotsOfTexts);
