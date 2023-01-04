import { useState, useEffect } from 'react'

import noteService from './services/notes'
import loginService from './services/login'
import Note from './components/Note/Note'
import Notification from './components/Notification/Notification'
import LoginForm from './components/LoginForm/LoginForm'
import NoteForm from './components/NoteForm/NoteForm'
import Togglable from './components/Togglable/Togglable'
import Footer from './components/Footer/Footer'

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const toogleImportanceOf = async (id) => {
    const note = notes.find((note) => note.id === id)
    const changeNote = { ...note, important: !note.important }
    try {
      await noteService.update(id, changeNote)
      let newData = await noteService.getAll()
      setNotes(newData)
    } catch (err) {
      setErrorMessage(`Note '${note.content}' was already deleted from server`)
      setTimeout(() => setErrorMessage(null), 3000)
      setNotes(notes.filter((note) => note.id !== id))
    }
  }
  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])
  useEffect(() => {
    noteService.getAll().then((initialNotes) => setNotes(initialNotes))
  }, [])
  const notesToShowAll = showAll
    ? notes
    : notes.filter((note) => note.important === true)
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    }
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({
        username,
        password,
      })

      setUser(loggedInUser)

      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedNoteappUser',
        JSON.stringify(loggedInUser),
      )
      noteService.setToken(user.token)
    } catch (exception) {
      setErrorMessage('wrong credential')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }

  return (
    <div>
      <h1>Notes Application</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        <Togglable buttonLabel="Log in">
          <LoginForm
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setUsername(target.value)}
            username={username}
            password={password}
          />
        </Togglable>
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="create new note">
            <NoteForm
              onSubmit={addNote}
              value={newNote}
              handleChange={handleNoteChange}
            />
          </Togglable>
        </div>
      )}
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? 'show Important' : 'show all'}
      </button>
      <ul>
        {notesToShowAll.map((note) => (
          <Note
            key={note.id}
            note={note}
            onClick={() => toogleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  )
}

export default App