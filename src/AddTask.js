import Modal from "./Modal"
import {useState} from 'react'
import './addTask.css'
import {db} from './firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'


function AddTask({onClose, open}) {

  const options = [
    { label: 'Registrado', value: 'created' },
    { label: 'En Progreso', value: 'inprogress' },
    { label: 'Terminado', value: 'finished' },
  ];
  const [clientName, setClientName] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [status, setStatus] = useState('created');

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'projects'), {
        clientName: clientName,
        specialist: specialist,
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
    <Modal modalLable='Agregar Proyecto' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addTask' name='addTask'>
        <input 
          type='text' 
          name='clientName' 
          onChange={(e) => setClientName(e.target.value.toUpperCase())} 
          value={clientName}
          placeholder='Ingresar Cliente'/>
        <input 
          type='text' 
          name='specialist' 
          onChange={(e) => setSpecialist(e.target.value.toUpperCase())} 
          value={specialist}
          placeholder='Especialista a Cargo'/>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
        </select>
        <button type='submit'>Aceptar</button>
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
