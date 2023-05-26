import React from 'react'
import 'boxicons'

function Note({textRef}) {
  const [noteContent, setNoteContent] = React.useState('')
  const [trashActive, setTrashActive] = React.useState(false)

  React.useEffect(() => {
    if (textRef.current) {
      textRef.current.focus()
    }
  }, [textRef])

  function noteChangeHandler(e) {
    let value = e.target.value.trimStart()
    setNoteContent(value)
    localStorage.setItem('noteContent', value);
    if (value === '') {
      setTrashActive(false)
    } else {
      setTrashActive(true)
    }
  }

  React.useEffect(() => {
    const savedNoteContent = localStorage.getItem('noteContent');
    if (savedNoteContent) {
      setNoteContent(savedNoteContent); // Set note content from local storage on initial render
      setTrashActive(true)
    }
  }, [])

  function clear() {
    setNoteContent('')
    localStorage.setItem('noteContent', '');
    setTrashActive(false)
  }

  return (
    <div className='notepad-area'>
      <h3>Write your last idea to not forget</h3>
      <div
        className={`textarea-wrapper ${trashActive ? 'active' : ''}`}
      >
        <button
          disabled={!trashActive}
          className='delete'
          onClick={clear}
        >
        <box-icon name='trash' color='#ff6933' size='24px' />
        </button>
        <textarea
          placeholder='Boost Your Productivity now...'
          value={noteContent}
          onChange={noteChangeHandler}
          className='textarea'
          ref={textRef}
        />
      </div>
    </div>
  )
}

export default Note