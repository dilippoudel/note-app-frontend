const NoteForm = ({ onSubmit, handleChange, value }) => {
  return (
    <div>
      <h2>Create a Note</h2>
      <form onSubmit={onSubmit}>
        <input type="text" value={value} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
export default NoteForm
