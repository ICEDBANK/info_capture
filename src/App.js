import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

function App() {

const handleSubmit = () => {

  console.log('Form Submitted');

};

  return (
    <>

      <div className="App">
        <div className="form-container">
          <div>
            <h2>Info Capture</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="text" name='firstname' placeholder='Enter Your First Name' required />
            <input type="text" name='lastname' placeholder='Enter Your Last Name' required />
            <input type="number" name='age' placeholder='Enter Your Age' required />
            <input type="text" name='city' placeholder='Enter Your city' required />
            <input type="text" name='state' placeholder='Enter Your State' required />
            <input type="text" name='email' placeholder='someone@somewhere.com' required />
            <input type="tel" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder='example: 123-456-7890' required />
            <button className='addBtn'>Add Record</button>
            <button className='updateBtn'>Update Record</button>
          </form>
        </div>
        <div className="table-container">
        <h2>User Data</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>City</th>
              <th>State</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Joshua</td>
              <td>Rice</td>
              <td>36</td>
              <td>Birdsboro</td>
              <td>Pennsylvania</td>
              <td>j.e.rice4101@gmail.com</td>
              <td>717-271-4458</td>
              <td>
              <FontAwesomeIcon icon={faPenToSquare} className='editBtn myBtn'/>
              <FontAwesomeIcon icon={faTrash} className='delBtn myBtn'/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="footer">
        
      </div>
      </div>
    </>
  );
}

export default App;
