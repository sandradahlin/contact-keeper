import React, { useReducer } from "react";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
    GET_CONTACTS,
    CLEAR_CONTACTS,
    ADD_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    DELETE_CONTACT,
    CONTACT_ERROR
} from "../types";

const ContactState = (props) => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //actions

    const getContacts = async () => {
        //no need to set the token because the token is set whenever a user is logged in
        try {
            const res = await axios.get("/api/contacts");
            dispatch({ type: GET_CONTACTS, payload: res.data });
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.data.msg });
        }
    };

    const addContact = async (contact) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        //no need to set the token because the token is set whenever a user is logged in
        try {
            const res = await axios.post("/api/contacts", contact, config);
            dispatch({ type: ADD_CONTACT, payload: res.data.contact });
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.data.msg });
        }
    };

    const deleteContact = async (id) => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({ type: DELETE_CONTACT, payload: id });
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.data.msg });
        }
    };

    const updateContact = async (contact) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        //no need to set the token because the token is set whenever a user is logged in
        try {
            const res = await axios.put(
                `/api/contacts/${contact._id}`,
                contact,
                config
            );
            dispatch({ type: UPDATE_CONTACT, payload: res.data.contact });
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.data.msg });
        }
    };

    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    const filterContacts = (text) => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };

    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS });
    };

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                error: state.error,
                filtered: state.filtered,
                getContacts,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
                clearContacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
