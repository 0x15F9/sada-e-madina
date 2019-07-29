import * as Contacts from "expo-contacts";

export const getContacts = () => {
  try {
    // FIXME:add await
    const contacts = Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers]
    });
    return contacts.data
      .filter(contact => contact.phoneNumbers !== undefined) // Get contacts which have phone numbers
      .map(({ id, name, phoneNumbers }) => ({
        id,
        name,
        phoneNumber: phoneNumbers[0].number
      }));
  } catch (error) {
    return "Error";
    console.log(error);
  }
};
