import React from "react";
import { View, Text } from "react-native";
import * as _Contacts from "expo-contacts";
import styles from "./_style";
import { getContacts } from "./_helpers";
import {
  ListItem,
  CheckBox,
  Icon,
  ButtonGroup,
  Button
} from "react-native-elements";

class DialScreen extends React.Component {
  constructor() {
    super();
    this.state = { contacts: [], layout: "dial" };
    this.onCallingScreenButtonsPressed.bind(this);
  }

  onItemSelected = id => {
    this.setState({
      contacts: this.state.contacts.map(contact =>
        contact.id === id
          ? { ...contact, selected: !contact.selected }
          : contact
      )
    });
  };

  onDialPressed = () => {
    // Change layout to calling: icons change to cross, check, or alert
    this.setState({
      contacts: this.state.contacts
        .filter(contact => contact.selected)
        .map(contact => ({ ...contact, state: "Not yet called" })),
      layout: "dialling"
    });
  };

  togglePauseContinue = () => {
    console.log("pause");
  };
  onContinuePressed = () => {
    console.log("continue");
  };

  onCallingScreenButtonsPressed = selectedIndex => {
    switch (selectedIndex) {
      case 0:
        this.togglePauseContinue();
        break;
      case 1:
        this.onStopPressed();
        break;

      default:
        break;
    }
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
    const buttons = ["Pause", "Cancel"];
    return (
      <View style={styles.container}>
        {this.state.contacts ? (
          this.state.contacts.map(contact => (
            <ListItem
              key={contact.id}
              title={contact.name}
              subtitle={contact.phoneNumber}
              rightElement={
                this.state.layout === "dial" ? (
                  <CheckBox
                    checked={contact.selected}
                    onPress={() => this.onItemSelected(contact.id)}
                  />
                ) : (
                  // states: 0: going to call, 1: calling, 2: rejected/answered, 3: not replied
                  <Text>{contact.state}</Text>
                )
              }
              bottomDivider={true}
              onPress={() => this.onItemSelected(contact.id)}
            />
          ))
        ) : (
          <Text>Loading...</Text>
        )}
        {this.state.layout === "dial" ? (
          <Button title="Dial" onPress={this.onDialPressed} />
        ) : (
          <ButtonGroup
            onPress={this.onCallingScreenButtonsPressed}
            buttons={buttons}
            containerStyle={{ height: 100 }}
          />
        )}
      </View>
    );
  }
}

export default DialScreen;
