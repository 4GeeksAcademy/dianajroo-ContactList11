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
        // Ejecutamos la siguiente línea para crear la agenda al ejecutar nuestra aplicación
        actions.createAgenda()
        // actions.infContact(); // Esta línea debe ejecutarse en el archivo appContext, ya que es global y así siempre tendremos acceso a los contactos en cualquier parte de nuestra aplicación.
    }, []);

    const handleDeleteContact = (contactId) => {
        setContactToDelete(contactId);
    };

    return (
        <>
            {/* Se agregó store.contacts && store.contacts.length > 0 && para no tener errores al momento de hacer el mapeo, 
        ya que al no estar condicionado la aplicación intentará renderizar los contactos aunque aún no haya recibido los datos desde la API. */}
            {store.contacts && store.contacts.length > 0 && store.contacts.map((contact) => (
                <div className="fatherCard container" key={contact.id}>
                    <div className="cardHome" >
                        <div style={{ margin: "15px", }} >
                            <img className="cardImg" src="https://tse3.mm.bing.net/th?id=OIP.SCTNqUAziGibd3sJgGwoywAAAA&pid=Api&P=0&h=180" alt="" style={{ width: '100px', height: '120px' }} />
                        </div>
                        <div className="cardInf">
                            <h4 style={{ marginTop: "10px" }}>{contact.name}</h4>
                            <p> <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: "8px", color: 'grey' }} />{contact.address}</p>
                            <p> <FontAwesomeIcon icon={faPhone} style={{ marginRight: "8px", color: 'grey' }} />{contact.phone}</p>
                            <p><FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "8px", color: 'grey' }} />{contact.email}</p>
                        </div>
                        <div className="cardButton" >
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
            {/* {contactToDelete !== null && ( */}
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
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => actions.sendDeleteContact(contactToDelete)}>Delete Contact</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* )} */}
        </>
    );
};