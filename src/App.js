// Importing necessary CSS and FontAwesome icons
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
// Importing useEffect and useState hooks from React
import { useEffect, useState } from 'react';

// Define the functional component App
function App() {
  // State variables to store form data, editing mode, states list, and user records
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    age: '',
    city: '',
    state: '',
    email: '',
    phone: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [states, setStates] = useState([]); // State variable to store list of states
  const [records, setRecords] = useState ([]); // State variable to store user records
  const [editingId, setEditingId] = useState (null); // State variable to store the ID of the record being edited
  const [notification, setNotification] = useState('');

  // Function to fetch list of states from an API or data file
  const fetchStates = () => {
    // Hardcoded list of states
    const fetchedStates = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    setStates(fetchedStates);
  };

  // useEffect to fetch user records when component mounts
  useEffect(() => {
    fetchData();
    fetchStates();
  }, []);

  // Function to fetch user records from the database
  const fetchData = () => {
    fetch('https://api-db-a57ed-default-rtdb.firebaseio.com/users.json', {
        
      }).then(response => response.json()).then(data => {

          const loadedRecords = [];

          // Loop through the fetched data and format it into an array of records
          for(const key in data){
            loadedRecords.push({
              id:key,
              ...data[key]
            })
          }

          // Update the records state with the fetched records
          setRecords(loadedRecords);
      })
  } 

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing record
      fetch(`https://api-db-a57ed-default-rtdb.firebaseio.com/users/${editingId}.json`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        if (!response.ok) {
          throw new Error('Failed to update record');
        }
        return response.json();
      }).then(() => {
        // Reset form and fetch updated records
        setIsEditing(false);
        setEditingId(null);
        setFormData({
          firstname: '',
          lastname: '',
          age: '',
          city: '',
          state: '',
          email: '',
          phone: ''
        });
        fetchData();
      }).catch(error => {
        console.error('Error updating record:', error);
        alert("Error updating record. Please try again later.");
      });
    } else {
      // Handle adding a new record
    }
  };

  // Function to handle edit button click
  const handleEdit = (record) => {
    // Set form data with the values of the record being edited
    setFormData({
      firstname: record.firstname,
      lastname: record.lastname,
      age: record.age,
      city: record.city,
      state: record.state,
      email: record.email,
      phone: record.phone
    });
    setIsEditing(true);
    setEditingId(record.id);
  };

  // Function to handle delete button click
  const handleDelete = (id) => {
    // Confirm deletion with user
    alert(`You are about to delete record with id: ${id}`);
    // Handle record deletion
    fetch(`https://api-db-a57ed-default-rtdb.firebaseio.com/users/${id}.json`,{
      method: 'DELETE'
    })
    // Fetch updated records after deletion
    fetchData();
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Check if the input is for the phone number
    if (name === 'phone') {
      // Remove non-numeric characters from the input value and format with dashes
      const phoneNumber = value.replace(/\D/g, '');
      let formattedPhoneNumber = '';
      for (let i = 0; i < phoneNumber.length; i++) {
        if (i > 0 && i % 3 === 0 && i < 9) {
          formattedPhoneNumber += '-';
        }
        formattedPhoneNumber += phoneNumber[i];
      }
      // Update form data state with the formatted phone number
      setFormData({ ...formData, [name]: formattedPhoneNumber });
    } else {
      // Update form data state with other input fields
      setFormData({ ...formData, [name]: value });
    }
  };

  // JSX markup
  return (
    <div className="App">
      {/* Form container */}
      <div className="form-container">
        <h2>Info Capture</h2>
        <form onSubmit={handleSubmit}>
          {/* Input fields for form data */}
          {/* Add onChange handlers to update formData state */}
          <input 
            type="text" 
            name='firstname' 
            value={formData.firstname}
            onChange={handleInputChange}
            placeholder='Enter Your First Name' 
            required />
          <input 
            type="text" 
            name='lastname' 
            value={formData.lastname}
            onChange={handleInputChange}
            placeholder='Enter Your Last Name' 
            required />
          <input 
            type="number" 
            name='age' 
            value={formData.age}
            onChange={handleInputChange}
            placeholder='Enter Your Age' 
            required />
          <input 
            type="text" 
            name='city' 
            value={formData.city}
            onChange={handleInputChange}
            placeholder='Enter Your city' 
            required />
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select Your State --</option>
            {/* Dynamically generate options for states */}
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          <input 
            type="email" 
            name='email' 
            value={formData.email}
            onChange={handleInputChange}
            placeholder='someone@somewhere.com' 
            required />
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone}
            onChange={handleInputChange}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
            placeholder='example: 123-456-7890' 
            required />
          {/* Conditionally render button based on editing mode */}
          {isEditing ? (
            <button className='updateBtn'type='submit'>Update Record</button>
          ) : (
            <button className='addBtn'type='submit'>Add Record</button>
          )}
        </form>
      </div>
      {/* Table container */}
      <div className="table-container">
        <h2>User Data</h2>
        <h4>{}</h4>
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
            {/* Map through records array to display each user's data */}
            {records.map(record => (
              <tr key={record.id}>
                <td>{record.firstname}</td>
                <td>{record.lastname}</td>
                <td>{record.age}</td>
                <td>{record.city}</td>
                <td>{record.state}</td>
                <td>{record.email}</td>
                <td>{record.phone}</td>
                {/* Edit and delete buttons */}
                <td>
                  <FontAwesomeIcon icon={faPenSquare} className='editBtn myBtn' onClick={() => handleEdit(record)} />
                  <FontAwesomeIcon icon={faTrash} className='delBtn myBtn' onClick={() => handleDelete(record.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <div className="footer">
        <p><span>&copy; {new Date().getFullYear()} InfoCapture. All Rights Reserved</span></p>
      </div>
    </div>
  );
}

// Export the App component
export default App;
