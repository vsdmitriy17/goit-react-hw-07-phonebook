import styles from './ContactList.module.css';
import PropTypes from 'prop-types';
import { useGetContactsQuery } from '../../redux/contactsReducer.js';
import { useDeleteContactMutation } from '../../redux/contactsReducer.js';

export default function ContactList({ item }) {
    const { isLoading } = useGetContactsQuery();
    const [deleteContact, res] = useDeleteContactMutation();
    return (
        <ul>
            {isLoading ? (
                <b>Загружаем контакты</b>
            ) : (item.map(contact => {
                return (
                    <li key={contact.id} className={styles.contactList_item}>
                        <p className={styles.item_text}>{contact.name}: <span className={styles.item_span}>{contact.number}</span></p>
                        <button type="button" className={styles.item_btn} onClick={() => deleteContact(contact.id)}>Delete</button>
                    </li>
                )
            }))}
        </ul>
    );
};

ContactList.propTypes = {
  clickDelete: PropTypes.func,
  item: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.string,
      id: PropTypes.string,
    })
  ),
};
