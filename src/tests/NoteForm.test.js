import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from '../components/NoteForm/NoteForm'
import userEvent from '@testing-library/user-event'
// when the component has multi input text box
test('<NoteForm/> updates parent state and calls onSubmit', () => {
  const createNote = jest.fn()
  render(<NoteForm createNote={createNote} />)
  const input = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('Submit')
  userEvent.type(input[0], 'testing a form...')
  userEvent.click(sendButton)
  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})
// when th input has placeholder
test('<NoteForm/> updates parent state and calls onSubmit', () => {
  const createNote = jest.fn()
  render(<NoteForm createNote={createNote} />)
  const input = screen.getByPlaceholderText('write note content here...')
  const sendButton = screen.getByText('Submit')
  userEvent.type(input, 'testing a form...')
  userEvent.click(sendButton)
  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})
// when the id has been defined in any element
test('<NoteForm/> updates parent state and calls onSubmit', () => {
  const createNote = jest.fn()
  const { container } = render(<NoteForm createNote={createNote} />)
  const input = container.querySelector('#note-input')
  const sendButton = screen.getByText('Submit')
  userEvent.type(input, 'testing a form...')
  userEvent.click(sendButton)
  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})
