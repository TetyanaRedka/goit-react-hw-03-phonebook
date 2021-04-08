import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  changeData = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  submitContact = e => {
    const { name, number } = this.state;
    e.preventDefault();
    if (this.props.checkContact(name)) {
      alert(`${name} is already in contact`);
      return;
    }

    const contact = {
      id: uuidv4(),
      name: name,
      number: number,
    };

    this.props.onSubmit(contact);

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.submitContact} className={styles.formStyle}>
        <label className={styles.pointStyle}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            value={name}
            onChange={this.changeData}
          />
        </label>
        <label className={styles.pointStyle}>
          Number
          <input
            className={styles.input}
            type="tel"
            name="number"
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
            required
            value={number}
            onChange={this.changeData}
          />
        </label>
        <button type="submit" className={styles.btn}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  checkContact: PropTypes.func.isRequired,
};

export default ContactForm;
