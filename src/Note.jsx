import React from 'react'
import 'boxicons'
import { useTranslation, Trans } from 'react-i18next';

function Note({textRef}) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language
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
    textRef.current.focus()
  }

  return (
    <div className={`notepad-area ${currentLanguage === 'ar' ? 'ar' : ''}`} >
      <h3>{t('note.title')}</h3>
      {/* <h3>Write your last idea to not forget</h3> */}
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
          placeholder={t('note.placeholder')}
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