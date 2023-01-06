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
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  const toogleImportanceOf = async (id) => {
    const note = notes.find((note) => note.id === id)
    const changeNote = { ...note, important: !note.important }
    try {
      await noteService.update(id, changeNote)
      let newData = await noteService.getAll()
      const newMessage = {
        ...message,
        success: `Note updated successfully`,
      }
      setMessage(newMessage)
      setTimeout(() => setMessage(null), 3000)
      setNotes(newData)
    } catch (err) {
      const newMessage = {
        ...message,
        error: `Note '${note.content}' was already deleted from server`,
      }
      setMessage(newMessage)

      setNotes(notes.filter((note) => note.id !== id))
    }
  }
  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      noteService.setToken(loggedUserJSON.token)
    }
  }, [])
  useEffect(() => {
    noteService.getAll().then((initialNotes) => setNotes(initialNotes))
  }, [])

  const notesToShowAll = showAll
    ? notes
    : notes.filter((note) => note.important === true)
  const addNote = async (noteObject) => {
    try {
      const response = await noteService.create(noteObject)
      setNotes(notes.concat(response))
      const newMessage = {
        ...message,
        success: 'Succssfully added new Note',
      }
      setMessage(newMessage)
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      const newMessage = {
        ...message,
        error: 'Note validations error',
      }
      setMessage(newMessage)
      setTimeout(() => setMessage(null), 3000)
    }
  }
  const handleLogin = async (username, password) => {
    try {
      const loggedInUser = await loginService.login({
        username,
        password,
      })

      setUser(loggedInUser)
      console.log('user is ', loggedInUser)
      window.localStorage.setItem(
        'loggedNoteappUser',
        JSON.stringify(loggedInUser),
      )
      noteService.setToken(loggedInUser.token)
      const newMessage = {
        ...message,
        success: `welcome back`,
      }

      setMessage(newMessage)
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      const newMessage = {
        ...message,
        error: 'error in username or password',
      }
      setMessage(newMessage)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      console.log('error in username or password')
    }
  }

  return (
    <div>
      <h1>Notes Application</h1>
      <Notification message={message} />
      {user === null ? (
        <Togglable buttonLabel="Log in">
          <LoginForm handleSubmit={handleLogin} />
        </Togglable>
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button
            onClick={() => {
              window.localStorage.clear()
              setUser(null)
            }}
          >
            Log Out
          </button>
          <Togglable buttonLabel="create new note">
            <NoteForm createNote={addNote} />
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
