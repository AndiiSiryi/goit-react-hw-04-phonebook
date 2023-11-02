

import css from './ContactList.module.css'
import PropTypes from 'prop-types'


export const ContactItem = ({ name, number, onDelete }) => {
  return (
    <li className={css.item}>
      {name}: {number}
      <button className={css.buttonDelet} type="button" onClick={onDelete}>
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}