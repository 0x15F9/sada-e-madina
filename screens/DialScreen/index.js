import React from "react";
import { View, Text, Button } from "react-native";
import Contacts from "../../components/Contacts";
import * as _Contacts from "expo-contacts";
import styles from "./_style";
import { getContacts } from "./_helpers";

class DialScreen extends React.Component {
  state = {};

  componentDidMount() {
    _Contacts
      .getContactsAsync({
        fields: [_Contacts.Fields.Name, _Contacts.Fields.PhoneNumbers]
      })
      .then(contacts => {
        let c = contacts.data
          .filter(contact => contact.phoneNumbers !== undefined) // Get contacts which have phone numbers
          .map(({ id, name, phoneNumbers }) => ({
            id,
            name,
            phoneNumber: phoneNumbers[0].number
          }));
        this.setState({ contacts: c });
      })
      .catch(err => {
        console.log(err);
        return "Error";
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.contacts ? (
          this.state.contacts.map(({ id, name, phoneNumber }) => (
            <Contacts key={id} name={name} phoneNumber={phoneNumber} />
          ))
        ) : (
          <Text>Loading...</Text>
        )}

        <Button
          title="Dial"
          onPress={() => {
            console.log(this.state);
          }}
        />
      </View>
    );
  }
}

export default DialScreen;
