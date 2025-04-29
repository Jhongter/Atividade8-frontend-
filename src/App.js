import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [apiData, setApiData] = useState({ 
    date: '', 
    status: '',
    datePart: '',
    timePart: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'https://api-render-kyag.onrender.com';

  const fetchDateTime = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      // Extrai a parte da data e hora separadamente
      const [datePart, timePart] = response.data.date.split(', ');
      setApiData({
        ...response.data,
        datePart,
        timePart
      });
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDateTime();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Consulta de Data e Hora</h1>
        
        <button onClick={fetchDateTime} disabled={loading}>
          {loading ? 'Carregando...' : 'Atualizar Data/Hora'}
        </button>

        {error && <p className="error">Erro: {error}</p>}

        {!loading && !error && (
          <div className="data-container">
            <h2>Informações Atuais:</h2>
            
            <div className="info-item">
              <strong>Data:</strong> <span>{apiData.datePart}</span>
            </div>
            
            <div className="info-item">
              <strong>Hora:</strong> <span>{apiData.timePart}</span>
            </div>
            
            <div className="info-item">
              <strong>Data e Hora Completa:</strong> <span>{apiData.date}</span>
            </div>
            
            <div className="status">
              <p>{apiData.status}</p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;