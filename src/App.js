import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

function App() {
  // State for form data and editing mode
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    age: 0,
    city: '',
    state: '',
    email: '',
    phone: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted');

    if (isEditing) {
      alert("You are about to edit something");
      // Handle edit submission
    } else {
      alert("Record Added");
      // Handle add submission
    }
  };

  // Function to handle edit button click
  const handleEdit = (id) => {
    alert(`You are about to edit record with id: ${id}`);
    // Set editing mode and populate form data for editing
    setIsEditing(true);
  };

  // Function to handle delete button click
  const handleDelete = (id) => {
    alert(`You are about to delete record with id: ${id}`);
    // Handle delete operation
  };

  return (
    <div className="App">
      <div className="form-container">
        <h2>Info Capture</h2>
        <form onSubmit={handleSubmit}>
          {/* Input fields for form data */}
          {/* Add proper onChange handlers to update formData state */}
          <input type="text" name='firstname' placeholder='Enter Your First Name' required />
          <input type="text" name='lastname' placeholder='Enter Your Last Name' required />
          <input type="number" name='age' placeholder='Enter Your Age' required />
          <input type="text" name='city' placeholder='Enter Your city' required />
          <input type="text" name='state' placeholder='Enter Your State' required />
          <input type="email" name='email' placeholder='someone@somewhere.com' required />
          <input type="tel" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder='example: 123-456-7890' required />
          {/* Conditionally render button based on editing mode */}
          {isEditing ? (<button className='updateBtn'>Update Record</button>) : (<button className='addBtn'>Add Record</button>)}
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
            {/* Example table row, replace with data from state or API */}
            <tr>
              <td>Joshua</td>
              <td>Rice</td>
              <td>36</td>
              <td>Birdsboro</td>
              <td>Pennsylvania</td>
              <td>j.e.rice4101@gmail.com</td>
              <td>717-271-4458</td>
              {/* Edit and delete buttons */}
              <td>
                <FontAwesomeIcon icon={faPenSquare} className='editBtn myBtn' onClick={() => handleEdit(record.id)} />
                <FontAwesomeIcon icon={faTrash} className='delBtn myBtn' onClick={() => handleDelete(record.id)} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="footer">
        <p><span>&copy; {new Date().getFullYear()} InfoCapture. All Rights Reserved</span></p>
      </div>
    </div>
  );
}

export default App;
