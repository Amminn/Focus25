import React from 'react';

export default function NotePad() {
  const [textAreaContent, setTextAreaContent] = React.useState('');
  function textAreaChangeHandle(e) {
    let value = e.target.value;
    setTextAreaContent(value);
  }

  return (
    <div className='notepad-area'>
      <p>Write what you last need to not forget:</p>
      <textarea
        value={textAreaContent}
        onChange={textAreaChangeHandle}
        className='textarea'
      />
    </div>
  );
}


