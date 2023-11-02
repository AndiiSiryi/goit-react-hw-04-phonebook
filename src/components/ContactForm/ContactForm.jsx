import React, { Component } from 'react';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types'

export class ContactForm extends Component{
    state = {
        name: '',
        number: '',
    };

  validateName(name) {
    const nameRegex = /^[a-zA-Zа-яА-ЯїіІ'Ї\s]+$/;
    return nameRegex.test(name);
  }

  validateNumber(number) {
    const phoneRegex = /^\d{7}$|^\d{3}-\d{2}-\d{2}$/;
    return phoneRegex.test(number);
  }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, number } = this.state;
          if (!this.validateName(name)) {
      alert('Name may contain only letters, apostrophe, and spaces');
      return;
    }

    if (!this.validateNumber(number)) {
      alert('The phone number must contain only 7 digits, example: XXXXXXX or XXX-XX-XX.');
      return;
    }
        this.props.handleFormSubmit(name, number);
        this.setState({ name: '', number: '' });
        };


    render() {
        const { name, number } = this.state;
        return (
            <form className={css.form} onSubmit={this.handleSubmit}>
                <label className={css.label}>
                    Name:
                    <input
                        className={css.input}
                        type="text"
                        // title="Name may contain only letters, apostrophe, dash and spaces"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                        required />
                </label>
                <label className={css.label}>Phone Number:
                    <input
                        className={css.input}
                        type="tel"
                        //  title="The phone number must contain only 7 digits, example: XXXXXXX or XXX-XX-XX."
                        name="number"
                        value={number}
                        onChange={this.handleChange}
                        required />
                </label>
                <button className={css.button} type="submit">
                    Add Contact
                </button>
            </form>)
    }
};

ContactForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
};