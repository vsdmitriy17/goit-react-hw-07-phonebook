import styles from './App.module.css';
import ContactList from './contactList/ContactList.jsx';
import ContactForm from './contactForm/ContactForm.jsx';
import Filter from './filter/Filter.jsx';
import { useState, useMemo } from 'react';
import { useAddContactMutation } from '../redux/contactsReducer.js';
import { useGetContactsQuery } from '../redux/contactsReducer.js';

export default function App() {
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
