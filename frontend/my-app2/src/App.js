import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [filteredResponse, setFilteredResponse] = useState({});
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState('');

  const handleJsonSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        setError('Invalid JSON format: "data" must be an array');
        return;
      }

      const response = await axios.post('http://localhost:5000/bfhl', parsedInput);
      setFilteredResponse(response.data);
      setDropdownOptions(['Alphabets', 'Numbers', 'Highest lowercase alphabet', 'All']);
      setError('');
    } catch (err) {
      setError('Invalid JSON format: ' + err.message);
    }
  };

  const handleDropdownChange = (option) => {
    setSelectedOption(option);
  };

  const renderFilteredResponse = () => {
    switch (selectedOption) {
      case 'Numbers':
        return <p>Numbers: {filteredResponse.numbers?.join(', ')}</p>;
      case 'Alphabets':
        return <p>Alphabets: {filteredResponse.alphabets?.join(', ')}</p>;
      case 'Highest lowercase alphabet':
        return <p>Highest Lowercase Alphabet: {filteredResponse.highest_lowercase_alphabet?.join(', ')}</p>;
      case 'All':
        return (
          <div>
            <p>Numbers: {filteredResponse.numbers?.join(', ')}</p>
            <p>Alphabets: {filteredResponse.alphabets?.join(', ')}</p>
            <p>Highest Lowercase Alphabet: {filteredResponse.highest_lowercase_alphabet?.join(', ')}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="input-section">
        <textarea
          className="json-input"
          rows="4"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON input'
        />
        <button className="submit-button" onClick={handleJsonSubmit}>Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {dropdownOptions.length > 0 && (
        <div className="filter-section">
          <select onChange={(e) => handleDropdownChange(e.target.value)} className="dropdown">
            <option value="">Select Filter</option>
            {dropdownOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      )}

      {Object.keys(filteredResponse).length > 0 && (
        <div className="response-section">
          <h3>Filtered Response:</h3>
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
