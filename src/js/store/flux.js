const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts:[],
			//Guardo en store para poder llevarlo con la navegator el contactos para editar
			editContact:null
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			infContact: async () => {
				try {
					const response = await fetch('https://playground.4geeks.com/apis/fake/contact/agenda/clisdermar')
					const data = await response.json()
					setStore({contacts: data})
				} catch (error) {
					console.error(error)
				}
			},
			addContact: async (contact)=> {

				try{
		
					const response= await fetch('https://playground.4geeks.com/apis/fake/contact/', {
						method: "POST",
						body: JSON.stringify(contact),
						headers: {
						  "Content-Type": "application/json"
						}
					 })
				   
						if(response.ok){
		
							const data = await response.json();
							console.log(data);
						   alert('Contacto agregado exitosamente');
						}
						
					
				}catch(error){
					console.error(error);
				}
			},
			sendDeleteContact: async (id) => {
				const store = getStore()
				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, { method: "DELETE" });
					if (response.ok) {
						// Eliminar el contacto del array con filter porque si no el .map se queda renderizando y da error
					const newContacts = store.contacts.filter(contact => contact.id !== id);
					    setStore({contacts: newContacts})
					 
						console.log("Contacto eliminado exitosamente");
					} else {
						console.error(`Error al eliminar el contacto: ${response.status} - ${response.statusText}`);
					}
				} catch (error) {
					console.error("Error al enviar la solicitud DELETE:", error);
				}
			},

			sendEditContact: async (editContact, id) => {
				//send http request with newFormData
				try{
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
						method: "PUT",
						body: JSON.stringify(editContact),
						headers: {
						"Content-Type": "application/json"
						}
			  		})
					const data = await response.json()
					console.log(data)
					//if response successful, empty edit obj {}
					if(response.ok){
						setStore({editContact: null})
						alert('Contacto actualizado exitosamente');
						return true
					}
					
				}	
				catch(error){
					console.error(error)
				}
			},

			editMode: (id) => {
				//get store to work with
				const store = getStore()
				//get only the contactToEdit, find returns value of first to meet condition

				const contactToEdit = store.contacts.find((contact) => {
					return contact.id === id
				})
				//modify the store accordingly, if contactToEdit filled with truth value
				if(contactToEdit){
					setStore({editContact: contactToEdit})
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
