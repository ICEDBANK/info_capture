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
          </form>
        </div>
      </div>

    </>
  );
}

export default App;
