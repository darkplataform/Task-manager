import '../taskManager.css'
//import Task from './Task'
import AddTask from './AddTask'
import {useState, useEffect} from 'react'
import { doc, getDoc, collection, query, where, orderBy, onSnapshot} from "firebase/firestore"
import {db} from '../firebase'
import Task from './Task'
import {useParams} from 'react-router-dom';

function TaskManager() {

  const [openAddModal, setOpenAddModal] = useState(false)
  const [tasks, setTasks] = useState([])
  const [project, setProject] = useState({})

  const params = useParams();

  

  /* function to get all tasks from firestore in realtime */ 
  useEffect(() => {  

    const fetchProject = async () => {
      const docRef = doc(db, "projects", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setProject({
          id: docSnap.id,
          data: docSnap.data()
        })
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    fetchProject()
    
    const q = query(collection(db, 'tasks'), where('projectId','==',params.id), orderBy('created'))
    onSnapshot(q, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(document => ({
        id: document.id,
        data: document.data()
      })))
      /*querySnapshot.docs.map(doc => (
      console.log(doc.id)
      ))*/
    })
  },[params.id])

  return (
    <div className='taskManager'>
      <header>Administrador de Tareas - Proyecto : {project.data?.projectName}</header>
      <div className='taskManager__container'>
        <button 
          onClick={() => setOpenAddModal(true)}>
          Agregar Tarea +
        </button>
        {tasks.map((task) => (
          <Task
            id={task.id}
            key={task.id}
            taskName={task.data.taskName}
            instructions={task.data.instructions}
            role={task.data.role}
            address={task.data.address}
            status={task.data.status}
            created={task.data.created}
          />
        ))}
      </div>

      {openAddModal &&
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal} projectId={params.id}/>
      }

    </div>
  )
}

export default TaskManager
