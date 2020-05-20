import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
    ADD_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    DELETE_CONTACT
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
        ],
        current: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //actions
    const addContact = (contact) => {
        contact.id = uuidv4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    };

    const deleteContact = (id) => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    };

    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    const updateContact = (contact) => {
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    };

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;