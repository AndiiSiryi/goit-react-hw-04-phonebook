import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

  useEffect(() => {
    const phoneContacts = localStorage.getItem('contacts');
    const parcedContacts = JSON.parse(phoneContacts);
    if (parcedContacts) {
      setContacts(parcedContacts);
    }
  }, []);

  // componentDidMount() {
  //   const phoneContacts = localStorage.getItem('contacts');
  //   const parcedContacts = JSON.parse(phoneContacts);
  //   if (parcedContacts) {
  //     this.setState({ contacts: parcedContacts });
  //   }
  // }
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  const handleFilterChange = e => {
    const newFilter = e.target.value;
    setFilter(newFilter);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  // handleFilterChange = e => {
  //   this.setState({ filter: e.target.value });
  // };
  const handleFormSubmit = (name, number) => {
    const isNameExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isNameExists) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  // handleFormSubmit = (name, number) => {
  //   const { contacts } = this.state;
  //   // if (name.trim() === '' || number.trim() === '') {
  //   //   alert('Please enter both name and phone number.');
  //   //   return;
  //   // }
  //   const isNameExists = contacts.some(
  //     contact => contact.name.toLowerCase() === name.toLowerCase()
  //   );

  //   if (isNameExists) {
  //     alert(`${name} is already in contacts.`);
  //     return;
  //   }

  //   const newContact = {
  //     id: nanoid(),
  //     name,
  //     number,
  //   };

  //   this.setState(prevState => ({
  //     contacts: [...prevState.contacts, newContact],
  //   }));
  // };
  const handleDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  // handleDeleteContact = contactId => {
  //   this.setState(prevState => ({
  //     contacts: prevState.contacts.filter(contact => contact.id !== contactId),
  //   }));
  // };

  // const { contacts, filter } = this.state;
  return (
    <div className={css.styleApp}>
      <h1>Phonebook</h1>
      <ContactForm handleFormSubmit={handleFormSubmit} />

      <h2>Contacts</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        // filter={filter}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
