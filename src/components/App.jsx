import styles from './App.module.css';
import ContactList from './contactList/ContactList.jsx';
import ContactForm from './contactForm/ContactForm.jsx';
import Filter from './filter/Filter.jsx';
// import { addContact, deleteContact, filterContact } from "../redux/actions.js";
// import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo } from 'react';
import { useAddContactMutation } from '../redux/contactsReducer.js';
import { useGetContactsQuery } from '../redux/contactsReducer.js';

export default function App() {
    // const contacts = useSelector(state => state.contactsReducer.items.filter(contact => contact.name.toLowerCase().includes(state.contactsReducer.filter)));
    // // console.log(contacts);
    // const filter = useSelector(state => state.contactsReducer.filter);
    // const dispatch = useDispatch();
    // const formSubmit = data => {
    //     dispatch(addContact(data));
    // };
    // const changeFilter = data => {
    //     dispatch(filterContact(data));
    // }
    // const deleteContacts = data => {
    //     dispatch(deleteContact(data));
    // }
    const [addContact] = useAddContactMutation();
  const [filter, setFilter] = useState('');
  const { data: contacts } = useGetContactsQuery();

  const createContact = async user => {
    await addContact(user);
  };

  const filterContacts = useMemo(() => {
    return (
      contacts?.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      ) ?? []
    );
  }, [filter, contacts]);
    
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Phonebook</h1>
            <ContactForm onSubmit={createContact}/>

            <h2 className={styles.title}>Contacts</h2>
            <Filter filter={filter} onChange={setFilter}/>
            <ContactList item={filterContacts}/>
        </div>
    );
}
