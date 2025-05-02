import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {


	let [todos, setTodos] = useState([]);

	let [texto, setTexto] = useState("");


	let maximoTareas = 5;
	let nombreUsuarioAPI = 'pedrogomez'

	const agregar = (e) => {
		//verifica si la tecla es enter
		if (e.key == "Enter") {
			//valida si hay info en el input
			if (texto == "") {
				return;
			}
			//limite de tareas
			if (todos.length < maximoTareas) {
				
				fetch('https://playground.4geeks.com/todo/todos/' + nombreUsuarioAPI, {
					method: "POST",
					body: JSON.stringify({
						label: texto,
						is_done: false
					  }),
					headers: {
						"Content-Type": "application/json"
					}
				})
				.then(resp => {
					//console.log(resp.ok); // Será true si la respuesta es exitosa
					//console.log(resp.status); // El código de estado 201, 300, 400, etc.
					return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
				})
				.then(data => {
					// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
					//console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
					
					console.log(data);
					setTodos([...todos,data]);//spread
		
				})
				.catch(error => {
					// Manejo de errores
					console.log(error);
				});

			} else {
				alert('solo puedes agregar maximo ' + maximoTareas + ' elementos');
			}
			//limpiar form
			setTexto("");

		}
	}
	const obtenerTareas = () => {

		fetch('https://playground.4geeks.com/todo/users/' + nombreUsuarioAPI, {
			method: "GET"
		})
		.then(resp => {
			//console.log(resp.ok); // Será true si la respuesta es exitosa
			//console.log(resp.status); // El código de estado 201, 300, 400, etc.
			return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
		})
		.then(data => {
			// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
			//console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
			
			let todosapi = [];
			data.todos.map((item)=>{
				console.log(item);
				todosapi.push(item);
			});
			
			setTodos(todosapi);


		})
		.catch(error => {
			// Manejo de errores
			console.log(error);
		});

	}

	const cambioTexto = (e) => {
		setTexto(e.target.value);
	}

	const eliminarTarea = (paramId) => {

		console.log(paramId);

		fetch('https://playground.4geeks.com/todo/todos/' + paramId , {
			method: "DELETE"
		})
		.then(resp => {
			//console.log(resp.ok); // Será true si la respuesta es exitosa
			console.log(resp);
			//console.log(resp.status); // El código de estado 201, 300, 400, etc.
			return resp;
		})
		.then(data => {
			
			console.log(data);
			let elementos = todos.filter((item) => item.id !== paramId);
			setTodos(elementos);

		})
		.catch(error => {
			// Manejo de errores
			console.log(error);
		});

		
	}


	useEffect(()=>{
		obtenerTareas();
	},[]);

	return (
		<div className="row justify-content-center">
			<div className="col-md-6 col-xl-6 col-sm-12">
				<h1 className="text-center">Todos</h1>
				<ul className="list-group mt-4">
					<li className="list-group-item">
						<input type="text"
							className="form-control"
							placeholder="Ingrese una tarea"
							value={texto}
							onChange={cambioTexto}
							onKeyDown={agregar} />
					</li>
					{
						todos.map((item, index) => (
							<li className="list-group-item tarea" key={item.id}>
								{item.label}
								<span className="float-end btnEliminar d-none" onClick={() => eliminarTarea(item.id)}>X</span>
							</li>
						))
					}
					<li className="list-group-item text-muted">Total tareas {todos.length}</li>

				</ul>
			</div>

		</div>
	);
};

export default Home;