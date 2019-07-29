import React from "react";
import { Text, View } from "react-native";

const Contacts = ({ name = "Isfaaq Goomany", phoneNumber = "5 784 8521" }) => (
  <View>
    <Text>{name}</Text>
    <Text>{phoneNumber}</Text>
  </View>
);

export default Contacts;
