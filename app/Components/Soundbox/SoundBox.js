import React, { Component } from 'react';
import { Text, 
         View,
         TextInput,
         Image,
         Button,
         Alert,
         TouchableOpacity} from 'react-native';
import Sound from 'react-native-sound';
import { styles } from './styles';


class SoundBox extends Component{
    constructor(props){
        super(props);

        this.state = {
            sound: undefined,
            name: props.name,
            fileName: props.fileName,
            title: props.title,
            volume: 1,
            imageOpacity: 0.4,
            volumeControlEnabled: true,
            fileNameImage: props.fileNameImage
        }
        Sound.setCategory('Playback', true);
    }

    render() {
        return (
          <View style={styles.container}>
          <Text>{this.props.titler}</Text>
            <TouchableOpacity activeOpacity={0.1} onPress={this.playButtonTapped}>
                <Image
                    style={{    
                        flex: 1,
                        
                    }}
                    resizeMode= 'contain'
                    opacity= {this.state.imageOpacity}
                    source={this.getImageFilePath()}
                />
            </TouchableOpacity>
          </View>
        );
    }

    getImageFilePath() {
        const _picName = this.state.fileNameImage;
        return require('../../Assets/Images/Rain.jpg'); 
        // if(this.state.fileNameImage == "Rain.jpg")
        //      return require('../Assets/Images/'+rain); 
        // if(this.state.fileNameImage == "Thunder.jpg")
        //      return require('../Assets/Images/Thunder.jpg'); 
  
    }

    getFilePath() {
          return this.state.fileName;
      }

    highlightBox() {
        this.setState({
          imageOpacity: 0.9
        });
    }

    unHighlightBox() {
        this.setState({
          imageOpacity: 0.2
        });
    }

    playButtonTapped = async () => {
        if (!this.isPlaying) {
          this.highlightBox();
          this.playSound();
        }
        else {
          this.stopSound()
          this.isPlaying = false
          this.unHighlightBox()
        }
    }

    playSound() {
       
        this.isPlaying = true;
    
        const callback = (error, sound) => {
          if (error) {
            Alert.alert('error', error.message);
            return;
          }
    
          sound.setNumberOfLoops(-1);
    
          // Run optional pre-play callback
          onPrepared: (sound) => {
            //Not getting called
          }
          sound.play(() => {
            // Release when it's done so we're not using up resources
            sound.release();
          });
        };
    
        this.setState({
          sound: new Sound(this.getFilePath(),Sound.MAIN_BUNDLE, error => callback(error, this.state.sound))
        });      
    }

    stopSound() {
        this.state.sound.stop()
    }
}
export default SoundBox;
