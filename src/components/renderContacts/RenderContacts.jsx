import React from 'react';
import PropTypes from 'prop-types';

import styles from './RenderContacts.module.css';

function RenderContacts({ contacts, children }) {
  return (
    <div>
      <h2>Contacts</h2>
      <ul className={styles.contactList}>
        {contacts.map(contact => {
          return (
            <li className={styles.contactItem} key={contact.id}>
              <span></span>
              <b>
                {contact.name} : {contact.number}
              </b>
              {children}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

RenderContacts.propTypes = {
  contacts: PropTypes.array,
  contact: PropTypes.object,
};

export default RenderContacts;
