import '../task.css'
import {useState} from 'react'
import ProjectItem from './ProjectItem'
import EditProject from './EditProject'
import { doc, deleteDoc} from "firebase/firestore";
import {db} from '../firebase'

function Project({id, projectName, clientName, startDate,
  endDate, specialist, status, created}) {

  const [checked, setChecked] = useState(status!=="")
  const [open, setOpen] = useState({edit:false, view:false})

  const handleClose = () => {
    setOpen({edit:false, view:false})
  }
  
   /* function to update document in firestore */
   
   /* function to delete a document from firstore */ 
  const handleDelete = async () => {
    const taskDocRef = doc(db, 'projects', id)
    try{
      await deleteDoc(taskDocRef)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div className={`task ${checked && 'task--borderColor'}`}>
      <div>
        <input 
          id={`checkbox-${id}`} 
          className='checkbox-custom'
          name="checkbox" 
          checked={checked} 
          type="checkbox" />
        <label 
          htmlFor={`checkbox-${id}`} 
          className="checkbox-custom-label" 
          onClick={() => setChecked(!checked)} ></label>
      </div>
      <div className='task__body'>
        <h1>{projectName}</h1>
        <h2>{clientName}</h2>
        <h3>Especialista:{specialist}</h3>
        <h4>{status}</h4>
        <p>Fecha Registro: {created? new Date(created?.seconds * 1000).toLocaleDateString("en-US"):""}</p>
        <div className='task__buttons'>
          <div className='task__deleteNedit'>
            <button 
              className='task__editButton' 
              onClick={() => setOpen({...open, edit: true})}>
              Actualizar
            </button>
            <button className='task__deleteButton' onClick={handleDelete} >Eliminar</button>
          </div>
          <button 
            onClick={() => setOpen({...open, view: true})}>
            Ver
          </button>
        </div>
      </div>

      {open.view &&
        <ProjectItem 
          onClose={handleClose} 
          title={clientName} 
          description={specialist} 
          open={open.view} />
      }

      {open.edit &&
        <EditProject 
          onClose={handleClose} 
          toEditProjectName={projectName} 
          toEditClientName={clientName}
          toEditStartDate={startDate}
          toEditEndDate={endDate}
          toEditSpecialist={specialist}
          toEditStatus={status}
          open={open.edit}
          id={id} />
      }

    </div>
  )
}

export default Project