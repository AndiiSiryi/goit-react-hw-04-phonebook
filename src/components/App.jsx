import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import css from './App.module.css'

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const phoneContacts = localStorage.getItem('contacts');
    const parcedContacts = JSON.parse(phoneContacts);
    if (parcedContacts) {
      this.setState({contacts: parcedContacts})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  
}

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  handleFormSubmit = (name, number) => {
    const { contacts } = this.state;
        // if (name.trim() === '' || number.trim() === '') {
    //   alert('Please enter both name and phone number.');
    //   return;
    // }
    const isNameExists = contacts.some((contact) => contact.name.toLowerCase() === name.toLowerCase());

    if (isNameExists) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleDeleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div className={css.styleApp}>
        <h1>Phonebook</h1>
        <ContactForm handleFormSubmit={this.handleFormSubmit} />

        <h2>Contacts</h2>
        <Filter filter={filter} onFilterChange={this.handleFilterChange} />
        <ContactList contacts={contacts} filter={filter} onDeleteContact={this.handleDeleteContact} />
      </div>
    );
  }
}
