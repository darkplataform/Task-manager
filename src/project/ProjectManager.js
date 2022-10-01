import '../taskManager.css'
//import Task from './Task'
import AddProject from './AddProject'
import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from '../firebase'
import Project from './Project'

function ProjectManager() {

  const [openAddModal, setOpenAddModal] = useState(false)
  const [tasks, setTasks] = useState([])

  /* function to get all tasks from firestore in realtime */ 
  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
      /*querySnapshot.docs.map(doc => (
      console.log(doc.id)
      ))*/
    })
  },[])

  return (
    <div className='taskManager'>
      <header>Administrador de Proyectos</header>
      <div className='taskManager__container'>
        <button 
          onClick={() => setOpenAddModal(true)}>
          Agregar Proyecto +
        </button>
        {tasks.map((task) => (
          <Project
            id={task.id}
            key={task.id}
            projectName={task.data.projectName}
            clientName={task.data.clientName}
            startDate={task.data.startDate}
            endDate={task.data.endDate}
            specialist={task.data.specialist} 
            status={task.data.status}
            created={task.data.created}
          />
        ))}
      </div>

      {openAddModal &&
        <AddProject onClose={() => setOpenAddModal(false)} open={openAddModal}/>
      }

    </div>
  )
}

export default ProjectManager
