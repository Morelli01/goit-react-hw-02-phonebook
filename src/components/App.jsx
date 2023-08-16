import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    timer: new Date().toLocaleTimeString(),
  };

  handleChange = e => {
    this.setState({ filter: e.target.value });
  };

  handleSubmit = newContact => {
    const isExist = this.state.contacts.some(
      contact =>
        contact.name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase()
    );

    if (isExist) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [{ ...newContact, id: nanoid() }, ...prevState.contacts],
      };
    });
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getFilteredContacts = () => {
    const filterContactsList = this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    });

    return filterContactsList;
  };

  componentDidMount() {
    const pars = JSON.parse(localStorage.getItem('qwerty'));

    if (pars) {
      this.setState({ contacts: pars });
    }

    setInterval(() => {
      this.setState({ timer: new Date().toLocaleTimeString() });
    }, 1000);
  }

  componentDidUpdate() {
    localStorage.setItem('qwerty', JSON.stringify(this.state.contacts));
  }

  render() {
    const { filter } = this.state;

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 20,
          color: '#010101',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '200px',
            height: '50px',
            color: 'red',
            border: 'thick double #32a1ce',
          }}
        >
          Local time {this.state.timer}
        </div>
        <h1>Phonebook</h1>
        <ContactForm handleSubmit={this.handleSubmit} />
        <h2> Contacts</h2>

        <Filter filter={filter} handleChange={this.handleChange} />
        {this.state.contacts.length !== 0 && (
          <ContactList
            contacts={this.getFilteredContacts()}
            handleDelete={this.handleDelete}
          />
        )}
      </div>
    );
  }
}
