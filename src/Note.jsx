import React from 'react'

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