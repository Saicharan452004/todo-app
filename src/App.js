import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TodoItem from './Components/todoItem'
import './App.css'

class App extends Component {
  state = {
    todoList: [],
    todo: '',
    editingTodoId: null,
    editingTodoText: '',
    toggleComplete: false,
  }
  onchangeEvent = event => {
    this.setState({todo: event.target.value})
  }
  componentDidMount() {
    const savedTodos = localStorage.getItem('todoList')
    if (savedTodos) {
      this.setState({todoList: JSON.parse(savedTodos)})
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.todoList !== this.state.todoList) {
      localStorage.setItem('todoList', JSON.stringify(this.state.todoList))
    }
  }
  onAddTodo = event => {
    event.preventDefault()
    const {todo} = this.state
    const newTodo = {
      id: uuidv4(),
      todo,
      isCompleted: false,
    }
    this.setState(prevState => ({
      todoList: [...prevState.todoList, newTodo],
      todo: '',
    }))
  }
  deletefunction = id => {
    const {todoList} = this.state
    const filteredlists = todoList.filter(eachItem => eachItem.id !== id)
    this.setState({todoList: filteredlists})
  }
  completefunction = id => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isCompleted: !eachItem.isCompleted}
        }
        return eachItem
      }),
    }))
  }
  startEditing = (id, todo) => {
    this.setState({editingTodoId: id, editingTodoText: todo})
  }

  stopEditing = () => {
    this.setState({editingTodoId: null, editingTodoText: ''})
  }

  onEditChange = event => {
    this.setState({editingTodoText: event.target.value})
  }

  saveEdit = id => {
    const {editingTodoText} = this.state
    this.setState(prevState => ({
      todoList: prevState.todoList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, todo: editingTodoText}
        }
        return eachItem
      }),
      editingTodoId: null,
      editingTodoText: '',
    }))
  }

  onClickCompleted = () => {
    this.setState(prevState => ({toggleComplete: !prevState.toggleComplete}))
  }

  filteredResult = () => {
    let completedList
    const {toggleComplete} = this.state
    const {todoList} = this.state
    if (toggleComplete === true) {
      completedList = todoList.filter(eachItem => eachItem.isCompleted === true)
    } else {
      completedList = todoList
    }
    return completedList
  }

  render() {
    const {todo,editingTodoId, editingTodoText} = this.state
    const completedArrays = this.filteredResult()
    return (
      <div className='bg-container'>
        <h1 className='main-heading'>Simple Todo application</h1>
        <div className='card-container'>
          <h1 className='heading'>Add Todo</h1>
          <div className='top-container'>
            <form onSubmit={this.onAddTodo} className='form-container'>
              <label className='label' htmlFor='label-id'>
                TODO
              </label>
              <input
                type='text'
                className='input-container'
                placeholder='Add a Todo'
                onChange={this.onchangeEvent}
                value={todo}
              />
              <button type='submit' className='button'>
                Enter
              </button>
            </form>
            <div className='image-container'>
              <img
                src='data:image/png;base64,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'
                className='image' alt="1"
              />
            </div>
          </div>
          <hr className='line' />
          <div className='footer'>
            <p className='footer-description'>My Todos</p>
            <button className='footer-button' onClick={this.onClickCompleted}>
              Completed
            </button>
          </div>
          <ul className='list-container'>
            {completedArrays.map(eachItem => (
              <TodoItem
                todoDetails={eachItem}
                deletefunction={this.deletefunction}
                completefunction={this.completefunction}
                startEditing={this.startEditing}
                stopEditing={this.stopEditing}
                onEditChange={this.onEditChange}
                saveEdit={this.saveEdit}
                editingTodoId={editingTodoId}
                editingTodoText={editingTodoText}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
