// Creamos la siguiente constante para la URL de la API, 
// así solo debemos cambiarla en un solo lugar si la URL cambiara por alguna razón, 
// luego simplemente para hacer los fetch concatenamos dicha constante.
const apiURL = "https://playground.4geeks.com/contact"
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
			contacts: [],
			//Guardo en store para poder llevarlo con la navegator el contactos para editar
			editContact: null,
			agenda_slug: "diana_contact"
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
				const store = getStore()
				try {
					//const response = await fetch('https://playground.4geeks.com/apis/fake/contact/agenda/diana_contact')
					const response = await fetch(`${apiURL}/agendas/${store.agenda_slug}`)
					const data = await response.json()
					setStore({ contacts: data.contacts })
				} catch (error) {
					console.error(error)
				}
			},
			// Al estar utilizando una nueva API, debemos crear la agenda con su respectivo nombre
			// antes de agregar contactos a la misma
			createAgenda: async () => {
				const store = getStore()
				try {

					// const response = await fetch('https://playground.4geeks.com/apis/fake/contact/', {
					const response = await fetch(`${apiURL}/agendas/${store.agenda_slug}`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						}
					})

					if (response.ok) {

						const data = await response.json();
						console.log(data);
						// alert('Agenda creada exitosamente');
					}


				} catch (error) {
					console.error(error);
				}
			},
			addContact: async (contact) => {
				console.log(contact);
				const store = getStore()
				const actions = getActions()
				try {

					// const response = await fetch('https://playground.4geeks.com/apis/fake/contact/', {
					const response = await fetch(`${apiURL}/agendas/${store.agenda_slug}/contacts`, {
						method: "POST",
						body: JSON.stringify(contact),
						headers: {
							"Content-Type": "application/json"
						}
					})

					if (response.ok) {

						const data = await response.json();
						console.log(data);
						actions.infContact()
						alert('Contacto agregado exitosamente');
					}


				} catch (error) {
					console.error(error);
				}
			},
			sendDeleteContact: async (id) => {
				const store = getStore()
				const actions = getActions()
				try {
					// const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, { method: "DELETE" });
					const response = await fetch(`${apiURL}/agendas/${store.agenda_slug}/contacts/${id}`, { method: "DELETE" });
					if (response.ok) {
						// Eliminar el contacto del array con filter porque si no el .map se queda renderizando y da error
						actions.infContact()
						console.log("Contacto eliminado exitosamente");
						alert('Contacto eliminado exitosamente');
					} else {
						console.error(`Error al eliminar el contacto: ${response.status} - ${response.statusText}`);
					}
				} catch (error) {
					console.error("Error al enviar la solicitud DELETE:", error);
				}
			},

			sendEditContact: async (editContact, id) => {
				//send http request with newFormData
				const store = getStore()
				const actions = getActions()
				try {
					// const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
					const response = await fetch(`${apiURL}/agendas/${store.agenda_slug}/contacts/${id}`, {
						method: "PUT",
						body: JSON.stringify(editContact),
						headers: {
							"Content-Type": "application/json"
						}
					})
					const data = await response.json()
					console.log(data)
					//if response successful, empty edit obj {}
					if (response.ok) {
						setStore({ editContact: null })
						actions.infContact()
						alert('Contacto actualizado exitosamente');
						return true
					}

				}
				catch (error) {
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
				if (contactToEdit) {
					setStore({ editContact: contactToEdit })
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