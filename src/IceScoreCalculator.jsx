import React, { useState } from 'react';

export default function IceScoreCalculator() {
  const [scores, setScores] = useState({ impacto: '', confianca: '', facilidade: '' });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScores({ ...scores, [name]: value });
  };

  const calculateScore = () => {
    const impacto = parseInt(scores.impacto, 10);
    const confianca = parseInt(scores.confianca, 10);
    const facilidade = parseInt(scores.facilidade, 10);

    if ([impacto, confianca, facilidade].some(isNaN)) {
      setResult('Preencha todos os campos corretamente.');
      return;
    }

    const total = impacto * 3 + confianca * 2 + facilidade;
    let classificacao = '';

    if (total > 80) classificacao = 'Alta prioridade para escalar ou reaplicar';
    else if (total >= 60) classificacao = 'Potencial de otimização ou segmentação melhor';
    else classificacao = 'Descartar ou revisar hipótese';

    setResult(`ICE Score: ${total} — ${classificacao}`);
  };

  return (
<h1 style={{ textAlign: 'center', color: 'red' }}>🚨 TESTE VISUAL 🚨</h1>
    <div style={{
      fontFamily: 'Roboto, sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: 20
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        padding: 30,
        maxWidth: 500,
        width: '100%'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: 10 }}>Calculadora de ICE Score</h2>
        <p style={{ fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 30 }}>
          Avalie sua ideia com base em Impacto, Confiança e Facilidade. Notas de 1 a 5.
        </p>

        {['impacto', 'confianca', 'facilidade'].map((campo) => (
          <div style={{ marginBottom: 20 }} key={campo}>
            <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
              {campo === 'impacto' && 'Impacto'}
              {campo === 'confianca' && 'Confiança'}
              {campo === 'facilidade' && 'Facilidade'}
            </label>
            <small style={{ color: '#888' }}>
              {campo === 'impacto' && 'Potencial de gerar impacto real no negócio'}
              {campo === 'confianca' && 'Confiança baseada em dados ou experiências'}
              {campo === 'facilidade' && 'Facilidade de implementação com recursos atuais'}
            </small>
            <input
              type="number"
              name={campo}
              value={scores[campo]}
              onChange={handleChange}
              placeholder="Nota de 1 a 5"
              style={{
                width: '100%',
                padding: '10px',
                marginTop: 6,
                borderRadius: 8,
                border: '1px solid #ccc',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)'
              }}
            />
          </div>
        ))}

        <button
          onClick={calculateScore}
          style={{
            width: '100%',
            padding: 12,
            backgroundColor: '#1976d2',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#115293'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1976d2'}
        >
          Calcular
        </button>

        {result && (
          <div style={{ marginTop: 30, fontSize: 16, textAlign: 'center', color: '#333' }}>
            {result}
          </div>
        )}

        <div style={{
          marginTop: 40,
          textAlign: 'center',
          fontSize: 12,
          color: '#aaa',
          borderTop: '1px solid #eee',
          paddingTop: 20
        }}>
          feito com ❤️ por mli
        </div>
      </div>
    </div>
  );
}
