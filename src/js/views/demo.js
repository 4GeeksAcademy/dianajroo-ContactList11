import React, { useState, useEffect, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Demo = () => {
	const navigate = useNavigate()
	const {store, actions} = useContext(Context)
	

	const [contact, setContact] = useState({
		full_name: store.editContact ? store.editContact.full_name : "",
		address: store.editContact ? store.editContact.address : "",
		phone: store.editContact ? store.editContact.phone: "" ,
		email: store.editContact ? store.editContact.email: "" ,
		"agenda_slug": "clisdermar"

	})
    useEffect(() => {
        if (!store.editContact) {
            setContact({
                full_name: "",
                address: "",
                phone: "",
                email: "",
                "agenda_slug": "clisdermar"
            });
        }
    }, [store.editContact]);

	const submit = async (event)=>{
		event.preventDefault()
		if(store.editContact){
			const results = await actions.sendEditContact(contact, store.editContact.id)

			  //if results finished and truth value, navigate over to main page.
			  if(results){
                navigate("/")
            }
		} else {
			
			actions.addContact(contact)
			
			
		}
		setContact({
			"address": "",
			"agenda_slug": "clisdermar",
			"email": "",
			"full_name": "",
			"phone": ""
	
		})
	   
	}
	
	useEffect(()=>{
      console.log('El Contacto ha cambiado:', contact)
	 
	},[contact])
	
	

	return <div className="body">
              
		
			  
			  <form className="formu" onSubmit={submit}>
				 <h2>Add a New Contact</h2> 

				 <div className="inp">
					 <laber for = "name">Full Name</laber>
					 <input type="text"  value={contact.full_name} onChange={(event)=> setContact({...contact, full_name: event.target.value })} name="name" id="name" placeholder="Full Name"/>

					 <laber for = "email">Email</laber>
					 <input type="text" value={contact.email} onChange={(event)=> setContact({...contact, email: event.target.value })} name="email" id="Email" placeholder="Email"/>

					 <laber for = "phone">Phone</laber>
					 <input type="text" value={contact.phone} onChange={(event)=> setContact({...contact, phone: event.target.value })} name="phone" id="Phone" placeholder="Phone"/>
					 
					 <laber for = "adress">Adress</laber>
					 <input type="text" value={contact.address} onChange={(event)=> setContact({...contact, address: event.target.value })} name="adress" id="adress" placeholder="Enter Adress"/>

					 <div className="form-txt">
						<Link to=""> Terminos y Condiciones</Link>                 
					 </div>
					 
					   <input class="btn" type="submit" value = "Save"/>
					   <Link to="/" className="back"> Or get back to Contact</Link>  
				  
				 </div>


			  </form>
			
			


	</div>;
};