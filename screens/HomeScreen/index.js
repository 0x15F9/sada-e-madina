import React from "react";
import { Button, Text, View } from "react-native";
import styles from "./_style";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Sada-e-Madina"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text> Sada - e - Madina </Text>
        <Button title="Dial" onPress={() => navigate("DialScreen")} />
      </View>
    );
  }
}

export default HomeScreen;
