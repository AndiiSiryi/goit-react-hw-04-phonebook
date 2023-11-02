
import css from './Filter.module.css';
import PropTypes from 'prop-types';
export const Filter = ({ filter, onFilterChange }) => {
  return (
    <label className={css.label}>
      Find contacts by name: 
      <input className={css.input} type="text" value={filter} onChange={(e) => onFilterChange(e)} />
    </label>
  );
};

Filter.protoType = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};