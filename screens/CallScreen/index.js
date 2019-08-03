import React, { Component } from "react";
import { View, Text, ProgressViewIOS, Linking } from "react-native";
class CallScreen extends Component {
  state = { progress: 0 };
  componentWillMount() {
    this.setState({
      callList: this.props.navigation.getParam("callList", [])
    });
  }

  componentDidMount() {
    this.setState({
      numList: this.state.callList.length,
      numCalled: 0,
      numResponded: 0,
      numUnresponsive: 0
    });
  }

  render() {
    const { numList, numCalled, numResponded, numUnresponsive } = this.state;
    return (
      <View>
        <Text>Number of People in List: {numList}</Text>
        <Text>Number of People Called: {numCalled}</Text>
        <Text>
          Number of People who responed (accepted or rejected): {numResponded}
        </Text>
        <Text>Number of People who did not respond: {numUnresponsive}</Text>
        <ProgressViewIOS
          progress={this.state.progress}
          progressViewStyle="bar"
        />
      </View>
    );
  }
}

export default CallScreen;
