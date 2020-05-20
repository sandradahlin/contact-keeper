import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
    ADD_CONTACT,
    REMOVE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from "../types";

const ContactState = (props) => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: "Jolanda Toho",
                email: "jolly@gmail.com",
                phone: "111",
                type: "personal"
            },
            {
                id: 2,
                name: "Jonathan Dahlin",
                email: "jona@gmail.com",
                phone: "222",
                type: "personal"
            },
            {
                id: 3,
                name: "Bosko Toho",
                email: "boki@gmail.com",
                phone: "555",
                type: "professional"
            }
        ]
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //actions
    const addContact = (contact) => {
        contact.id = uuidv4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    };

    return (
        <ContactContext.Provider
            value={{ contacts: state.contacts, addContact }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
