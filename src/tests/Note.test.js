import React from 'react'
import Note from '../components/Note/Note'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('Renders content', () => {
  const note = {
    content: 'Component testing is done with react testing library',
    important: true,
  }
  render(<Note note={note} />)
  // const div = container.querySelector('.note')
  const element = screen.getByText(
    'Component testing is done with react testing library',
  )
  expect(element).toBeDefined()
})
test('renders content', async () => {
  const note = {
    content: 'Does not work anymore :(',
    important: true,
  }

  render(<Note note={note} />)

  const element = await screen.findByText('Does not work anymore :', {
    exact: false,
  })

  expect(element).toBeDefined()
})
test('does not render this', () => {
  const note = {
    content: 'This is a reminder',
    important: true,
  }

  render(<Note note={note} />)

  const element = screen.queryByText('do not want this thing to be rendered')
  expect(element).toBeNull()
})
test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }
  const mockHandler = jest.fn()
  render(<Note note={note} onClick={mockHandler} />)
  userEvent.click(screen.getByText('make not important'))
  expect(mockHandler.mock.calls).toHaveLength(1)
})
