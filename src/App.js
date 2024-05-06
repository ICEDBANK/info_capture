import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

function App() {

  

  // State for form data and editing mode
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
  const [records, setRecords] = useState ([]);
  const [editingId, setEditingId] = useState (null);

  const fetchStates = () => {
    // Fetch list of states from an API or import from a data file
    const fetchedStates = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    setStates(fetchedStates);
  };

  useEffect(() => {
    // Fetch list of states when component mounts
    fetchData();
    fetchStates();
  }, []);

  const fetchData = () => {

    fetch('https://api-db-a57ed-default-rtdb.firebaseio.com/users.json', {
        
      }).then(response => response.json()).then(data => {

          const loadedRecords = [];

          for(const key in data){

            loadedRecords.push({

              id:key,
              ...data[key]

            })

          }

          setRecords(loadedRecords);

      })

  }
 
  fetchData();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      alert("You are about to edit something");
      // Handle edit submission
    } else {
      // Check if the state is selected
      if (formData.state === "") {
        alert("Please select a state");
        return;
      }
      // Send form data to the server
      fetch('https://api-db-a57ed-default-rtdb.firebaseio.com/users.json', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => response.json())
      .then(data => {
        alert("Record Added Successfully");
        console.log('Form data submitted:', data);
        setFormData({
          firstname: '',
          lastname: '',
          age: '',
          city: '',
          state: '', // Reset state field
          email: '',
          phone: ''
        });
        // Fetch updated data
        fetchData();
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        alert("Error submitting form. Please try again later.");
      });
    }
  };


  // Function to handle edit button click
  const handleEdit = (record) => {
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
    alert(`You are about to delete record with id: ${id}`);
    // Handle delete operation
    fetch(`https://api-db-a57ed-default-rtdb.firebaseio.com/users/${id}.json`,{

      method: 'DELETE'

    })

    fetchData();

  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is for the phone number
    if (name === 'phone') {
      // Remove non-numeric characters from the input value
      const phoneNumber = value.replace(/\D/g, '');

      // Format the phone number with dashes
      let formattedPhoneNumber = '';
      for (let i = 0; i < phoneNumber.length; i++) {
        // Insert dash after every 3rd character except for the last group
        if (i > 0 && i % 3 === 0 && i < 9) {
          formattedPhoneNumber += '-';
        }
        formattedPhoneNumber += phoneNumber[i];
      }

      // Update the formData state with the formatted phone number
      setFormData({ ...formData, [name]: formattedPhoneNumber });
    } else {
      // For other input fields, directly update the formData state
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <h2>Info Capture</h2>
        <form onSubmit={handleSubmit}>
          {/* Input fields for form data */}
          {/* Add proper onChange handlers to update formData state */}
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
                  <FontAwesomeIcon icon={faPenSquare} className='editBtn myBtn' onClick={() => handleEdit()} />
                  <FontAwesomeIcon icon={faTrash} className='delBtn myBtn' onClick={() => handleDelete(record.id)} />
                </td>
            </tr>
            ))}
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
