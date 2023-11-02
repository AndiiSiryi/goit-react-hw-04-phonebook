import React, { useState } from 'react';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

export const ContactForm = ({ handleFormSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // state = {
  //   name: '',
  //   number: '',
  // };
  const validateName = name => {
    const nameRegex = /^[a-zA-Zа-яА-ЯїіІ'Ї\s]+$/;
    return nameRegex.test(name);
  };

  // validateName(name) {
  //   const nameRegex = /^[a-zA-Zа-яА-ЯїіІ'Ї\s]+$/;
  //   return nameRegex.test(name);
  // }
  const validateNumber = number => {
    const phoneRegex = /^\d{7}$|^\d{3}-\d{2}-\d{2}$/;
    return phoneRegex.test(number);
  };
  // validateNumber(number) {
  //   const phoneRegex = /^\d{7}$|^\d{3}-\d{2}-\d{2}$/;
  //   return phoneRegex.test(number);
  // }
  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };
  // handleChange = e => {
  //   const { name, value } = e.target;
  //   this.setState({ [name]: value });
  // };
  const handleSubmit = e => {
    e.preventDefault();
    if (!validateName(name)) {
      alert('Name may contain only letters, apostrophe, and spaces');
      return;
    }
    if (!validateNumber(number)) {
      alert(
        'The phone number must contain only 7 digits, example: XXXXXXX or XXX-XX-XX.'
      );
      return;
    }
    handleFormSubmit(name, number);
    setName('');
    setNumber('');
  };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   const { name, number } = this.state;
  //   if (!this.validateName(name)) {
  //     alert('Name may contain only letters, apostrophe, and spaces');
  //     return;
  //   }

  //   if (!this.validateNumber(number)) {
  //     alert(
  //       'The phone number must contain only 7 digits, example: XXXXXXX or XXX-XX-XX.'
  //     );
  //     return;
  //   }
  //   this.props.handleFormSubmit(name, number);
  //   this.setState({ name: '', number: '' });
  // };

  //   const { name, number } = this.state;
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name:
        <input
          className={css.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </label>
      <label className={css.label}>
        Phone Number:
        <input
          className={css.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          required
        />
      </label>
      <button className={css.button} type="submit">
        Add Contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
};
