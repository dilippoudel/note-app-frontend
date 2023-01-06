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
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const toogleImportanceOf = async (id) => {
    const note = notes.find((note) => note.id === id)
    const changeNote = { ...note, important: !note.important }
    try {
      await noteService.update(id, changeNote)
      let newData = await noteService.getAll()
      const newMessage = {
        ...message,
        error: `Note updated successfully`,
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
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(loggedUserJSON.token)
    }
  }, [])
  useEffect(() => {
    noteService.getAll().then((initialNotes) => setNotes(initialNotes))
  }, [])
  const notesToShowAll = showAll
    ? notes
    : notes.filter((note) => note.important === true)
  const addNote = async (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    }
    const response = await noteService.create(noteObject)
    setNotes(notes.concat(response))
    const newMessage = {
      ...message,
      success: 'Succssfully added new Note',
    }
    setMessage(newMessage)
    setTimeout(() => setMessage(null), 3000)
    setNewNote('')
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({
        username,
        password,
      })

      setUser(loggedInUser.data)
      console.log('user is ', loggedInUser)
      const newMessage = {
        ...message,
        success: `welcome back`,
      }
      setMessage(newMessage)
      setTimeout(() => setMessage(null), 3000)

      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedNoteappUser',
        JSON.stringify(loggedInUser),
      )
      noteService.setToken(user.token)
    } catch (error) {
      const newMessage = {
        ...message,
        error: 'Wrong Credential',
      }
      setMessage(newMessage)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      console.log('error in username or password')
    }
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }

  return (
    <div>
      <h1>Notes Application</h1>
      <Notification message={message} />
      {user === null ? (
        <Togglable buttonLabel="Log in">
          <LoginForm
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
          />
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
