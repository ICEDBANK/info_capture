import './App.css';

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
            <input type="text" name='firstname' placeholder='Enter Your First Name' />
            <input type="text" name='lastname' placeholder='Enter Your Last Name' />
            <input type="number" name='age' placeholder='Enter Your Age' />
            <input type="text" name='email' placeholder='someone@somewhere.com' />
            <input type="tel" name='phone' placeholder='Enter Your Phone Number' />
          </form>
        </div>
      </div>

    </>
  );
}

export default App;
