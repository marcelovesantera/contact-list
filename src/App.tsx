import React, { useState, useEffect } from 'react';
import './App.css';
import { IContact } from './interfaces/Contact';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  const [contact, setContact] = useState<Partial<IContact> | null>(null);
  const [contactList, setContactList] = useState<IContact[]>([]);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContactList(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contactList));
  }, [contactList]);

  const addContact = (newContact: IContact) => {
    if (newContact) {
      const obj = [...contactList, newContact];
      const sortedContacts = obj.sort((a, b) => a.id - b.id);
      setContactList(sortedContacts);
    }
  }

  const editContact = (contactId: number) => {
    if (contactId) {
      const contactItem = contactList.find((item) => item.id === contactId);

      if (contactItem) {
        setContact(contactItem);

        const obj = contactList.filter((item) => item.id !== contactItem.id);
        setContactList(obj);
      }
    }
  }

  const deleteContact = (contactId: number) => {
    if (contactId) {
      const obj = contactList.filter((item) => item.id !== contactId);
      setContactList(obj);
    }
  }

  return (
    <div className="App">
      <h1>Contact List</h1>
      <ContactForm
        contact={contact}
        setContact={setContact}
        contactList={contactList}
        addContact={addContact}
      />
      <ContactList
        contactList={contactList}
        editContact={editContact}
        deleteContact={deleteContact}
      />
    </div>
  );
}

export default App;
