import Modal from "../Modal"
import {useState} from 'react'
import '../addTask.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {db} from '../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'


function AddProject({onClose, open}) {

  const options = [
    { label: 'Registrado', value: 'created' },
    { label: 'En Progreso', value: 'inprogress' },
    { label: 'Terminado', value: 'finished' },
  ];
  const [projectName, setProjectName] = useState('')
  const [clientName, setClientName] = useState('')
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [specialist, setSpecialist] = useState('')
  const [status, setStatus] = useState('created');

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'projects'), {
        projectName: projectName,
        clientName: clientName,
        startDate: Timestamp.fromDate(startDate),
        endDate: Timestamp.fromDate(endDate),
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
          name='projectName' 
          onChange={(e) => setProjectName(e.target.value.toUpperCase())} 
          value={projectName}
          placeholder='Ingresar Nombre de Proyecto'/>
        <input 
          type='text' 
          name='clientName' 
          onChange={(e) => setClientName(e.target.value.toUpperCase())} 
          value={clientName}
          placeholder='Ingresar Cliente'/>
        <p>Fecha de Inicio</p>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <p>Fecha de Fin</p>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
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

export default AddProject
