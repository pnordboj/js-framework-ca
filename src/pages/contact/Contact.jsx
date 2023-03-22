import React, { useState, useEffect } from 'react';
import style from './Contact.module.css';

function Contact() {
  return (
    <div className={style.main}>
      <h1>Contact Form</h1>
      <form className={style.form}>
        <div className={style.input}>
          <label>Name:</label>
          <input className={style.inputName} type="text" name="name" />
        </div>
        <div className={style.input}>
          <label>Email:</label>
          <input type="text" name="email" className={style.inputEmail} />
        </div>
        <div className={style.input}>
          <label>Message:</label>
          <textarea className={style.inputMessage} name="message" />
        </div>
        <input className={style.submit} type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Contact;