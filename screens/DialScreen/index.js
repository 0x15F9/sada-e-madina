import React from "react";
import { View, Text, Button } from "react-native";
import styles from "./_style";

const DialScreen = () => (
  <View style={styles.container}>
    <Text>Contacts + check box</Text>
    <Button title="Dial" />
  </View>
);

export default DialScreen;
