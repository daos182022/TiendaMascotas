import { isEmpty, size } from 'lodash'
import React, { useState } from 'react' 
import shortid from 'shortid'


function App() {

  const [tarea, setTarea] = useState("")
  const [tareas, setTareas] = useState([])
  const [modeEdicion, setModeEdicion] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)

  const ValidarFormulario = () => {
    let EsValido = true
    setError(null)

    if(isEmpty(tarea)){
      setError("Debes ingresar una tarea.")
      EsValido = false
    } 
    return EsValido
  }

  const adicionarTarea = (e) =>{
    e.preventDefault()

    if (!ValidarFormulario()){
      return
    }

    const nuevaTarea = {
      id: shortid.generate(),
      nombre: tarea
    }
    
    setTareas([...tareas, nuevaTarea])
    setTarea("")
  }

  const salvarTarea = (e) =>{
    e.preventDefault()
    if(isEmpty(tarea)){
      console.log("Tarea vacia")
      return
    }  
     
    const tareaEditada = tareas.map(item => item.id === id ? {
      id, nombre: tarea} : item)
    setTareas(tareaEditada)  
   // setTareas([...tareas, nuevaTarea])
    setModeEdicion(false)
    setTarea("")
    setId("")
  }

  const borrarTarea = (id) => {
      const filtroTareas = tareas.filter(tarea => tarea.id !== id)
      setTareas(filtroTareas)
  }

  const editarTarea = (tareaEditable) => {
    setTarea(tareaEditable.nombre)
    setModeEdicion(true)
    setId(tareaEditable.id)
  }

  return (
    <div className="container mt-5">
      <h1>Tienda de Mascotas</h1>
      <hr/>
      <div className="row">
        <div className="col-8">         
          <h4 className="text-center">Lista de Tareas</h4>

          {
            size(tareas) == 0 ? (

              <li className="list-group-item"> Aun no hay tareas</li>

            ) : (   

              <ul className="list-group">
              {
                tareas.map((tarea) => (
                  <li className="list-group-item" key={tarea.id}>
                  <span className="lead">{tarea.nombre}</span>
                  <button 
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick = {() => borrarTarea(tarea.id) }>
                    Eliminar
                  </button>
                  <button 
                    className="btn btn-warning btn-sm float-right"
                    onClick = {() => editarTarea(tarea)}>
                    Editar
                   </button>
                  </li>
                ))  
              }
            </ul>

            )


          }

        </div>
        <div className="col-4">
          <h4 
          className="text-center">
              {modeEdicion ? "Modificar Tarea" : "Agregar Tarea"}
          </h4>
          <form onSubmit={modeEdicion ? salvarTarea : adicionarTarea}>
            <input type="text"
                    className="form-control mb-2"
                    placeholder = "Ingrese la tarea"
                    onChange = {(text) => setTarea(text.target.value)}
                    value={tarea}
            ></input>
            {
              error && <span className="text-danger">{error}</span>

            }

            <button 
              className={ modeEdicion ?  "btn btn-warning btn-block" : "btn btn-dark btn-block"}
              type="submit">
                {modeEdicion ? "Guardar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
