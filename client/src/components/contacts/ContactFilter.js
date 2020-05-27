import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const { filterContacts, clearFilter, filtered } = contactContext;
    const text = useRef("");

    useEffect(() => {
        if (!filtered) {
            text.current.value = "";
        }
    });

    const onChange = (e) => {
        if (text.current.value !== "") {
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    };

    return (
        <React.Fragment>
            <form>
                <input
                    ref={text}
                    type="text"
                    placeholder="Filter Contacts..."
                    onChange={onChange}
                />
            </form>
            {/* {filtered && (
                <ul className="dropdown">
                    {filtered.map((item) => (
                        <li>{item.name}</li>
                    ))}
                </ul>
            )} */}
        </React.Fragment>
    );
};

export default ContactFilter;
