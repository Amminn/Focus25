import React from 'react'

function Note() {
  const [noteContent, setNoteContent] = React.useState('Start here')
  console.log(noteContent)

  function noteChangeHandler(e) {
    let value = e.target.value
    setNoteContent(value)
  }

  return (
    <div className='notepad-area'>
      <h3>Write your last idea to not forget</h3>
      <textarea
        value={noteContent}
        onChange={noteChangeHandler}
        className='textarea'
      />
    </div>
  )
}

export default Note