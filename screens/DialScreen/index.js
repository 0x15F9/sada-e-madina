import React from "react";
import { View, Text } from "react-native";
import * as _Contacts from "expo-contacts";
import styles from "./_style";
import { getContacts } from "./_helpers";
import { ListItem, CheckBox, Button } from "react-native-elements";

class DialScreen extends React.Component {
  state = { contacts: [] };

  onItemSelected = id => {
    this.setState({
      contacts: this.state.contacts.map(contact =>
        contact.id === id
          ? { ...contact, selected: !contact.selected }
          : contact
      )
    });
  };

  componentDidMount() {
    // TODO: Move to helpers
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
            phoneNumber: phoneNumbers[0].number,
            selected: false
          }));
        this.setState({ contacts: c });
      })
      .catch(err => {
        console.log(err);
        return "Error";
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.state.contacts ? (
          this.state.contacts.map(({ id, name, phoneNumber, selected }) => (
            <ListItem
              key={id}
              title={name}
              subtitle={phoneNumber}
              rightElement={
                <CheckBox
                  checked={selected}
                  onPress={() => this.onItemSelected(id)}
                />
              }
              bottomDivider={true}
              onPress={() => this.onItemSelected(id)}
            />
          ))
        ) : (
          <Text>Loading...</Text>
        )}

        <Button
          title="Dial"
          onPress={() =>
            navigate("CallScreen", {
              callList: this.state.contacts.filter(contact => contact.selected)
            })
          }
        />
      </View>
    );
  }
}

export default DialScreen;
