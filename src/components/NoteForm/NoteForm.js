import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')
  const handleChange = (e) => setNewNote(e.target.value)
  const addNote = (e) => {
    e.preventDefault()
    createNote({
      content: newNote,
      important: false,
    })
    setNewNote('')
  }
  return (
    <div className="formDiv">
      <h2>Create a Note</h2>

      <form onSubmit={addNote}>
        <input
          id="note-input"
          type="text"
          value={newNote}
          onChange={handleChange}
          placeholder="write note content here..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
export default NoteForm
