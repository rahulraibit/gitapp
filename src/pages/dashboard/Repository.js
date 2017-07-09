import React, { Component } from 'react';
import {
    ScrollView, Button, Text, TextInput, View, TouchableHighlight, ActivityIndicator, StyleSheet
} from 'react-native';
import Badge from './../../components/helpers/Badge';
import Separator from './../../components/helpers/Seprator'
import Web_View from './../../components/helpers/WebView'
import { _navigateTo } from './../../utils/common'


var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowContainer: {
        flexDirection: 'column',
        flex: 1,
        padding: 10
    },
    name: {
        color: '#48BBEC',
        fontSize: 18,
        paddingBottom: 5
    },
    stars: {
        color: '#48BBEC',
        fontSize: 14,
        paddingBottom: 5
    },
    description: {
        fontSize: 14,
        paddingBottom: 5
    }
});

class Repositories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: this.props.navigation.state.params.userInfo,
            repos: this.props.navigation.state.params.repos
        }
    }
    openPage(url) {
        this.props.navigator.push({
            title: 'Web View',
            component: Web_View,
            passProps: { url }
        });
    }
    back() {
        _navigateTo(this, 'DashBoard', { 'userInfo': this.state.userInfo })
    }
    render() {
        var repos = this.state.repos;
        var list = repos.map((item, index) => {
            var desc = repos[index].description ? <Text style={styles.description}> {repos[index].description} </Text> : <View />;
            return (
                <View key={index}>
                    <View style={styles.rowContainer}>
                        <TouchableHighlight
                            onPress={this.openPage.bind(this, repos[index].html_url)}
                            underlayColor='transparent'>
                            <Text style={styles.name}>{repos[index].name}</Text>
                        </TouchableHighlight>
                        <Text style={styles.stars}> Stars: {repos[index].stargazers_count} </Text>
                        {desc}
                    </View>
                    <Separator />
                </View>
            )
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


module.exports = Repositories;