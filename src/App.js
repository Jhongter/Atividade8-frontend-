import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [datetime, setDatetime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Substitua pela URL da sua API no Render
    const apiUrl = 'https://atividade8.onrender.com/';
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        return response.json();
      })
      .then(data => {
        setDatetime(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">Erro: {error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Consulta de Data e Hora</h1>
        <div className="datetime-info">
          <p><strong>Data:</strong> {datetime.date}</p>
          <p><strong>Hora:</strong> {datetime.time}</p>
          <p><strong>ISO:</strong> {datetime.iso}</p>
          <p><strong>Timestamp:</strong> {datetime.timestamp}</p>
        </div>
      </header>
    </div>
  );
}

export default App;