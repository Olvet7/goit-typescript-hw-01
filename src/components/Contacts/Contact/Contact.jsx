import { Gi3DMeeple } from "react-icons/gi";
import { GiPerspectiveDiceSixFacesOne } from "react-icons/gi";
import css from "../Contact/Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../../redux/contactsOps";
import toast from "react-hot-toast";

export default function Contact({ contact }) {
  const dispatch = useDispatch();

  return (
    <div className={css.card}>
      <ul className={css.item}>
        <li className={css.text}>
          <Gi3DMeeple size="24" />
          {contact.name}
        </li>
        <li className={css.text}>
          <GiPerspectiveDiceSixFacesOne size="24" />
          {contact.number}
        </li>
      </ul>
      <button
        onClick={() =>
          dispatch(deleteContact(contact.id))
            .unwrap()
            .then(() => {
              toast.success("Contact deleted 😁");
            })
            .catch(() => {
              toast.error("Something went wrong... 😥");
            })
        }
        className={css.btn}
        type="button"
      >
        Delete
      </button>
    </div>
  );
}

// export const Contact = ({ name, number, onDelete }) => {
//   return (
//     <div className={css.card}>
//       <ul className={css.item}>
//         <li className={css.text}><Gi3DMeeple size="24"/>{name}</li>
//         <li className={css.text}><GiPerspectiveDiceSixFacesOne size="24"/>{number}</li>
//       </ul>
//       <button type="button" className={css.btn} onClick={onDelete}>
//         Delete
//       </button>
//     </div>
//   );
// };
