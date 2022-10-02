import Modal from "../Modal"
import {useState} from 'react'
import '../addTask.css'
import {db} from '../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'


function AddTask({onClose, open, projectId}) {

  const options = [
    { label: 'Registrado', value: 'created' },
    { label: 'En Progreso', value: 'inprogress' },
    { label: 'Terminado', value: 'finished' },
  ];


  const [taskName, setTaskName] = useState('')
  const [instructions, setInstructions] = useState('')
  const [role, setRole] = useState('')
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState('created');

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'tasks'), {
        projectId: projectId,
        taskName: taskName,
        instructions: instructions,
        role: role,
        address: address,
        status: status,
        created: Timestamp.now()
      })
      onClose()
    } catch (err) {
      alert(err)
    }
  }

  /* function to add new task to firestore */

  return (
    <Modal modalLable='Agregar Tarea' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addTask' name='addTask'>
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
        <button type='submit'>Grabar</button>
      </form> 
    </Modal>
  )
}

/**
 * <textarea 
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter task decription'
          value={description}></textarea>
 */

export default AddTask
