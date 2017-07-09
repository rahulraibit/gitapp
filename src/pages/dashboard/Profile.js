//var Separator = require('./Helpers/Separator');
import React, { Component } from 'react';
import {
    Image, Button, Text, TextInput, View, ScrollView, ActivityIndicator, StyleSheet
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import api from './../../utils/api'
import Separator from './../../components/helpers/Seprator'
import Badge from './../../components/helpers/Badge'
import { _navigateTo } from './../../utils/common'


var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    rowContainer: {
        padding: 10
    },
    rowTitle: {
        color: '#48BBEC',
        fontSize: 16
    },
    rowContent: {
        fontSize: 19
    }
});

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: this.props.navigation.state.params.userInfo
        }
    }
    getRowTitle(user, item) {
        item = (item === 'public_repos') ? item.replace('_', ' ') : item;
        return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
    }
    back() {
        _navigateTo(this, 'DashBoard', { 'userInfo': this.state.userInfo })
    }
    render() {
        var userInfo = this.state.userInfo;
        var topicArr = ['company', 'location', 'followers', 'following', 'email', 'bio', 'public_repos'];
        var list = topicArr.map((item, index) => {
            if (!userInfo[item]) {
                return <View key={index} />
            } else {
                return (
                    <View key={index}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.rowTitle}>{this.getRowTitle(userInfo, item)}</Text>
                            <Text style={styles.rowContent}> {userInfo[item]} </Text>
                        </View>
                        <Separator />
                    </View>
                )
            }
        });
        return (
            <ScrollView style={styles.container}>
                <Badge userInfo={this.state.userInfo} />
                <Button
                    onPress={() => this.back('Login')}
                    title="Go Back To DashBoard"
                />
                {list}
            </ScrollView>
        )
    }
};

