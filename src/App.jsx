import { useContext } from 'react';
import { NoteContext } from './context/NoteContext';
import Note from './components/Note';
import AddNoteButton from './components/AddNoteButton';
import SavingLoader from './components/SavingLoader';

function App() {
  const { notes, isSaving } = useContext(NoteContext);

  return (
    <div>
      <AddNoteButton />
      {notes.length > 0 &&
        notes.map((note) => <Note key={note.id} note={note} />)}
      {isSaving && (
        <div className='spinning-loader'>
          <SavingLoader />
        </div>
      )}
    </div>
  );
}

export default App;
