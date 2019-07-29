import * as Contacts from "expo-contacts";

export const getContacts = () => {
  Contacts.getContactsAsync({
    fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers]
  })
    .then(contacts => [{ name: "Sabina G", phoneNumber: "1245783" }])
    .catch(err => {
      return "Error";
      console.log(err);
    });
};
