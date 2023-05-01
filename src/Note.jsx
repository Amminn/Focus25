import React from 'react'
import deleteIcon from './assets/outline-delete-forever.svg'

function Note() {
  const [noteContent, setNoteContent] = React.useState('Start here')

  function noteChangeHandler(e) {
    let value = e.target.value
    setNoteContent(value)
    localStorage.setItem('noteContent', value);
  }

  React.useEffect(() => {
    const savedNoteContent = localStorage.getItem('noteContent');
    if (savedNoteContent) {
      setNoteContent(savedNoteContent); // Set note content from local storage on initial render
    }
  }, [])

  function clear() {
    setNoteContent('')
    localStorage.setItem('noteContent', '');
  }

  return (
    <div className='notepad-area'>
      <h3>Write your last idea to not forget</h3>
      <div className="textarea-wrapper">
        <a className='delete' onClick={clear}>
          <img src={deleteIcon} alt="" />
        </a>
        <textarea
          placeholder='Notes...'
          value={noteContent}
          onChange={noteChangeHandler}
          className='textarea'
        />
      </div>
    </div>
  )
}

export default Note