import styles from './Filter.module.css';
import PropTypes from 'prop-types';

export default function Filter({filter, onChange})  {
    return (
        <label className={styles.filter_label}>
            Filter names
            <input
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Enter name"
                value={filter}
                className={styles.filter_input}
                onChange={e => onChange(e.target.value)}
            />
        </label>
    );
};

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}