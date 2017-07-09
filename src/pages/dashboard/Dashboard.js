import Profile from './Profile'
import React, { Component } from 'react';
import {
  Image, Alert, Text, TextInput, View, Button,
  TouchableHighlight, ActivityIndicator, StyleSheet
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import api from './../../utils/api'
import { _navigateTo } from './../../utils/common'


var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.navigation.state.params.userInfo
    }
  }

  makeBackground(btn) {
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }
    if (btn === 0) {
      obj.backgroundColor = '#48BBEC';
    } else if (btn === 1) {
      obj.backgroundColor = '#E77AAE';
    } else {
      obj.backgroundColor = '#758BF4';
    }
    return obj;
  }

  goToProfile() {
    _navigateTo(this, 'Profile', { userInfo: this.state.userInfo })
  }

  goToRepos() {
    api.getRepos(this.state.userInfo.login)
      .then((jsonRes) => {
        _navigateTo(this, 'Repository', {
          repos: jsonRes,
          userInfo: this.state.userInfo
        })
      }).catch(function (err) {
        console.log(err);
      })
  }

  back() {
    _navigateTo(this, 'Login')
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: this.state.userInfo.avatar_url }} style={styles.image} />
        <Button
          onPress={() => this.back('Login')}
          title="Go Back To Main Page"
        />
        <TouchableHighlight
          style={this.makeBackground(0)}
          onPress={this.goToProfile.bind(this)}
          underlayColor="#88D4F5">
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={this.makeBackground(1)}
          onPress={this.goToRepos.bind(this)}
          underlayColor="#E39EBF">
          <Text style={styles.buttonText}>View Repositories</Text>
        </TouchableHighlight>
      </View>
    )
  }
};

