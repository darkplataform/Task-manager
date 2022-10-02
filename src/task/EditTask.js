import Modal from "../Modal"
import {useState} from 'react'
import '../editTask.css'
import { doc, updateDoc } from "firebase/firestore";
import {db} from '../firebase'

function EditTask({open, onClose, toEditTaskName, toEditInstructions,
  toEditRole, toEditAddress, toEditStatus, id}) {

  const options = [
    { label: 'Registrado', value: 'created' },
    { label: 'En Progreso', value: 'inprogress' },
    { label: 'Terminado', value: 'finished' },
  ];

  const [taskName, setTaskName] = useState(toEditTaskName)
  const [instructions, setInstructions] = useState(toEditInstructions)
  const [role, setRole] = useState(toEditRole)
  const [address, setAddress] = useState(toEditAddress)
  const [status, setStatus] = useState(toEditStatus);

  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskDocRef = doc(db, 'tasks', id)
    try{
      await updateDoc(taskDocRef, {
        taskName: taskName,
        instructions: instructions,
        role: role,
        address: address,
        status: status
      })
      onClose()
    } catch (err) {
      alert(err)
    }    
  }


  /* function to update document in firestore */

  return (
    <Modal modalLable='Actualizar Tarea' onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className='editTask' name='updateTask'>
      <input 
          type='text' 
          name='taskName' 
          onChange={(e) => setTaskName(e.target.value.toUpperCase())} 
          value={taskName}
          placeholder='Ingresar Nombre de Tarea'/>
      <textarea 
          onChange={(e) => setInstructions(e.target.value)}
          placeholder='Ingresar Instrucciones'
          value={instructions}></textarea>
        <input 
          type='text' 
          name='role' 
          onChange={(e) => setRole(e.target.value.toUpperCase())} 
          value={role}
          placeholder='Ingresar Rol'/>
        <input 
          type='text' 
          name='address' 
          onChange={(e) => setAddress(e.target.value.toUpperCase())} 
          value={address}
          placeholder='Ingresar Direccion'/> 
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
        </select>        
        <button type='submit'>Actualizar</button>
      </form> 
    </Modal>
  )
}

export default EditTask
