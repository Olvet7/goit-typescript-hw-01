import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/Contacts/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";

import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "./redux/contactsOps";
import toast, { Toaster } from "react-hot-toast";
import { selectError, selectLoading } from "./redux/contactsSlice";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts())
      .unwrap()
      .then(() => {
        toast.success("Yey! Fulfilled!");
      })
      .catch(() => {
        toast.error("Ops! Reload page, please");
      });
  }, [dispatch]);

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  return (
    <div>
      <h2>Phonebook</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error message</p>}
      <ContactForm />
      <SearchBox />
      <ContactList />
      <Toaster />
    </div>
  );
}
