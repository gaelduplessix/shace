import React from 'react';
import { Text, CameraRoll, SafeAreaView, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Shace',
  };

  startBackup = () => {
    // Backup latest photo :)
    CameraRoll.getPhotos({
      first: 1,
      assetType: 'Photos',
    })
      .then(r => {
        const lastPhoto = r.edges[0].node;
        this.setState({ img: lastPhoto.image });
        backupPhoto(lastPhoto);
      })
      .catch(err => {
        console.error('Error loading images!', err);
      });
  };

  componentDidMount = () => {
    this.startBackup();
  };

  state = {};

  render() {
    console.log('RENDER', this.state.img);
    return (
      <SafeAreaView>
        <Text>Hello world!</Text>
        {this.state.img && (
          <Image source={this.state.img} style={{ width: 100, height: 100 }} />
        )}
      </SafeAreaView>
    );
  }
}

export default createStackNavigator({
  Home: HomeScreen,
});

function backupPhoto(photo) {
  console.log(photo);
  // const body = new FormData();
  // body.append('photo', {
  //   uri: photo.image.uri,
  //   filename: photo.image.filename,
  //   type: 'image/jpeg',
  // });
  // body.append('Content-Type', 'image/jpeg');

  // fetch('http://localhost:4242', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //   },
  //   body,
  // })
  //   .then(res => {
  //     console.log('response', res);
  //   })
  //   .catch(e => console.error('Upload error!', e));
}
