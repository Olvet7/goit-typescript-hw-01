import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import toast from "react-hot-toast";

export default function ContactForm() {
  const initialValues = {
    name: "",
    number: "",
  };

  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(
        addContact({
          name: values.name,
          number: values.number,
        })
      );
      actions.resetForm();
      toast.success("Contact added! 😁")
    } catch (error) {
      toast.error("Not add contact")
    }
  };

  const nameFieldId = useId();
  const phoneFieldId = useId();

  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  const ContactFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .matches(phoneRegExp, "Invalid phone number")
      .required("Required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactFormSchema}
    >
      <Form className={css.form}>
        <label htmlFor={nameFieldId}>Name</label>
        <Field
          type="text"
          name="name"
          placeholder="Enter your name"
          className={css.field}
          id={nameFieldId}
        />
        <ErrorMessage name="name" component="span" className={css.error} />
        <label htmlFor={phoneFieldId}>Number</label>
        <Field
          type="text"
          name="number"
          placeholder="Enter your phone"
          className={css.field}
          id={phoneFieldId}
        />
        <ErrorMessage name="number" component="span" className={css.error} />
        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
