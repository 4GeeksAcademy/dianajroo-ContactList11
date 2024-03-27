import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [contactToDelete, setContactToDelete] = useState(null);

    useEffect(() => {
        actions.infContact();
    }, []);

    const handleDeleteContact = (contactId) => {
        setContactToDelete(contactId);
    };

    return (
        <>
            {store.contacts.map((contact) => (
                <div className="fatherCard container" key={contact.id}>
                    <div className="cardHome">
                        <div style={{ margin: "15px" }} >
                            <img className="cardImg" src="https://cdn.pixabay.com/photo/2016/03/31/18/31/contact-1294428_1280.png" alt="" />
                        </div>
                        <div className="cardInf">
                            <h4 style={{ marginTop: "10px" }}>{contact.full_name}</h4>
                            <p> <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: "8px" }} />{contact.address}</p>
                            <p> <FontAwesomeIcon icon={faPhone} style={{ marginRight: "8px" }} />{contact.phone}</p>
                            <p><FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "8px" }} />{contact.email}</p>
                        </div>
                        <div className="cardButton">
                            <Link to="/demo">
                                <button className="btnCard" onClick={() => actions.editMode(contact.id)}>
                                    <FontAwesomeIcon icon={faPen} size="lg" style={{ color: "#000000" }} />
                                </button>
                            </Link>
                            <button className="btnCard" onClick={() => handleDeleteContact(contact.id)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <FontAwesomeIcon icon={faTrash} size="lg" style={{ color: "#000000" }} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Modal para eliminar contacto */}
            {contactToDelete !== null && (
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure you want to delete this contact?</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                If you delete, you will lose the contact forever.
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn coolBtn" data-bs-dismiss="modal" onClick={() => actions.sendDeleteContact(contactToDelete)}>Delete Contact</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};