import React from 'react'
import 'boxicons'

function Note() {
  const [noteContent, setNoteContent] = React.useState('')
  const [trashActive, setTrashActive] = React.useState(false)

  function noteChangeHandler(e) {
    let value = e.target.value
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
    console.log('i did clear')
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
          {/* <img src={deleteIcon} alt="" /> */}
          <box-icon name='trash' color='#ff6933' size='24px' />
        </button>
        <textarea
          placeholder='Boost Your Productivity now...'
          value={noteContent}
          onChange={noteChangeHandler}
          className='textarea'
        />
      </div>
    </div>
  )
}

export default Note