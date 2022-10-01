import Modal from "../Modal"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState} from 'react'
import '../editTask.css'
import { doc, updateDoc,Timestamp } from "firebase/firestore";
import {db} from '../firebase'

function EditProject({open, onClose, toEditProjectName, toEditClientName,
  toEditStartDate, toEditEndDate, toEditSpecialist, toEditStatus, id}) {

  const options = [
    { label: 'Registrado', value: 'created' },
    { label: 'En Progreso', value: 'inprogress' },
    { label: 'Terminado', value: 'finished' },
  ];
  console.log(toEditStartDate)
  console.log(toEditEndDate)
  const [projectName, setProjectName] = useState(toEditProjectName)
  const [clientName, setClientName] = useState(toEditClientName)
  const [startDate, setStartDate] = useState(toEditStartDate?new Date(toEditStartDate?.seconds * 1000):null); 
  const [endDate, setEndDate] =useState(toEditEndDate?new Date(toEditEndDate?.seconds * 1000):null);
  const [specialist, setSpecialist] = useState(toEditSpecialist)
  const [status, setStatus] = useState(toEditStatus);

  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskDocRef = doc(db, 'projects', id)
    try{
      await updateDoc(taskDocRef, {
        projectName: projectName,
        clientName: clientName,
        startDate: Timestamp.fromDate(startDate),
        endDate: Timestamp.fromDate(endDate),
        specialist: specialist,
        status: status
      })
      onClose()
    } catch (err) {
      alert(err)
    }    
  }


  /* function to update document in firestore */

  return (
    <Modal modalLable='Actualizar Proyectos' onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className='editTask' name='updateTask'>
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
        <button type='submit'>Actualizar</button>
      </form> 
    </Modal>
  )
}

export default EditProject
