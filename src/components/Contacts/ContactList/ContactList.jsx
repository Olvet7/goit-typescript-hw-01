import Contact from "../../Contacts/Contact/Contact";
import { useSelector } from "react-redux";
import css from "../ContactList/ContactList.module.css";
import { selectFilteredContacts } from "../../../redux/contactsSlice";

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <div className={css.list}>
      <ul className={css.card}>
      {contacts.map((contact) => {
        return (
          <li key={contact.id}>
            <Contact contact={contact} />
          </li>
        );
      })}
    </ul>
    </div>
  );
}
