const Note = ({ note, onClick }) => {
  const label = note.important ? 'make not important' : 'Make important'
  return (
    <li className="note">
      {note.content}
      <button onClick={onClick}>{label}</button>
    </li>
  )
}
export default Note
