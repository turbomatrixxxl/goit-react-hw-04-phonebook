import Form from 'components/form';
import React, { Component } from 'react';
import Input from 'components/common/input';
import Button from 'components/common/button';

import styles from './ContactBook.module.css';
// import RenderContacts from 'components/renderContacts';

export default class ContactBook extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    disabled: true,
    searchTherm: '',
  };

  async componentDidMount() {
    try {
      const localstorageContacts = localStorage.getItem('contacts');
      const localContacts = JSON.parse(localstorageContacts);

      if (localContacts === null || localContacts.length === 0) {
        alert('Nu aveti contacte salvate in lista !');
        return;
      }

      this.setState({
        ...this.state,
        contacts: localContacts,
      });
    } catch (error) {
      alert('Nu aveti contacte salvate in lista !');
      console.log(error.message);
    }
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    // localStorage.clear();
  }

  handleSubmit = ev => {
    ev.preventDefault();
    const form = ev.target;
    this.setState({
      contacts: [
        ...this.state.contacts,
        {
          id: `id-${this.state.contacts.length + 1}`,
          name: this.state.name,
          number: this.state.number,
        },
      ],
      name: '',
      number: '',
      disabled: true,
    });

    form.reset();
  };

  handleChange = e => {
    const { name, value } = e.target;

    if (value.length === 0) {
      // console.log('hey');

      this.setState({ ...this.state, [name]: '', disabled: true });
    }

    if (value.length > 0) {
      // console.log('hey');

      this.setState({ ...this.state, [name]: value, disabled: false });
    }

    const isExist = this.state.contacts.find(contact => {
      // console.log(contact.name === value);
      return contact.name === value;
    });
    if (isExist) {
      // console.log('true');
      alert(`${value} este deja in contacte.`);
      this.setState({ ...this.state, [name]: '', disabled: true });
    }
  };

  handleSearchChange = e => {
    const { name, value } = e.target;

    if (value.length > 0) {
      // console.log('hey');

      this.setState({ ...this.state, [name]: value });
    }

    if (value.length === 0) {
      // console.log('hey');

      this.setState({ ...this.state, [name]: '' });
    }
  };

  handleRemove = id => {
    // console.log(id);
    const filtered = this.state.contacts.filter(contact => contact.id !== id);
    return this.setState({ ...this.state, contacts: [...filtered] });
  };

  render() {
    // console.log(this.state);
    const contacts = this.state.contacts;
    const searchTherm = this.state.searchTherm;
    const getContactsByName = contacts.filter(contact => {
      const isFound = contact.name
        .toLowerCase()
        .includes(searchTherm.toLowerCase());
      return isFound;
    });

    const disabled = this.state.disabled;
    // const reName = new RegExp("^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$");
    // const reTel = new RegExp(
    //   '/(?:([+]d{1,4})[-.s]?)?(?:[(](d{1,3})[)][-.s]?)?(d{1,4})[-.s]?(d{1,4})[-.s]?(d{1,9})/g'
    // );

    return (
      <section className={styles.section}>
        <h1>Phonebook</h1>
        <Form handleSubmit={this.handleSubmit}>
          <Input
            type="text"
            name="name"
            label="Name"
            pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required={true}
            handleChange={this.handleChange}
          />

          <Input
            type="tel"
            name="number"
            label="Number"
            pattern="/(?:([+]d{1,4})[-.s]?)?(?:[(](d{1,3})[)][-.s]?)?(d{1,4})[-.s]?(d{1,4})[-.s]?(d{1,9})/g"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required={true}
            handleChange={this.handleChange}
          />

          <Button type="submit" disabled={disabled}>
            Add contact
          </Button>
        </Form>
        <div></div>{' '}
        <Input
          type="text"
          name="searchTherm"
          label="Find contacts by name"
          title="Type name"
          required={false}
          handleChange={this.handleSearchChange}
        />
        <h2>Contacts</h2>
        <ul className={styles.contactList}>
          {getContactsByName.map(contact => {
            return (
              <li className={styles.contactItem} key={contact.id}>
                <span className={styles.span}></span>
                <span>
                  <b>{contact.name} :</b>
                </span>
                <span>
                  <b>{contact.number}</b>
                </span>
                <Button
                  variant={true}
                  type="button"
                  disabled={false}
                  handleClick={() => {
                    this.handleRemove(contact.id);
                  }}
                >
                  Delete
                </Button>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}
