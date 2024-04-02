import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";
export const Demo = () => {
	const navigate = useNavigate()
	const { store, actions } = useContext(Context)
	const [contact, setContact] = useState({
		// full_name: store.editContact ? store.editContact.full_name : "", // En la nueva API, full_name es remplazado por name
		name: store.editContact ? store.editContact.name : "",
		address: store.editContact ? store.editContact.address : "",
		phone: store.editContact ? store.editContact.phone : "",
		email: store.editContact ? store.editContact.email : "",
		// "agenda_slug": "diana_contact" // agenda_slug ya no es necesario en el objeto
	})
	useEffect(() => {
		if (!store.editContact) {
			setContact({
				// full_name: "", // En la nueva API, full_name es remplazado por name
				name: "",
				address: "",
				phone: "",
				email: "",
				// "agenda_slug": "diana_contact" // El agenda_slug ya no es necesario en la nueva API, ya que se lo pasamos en la URL
			});
		}
	}, [store.editContact]);
	const submit = async (event) => {
		event.preventDefault()
		if (store.editContact) {
			const results = await actions.sendEditContact(contact, store.editContact.id)
			//if results finished and truth value, navigate over to main page.
			if (results) {
				navigate("/")
			}
		} else {
			actions.addContact(contact)
			navigate("/")
		}
		setContact({
			"name": "",
			"address": "",
			// "agenda_slug": "diana_contact", //El agenda_slug ya no es necesario en la nueva API, ya que se lo pasamos en la URL
			"email": "",
			// "full_name": "", // En la nueva API, full_name es remplazado por name
			"phone": ""
		})
	}
	useEffect(() => {
		console.log('El Contacto ha cambiado:', contact)
	}, [contact])
	return <div className="body">
		<form className="formu" onSubmit={submit} style={{ width: '1250px', height: '800px' }}>
			<h2><b>Add a New Contact</b></h2>
			<div className="inp">
				<label htmlFor="name">Full Name</label>
				{/* <input type="text" value={contact.full_name} onChange={(event) => setContact({ ...contact, full_name: event.target.value })} name="name" id="name" placeholder="Full Name" /> */}
				{/* En la nueva API, full_name es remplazado por name */}
				<input type="text" value={contact.name} onChange={(event) => setContact({ ...contact, name: event.target.value })} name="name" id="name" placeholder="Name" />

				<label htmlFor="email">Email</label>
				<input type="text" value={contact.email} onChange={(event) => setContact({ ...contact, email: event.target.value })} name="email" id="Email" placeholder="Email" />
				<label htmlFor="phone">Phone</label>
				<input type="text" value={contact.phone} onChange={(event) => setContact({ ...contact, phone: event.target.value })} name="phone" id="Phone" placeholder="Phone" />
				<label htmlFor="adress">Adress</label>
				<input type="text" value={contact.address} onChange={(event) => setContact({ ...contact, address: event.target.value })} name="adress" id="adress" placeholder="Enter Adress" />
				<div className="form-txt">
					<Link to=""> Terminos y Condiciones</Link>
				</div>
				<input className="btn-primary" type="submit" value="Save" />
				<Link to="/" className="back"> Or get back to Contact</Link>
			</div>
		</form>
	</div>;
};