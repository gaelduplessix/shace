import React from 'react';
import { CameraRoll, SafeAreaView, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import logo from './logo.png';

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
    return (
      <SafeAreaView
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Image source={logo} style={{ width: '80%' }} resizeMode="contain" />
        {/* {this.state.img && (
          <Image source={this.state.img} style={{ width: 100, height: 100 }} />
        )} */}
      </SafeAreaView>
    );
  }
}

export default createStackNavigator({
  Home: HomeScreen,
});

async function backupPhoto(photo) {
  console.log(photo);
  const body = new FormData();
  body.append('upload', {
    uri: photo.image.uri,
    type: photo.type,
    name: photo.image.filename,
  });
  body.append('Content-Type', 'image/jpeg');

  const res = await fetch('http://localhost:8000/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body,
  });
  console.log('upload done!', res, await res.text());
}
