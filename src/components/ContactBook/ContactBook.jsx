import Form from 'components/form';
import React, { useEffect, useState } from 'react';
import Input from 'components/common/input';
import Button from 'components/common/button';

import styles from './ContactBook.module.css';
// import RenderContacts from 'components/renderContacts';

const localstorageContacts = localStorage.getItem('contacts');
const localContacts = JSON.parse(localstorageContacts);

export default function ContactBook() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: '',
    number: '',
  });
  const [disabled, setDisabled] = useState(true);
  const [searchTherm, setSearchTherm] = useState('');

  useEffect(() => {
    async function fetchContacts() {
      try {
        if (localContacts === null || localContacts.length === 0) {
          alert('Nu aveti contacte salvate in lista !');
          return;
        } else {
          setContacts(localContacts);
        }
      } catch (error) {
        alert('Nu aveti contacte salvate in lista !');
        // console.log(error.message);
      }
    }

    fetchContacts();
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));

    // localStorage.clear();
  }, [contacts]);

  function handleSubmit(ev) {
    ev.preventDefault();
    const form = ev.target;

    // console.log(newContact.name);
    // console.log(newContact.number);

    setContacts([
      ...contacts,
      {
        id: `id-${contacts.length + 1}`,
        name: newContact.name,
        number: newContact.number,
      },
    ]);
    console.log(contacts);

    form.reset();
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (value.length === 0) {
      // console.log('hey');

      setNewContact({ ...newContact, [name]: '' });
      setDisabled(true);
    }

    if (value.length > 0) {
      // console.log('hey');

      setNewContact({ ...newContact, [name]: value });
      setDisabled(false);
    }

    const isExist = contacts.find(contact => {
      // console.log(contact.name === value);
      return contact.name === value;
    });

    if (isExist) {
      console.log('true');

      alert(`${value} este deja in contacte.`);
      setNewContact({ ...newContact, [name]: '' });
      setDisabled(true);
    }
  }

  function handleSearchChange(e) {
    const { value } = e.target;

    if (value.length > 0) {
      // console.log('hey');

      setSearchTherm(value);
    }

    if (value.length === 0) {
      // console.log('hey');

      setSearchTherm('');
    }
  }

  function handleRemove(id) {
    // console.log(id);

    const filtered = contacts.filter(contact => contact.id !== id);
    setContacts(filtered);
  }

  const getContactsByName = contacts.filter(contact => {
    const isFound = contact.name
      .toLowerCase()
      .includes(searchTherm.toLowerCase());
    return isFound;
  });

  // const reName = new RegExp("^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$");
  // const reTel = new RegExp(
  //   '/(?:([+]d{1,4})[-.s]?)?(?:[(](d{1,3})[)][-.s]?)?(d{1,4})[-.s]?(d{1,4})[-.s]?(d{1,9})/g'
  // );

  return (
    <section className={styles.section}>
      <h1>Phonebook</h1>
      <Form handleSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          label="Name"
          pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required={true}
          handleChange={handleChange}
        />

        <Input
          type="tel"
          name="number"
          label="Number"
          pattern="/(?:([+]d{1,4})[-.s]?)?(?:[(](d{1,3})[)][-.s]?)?(d{1,4})[-.s]?(d{1,4})[-.s]?(d{1,9})/g"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required={true}
          handleChange={handleChange}
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
        handleChange={handleSearchChange}
      />
      <div>
        <h2 style={{ margin: '10px 0 20px' }}>Contacts</h2>
        <p style={{ fontSize: '24px', margin: '0' }}>
          Total Contacts: {contacts.length}
        </p>
        <p style={{ fontSize: '24px', margin: '0' }}>
          Contacts found: {getContactsByName.length}
        </p>
      </div>
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
                  handleRemove(contact.id);
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

// export default class ContactBook extends Component {
//   state = {
//     contacts: [],
//     name: '',
//     number: '',
//     disabled: true,
//     searchTherm: '',
//   };

//   async componentDidMount() {
//     try {
//       const localstorageContacts = localStorage.getItem('contacts');
//       const localContacts = JSON.parse(localstorageContacts);

//       if (localContacts === null || localContacts.length === 0) {
//         alert('Nu aveti contacte salvate in lista !');
//         return;
//       }

//       this.setState({
//         ...this.state,
//         contacts: localContacts,
//       });
//     } catch (error) {
//       alert('Nu aveti contacte salvate in lista !');
//       console.log(error.message);
//     }
//   }

//   componentDidUpdate() {
//     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     // localStorage.clear();
//   }

//   handleSubmit = ev => {
//     ev.preventDefault();
//     const form = ev.target;
//     this.setState({
//       contacts: [
//         ...this.state.contacts,
//         {
//           id: `id-${this.state.contacts.length + 1}`,
//           name: this.state.name,
//           number: this.state.number,
//         },
//       ],
//       name: '',
//       number: '',
//       disabled: true,
//     });

//     form.reset();
//   };

//   handleChange = e => {
//     const { name, value } = e.target;

//     if (value.length === 0) {
//       // console.log('hey');

//       this.setState({ ...this.state, [name]: '', disabled: true });
//     }

//     if (value.length > 0) {
//       // console.log('hey');

//       this.setState({ ...this.state, [name]: value, disabled: false });
//     }

//     const isExist = this.state.contacts.find(contact => {
//       // console.log(contact.name === value);
//       return contact.name === value;
//     });
//     if (isExist) {
//       // console.log('true');
//       alert(`${value} este deja in contacte.`);
//       this.setState({ ...this.state, [name]: '', disabled: true });
//     }
//   };

//   handleSearchChange = e => {
//     const { name, value } = e.target;

//     if (value.length > 0) {
//       // console.log('hey');

//       this.setState({ ...this.state, [name]: value });
//     }

//     if (value.length === 0) {
//       // console.log('hey');

//       this.setState({ ...this.state, [name]: '' });
//     }
//   };

//   handleRemove = id => {
//     // console.log(id);
//     const filtered = this.state.contacts.filter(contact => contact.id !== id);
//     return this.setState({ ...this.state, contacts: [...filtered] });
//   };

//   render() {
//     // console.log(this.state);
//     const contacts = this.state.contacts;
//     const searchTherm = this.state.searchTherm;
//     const getContactsByName = contacts.filter(contact => {
//       const isFound = contact.name
//         .toLowerCase()
//         .includes(searchTherm.toLowerCase());
//       return isFound;
//     });

//     const disabled = this.state.disabled;
//     // const reName = new RegExp("^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$");
//     // const reTel = new RegExp(
//     //   '/(?:([+]d{1,4})[-.s]?)?(?:[(](d{1,3})[)][-.s]?)?(d{1,4})[-.s]?(d{1,4})[-.s]?(d{1,9})/g'
//     // );

//     return (
//       <section className={styles.section}>
//         <h1>Phonebook</h1>
//         <Form handleSubmit={this.handleSubmit}>
//           <Input
//             type="text"
//             name="name"
//             label="Name"
//             pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             required={true}
//             handleChange={this.handleChange}
//           />

//           <Input
//             type="tel"
//             name="number"
//             label="Number"
//             pattern="/(?:([+]d{1,4})[-.s]?)?(?:[(](d{1,3})[)][-.s]?)?(d{1,4})[-.s]?(d{1,4})[-.s]?(d{1,9})/g"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             required={true}
//             handleChange={this.handleChange}
//           />

//           <Button type="submit" disabled={disabled}>
//             Add contact
//           </Button>
//         </Form>
//         <div></div>{' '}
//         <Input
//           type="text"
//           name="searchTherm"
//           label="Find contacts by name"
//           title="Type name"
//           required={false}
//           handleChange={this.handleSearchChange}
//         />
//         <h2>Contacts</h2>
//         <ul className={styles.contactList}>
//           {getContactsByName.map(contact => {
//             return (
//               <li className={styles.contactItem} key={contact.id}>
//                 <span className={styles.span}></span>
//                 <span>
//                   <b>{contact.name} :</b>
//                 </span>
//                 <span>
//                   <b>{contact.number}</b>
//                 </span>
//                 <Button
//                   variant={true}
//                   type="button"
//                   disabled={false}
//                   handleClick={() => {
//                     this.handleRemove(contact.id);
//                   }}
//                 >
//                   Delete
//                 </Button>
//               </li>
//             );
//           })}
//         </ul>
//       </section>
//     );
//   }
// }
