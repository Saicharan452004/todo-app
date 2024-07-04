import './index.css'

const TodoItem = props => {
  const {
    todoDetails,
    deletefunction,
    completefunction,
    startEditing,
    stopEditing,
    onEditChange,
    saveEdit,
    editingTodoId,
    editingTodoText,
  } = props
  const {id, todo, isCompleted} = todoDetails
  const getImage = () => {
    if (isCompleted) {
      return (
        <button className='button-checkbox' onClick={onClickComplete}>
          <img
            src='https://th.bing.com/th/id/OIP.w5SDYQCwdIy8ru5kTlaeqAHaHa?w=194&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7'
            className='checkbox-image'
          />
        </button>
      )
    } else {
      return (
        <button className='button-checkbox' onClick={onClickComplete}></button>
      )
    }
  }
  const onClickDelete = () => {
    deletefunction(id)
  }
  const onClickComplete = () => {
    completefunction(id)
  }
  return (
    <li className='list'>
      {editingTodoId === id ? (
        <div>
          <input
            type='text'
            value={editingTodoText}
            onChange={onEditChange}
            className='input'
          />
          <button onClick={() => saveEdit(id)} className='button-save'>
            Save
          </button>
          <button onClick={stopEditing} className='button-save'>
            Cancel
          </button>
        </div>
      ) : (
        <div className='todo-item-container'>
          <p className='todo-description'>{todo}</p>
          <div className='button-container'>
            <button
              className='button-edit'
              onClick={() => startEditing(id, todo)}
            >
              Edit
            </button>
            {getImage()}
            <button className='button-delete' onClick={onClickDelete}>
              <img
                src='https://assets.ccbp.in/frontend/react-js/delete-img.png'
                className='delete-image'
              />
            </button>
          </div>
        </div>
      )}
    </li>
  )
}
export default TodoItem
