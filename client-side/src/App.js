import {Routes, Route} from 'react-router-dom';
import Books from './Books';
import Addbooks from './Addbooks';
import Updatebooks from './Updatebooks';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Books/>} />
        <Route path="/Addbooks" element={<Addbooks/>} />
        <Route path="Books/:id" element={<Updatebooks/>} />
      </Routes>
    </div>
  );
}

export default App;
