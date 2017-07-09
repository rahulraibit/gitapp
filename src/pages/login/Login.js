import React, { Component } from 'react';
import { Button, Alert, Text, TextInput, View, TouchableHighlight, ActivityIndicator } from 'react-native';
import styles from './LoginStyles';
import { NavigationActions } from 'react-navigation';
import api from './../../utils/api'
import DashBoard from './../dashboard/Dashboard';
import { _navigateTo } from './../../utils/common'

export default class Login extends Component {
  constructor(props) {
    super(props);
    const { navigate } = this.props.navigation;
    this.state = {
      username: '',
      isLoading: false,
      error: false
    }
  }


  handleChange(e) {
    this.setState({
      username: e.nativeEvent.text
    })
  }

  handleResponse(res) {
    if (res.message === 'Not Found') {
      this.setState({
        error: 'User not found',
        isLoading: false
      })
    } else {
      _navigateTo(this, 'DashBoard', { 'userInfo': res });
      this.setState({
        isLoading: false,
        error: false,
        username: ''
      });
    }
  }
  handleSubmit() {
    this.setState({
      isLoading: true,
    });
    api.getBio(this.state.username)
      .then((jsonRes) => this.handleResponse(jsonRes))
      .catch((err) => {
        this.setState({
          isLoading: false,
          error: `There was an error: ${err}`
        })
      })
  }
  render() {
    var showErr = (
      this.state.error ? <Text> {this.state.error} </Text> : <View></View>
    );
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>
          Search for a Github User
        </Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={this.handleChange.bind(this)} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white">
          <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableHighlight>
        <ActivityIndicator
          animating={this.state.isLoading}
          color="#111"
          size="large">
        </ActivityIndicator>
        {showErr}
      </View>
    );
  }
}
