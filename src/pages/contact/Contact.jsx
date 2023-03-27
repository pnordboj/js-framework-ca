import React from 'react';
import style from './Contact.module.css';
import { useForm } from 'react-hook-form';

function Contact() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    if (data) {
      alert('Thank you for your message! We will get back to you as soon as possible. :)')
      if (window.confirm('Do you want to send another message?')) {
        window.location.reload();
      } else {
        window.location.replace('/');
      }
    }
  }
  return (
    <div className={style.main}>
      <h1>Contact Form</h1>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formgroup}>

          <div className={style.input}>
            <label htmlFor="name">Name</label>
            <input className={style.inputName} type="text" name="name" id="name" {...register('fullName', { 
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters"
                }
              })}
              aria-invalid={errors.fullName ? "true" : "false"} />

            {errors.fullName && <p className={style.errorMessage} role="alert">{errors.fullName?.message}</p>}
          </div>

          <div className={style.input}>
            <label htmlFor="email">Email</label>

            <input className={style.inputEmail} type="email" name="email" id="email" {...register('email', {
              required: "Email Address is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid Email Address"
              } })}
            aria-invalid={errors.email ? "true" : "false"} />

            {errors.email && <p className={style.errorMessage} role="alert">{errors.email?.message}</p>}
          </div>

          <div className={style.input}>
            <label htmlFor="subject">Subject</label>
            <input className={style.inputSubject} type="text" name="subject" id="subject" {...register('subject',
              { required: "Subject is required",
                minLength: {
                  value: 3,
                  message: "Subject must be at least 3 characters"
                } })}
            aria-invalid={errors.subject ? "true" : "false"} />
            {errors.subject && <p className={style.errorMessage} role="alert">{errors.subject?.message}</p>}
          </div>

          <div className={style.input}>
            <label htmlFor="message">Message</label>
            <p className={style.reqMessage}>Min 10 letters</p>
            <textarea className={style.inputMessage} name="message" id="message" {...register('message', {
              required: "Message is required",
              minLength: {
                value: 3,
                message: "Message must be at least 3 characters"
              }
            })}
            aria-invalid={errors.message ? "true" : "false"} />

            {errors.message && <p className={style.message} role="alert">{errors.message?.message}</p>}
          </div>

          <input className={style.submit} type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Contact;