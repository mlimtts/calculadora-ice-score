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
    <div style={{
      maxWidth: 500,
      margin: '40px auto',
      padding: 30,
      border: '1px solid #ddd',
      borderRadius: 12,
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#fafafa'
    }}>
      <h2 style={{ textAlign: 'center' }}>Calculadora de ICE Score</h2>
      <p style={{ fontSize: 14, color: '#555', marginBottom: 20 }}>
        Avalie sua ideia com base em 3 critérios: Impacto, Confiança e Facilidade. Use notas de 1 a 5.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label><strong>Impacto:</strong></label><br />
        <small>Qual o potencial dessa ideia gerar impacto real no negócio?</small><br />
        <input
          type="number"
          name="impacto"
          placeholder="Nota de 1 a 5"
          value={scores.impacto}
          onChange={handleChange}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label><strong>Confiança:</strong></label><br />
        <small>Com base em dados ou experiências, quão confiante estamos de que funcionará?</small><br />
        <input
          type="number"
          name="confianca"
          placeholder="Nota de 1 a 5"
          value={scores.confianca}
          onChange={handleChange}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label><strong>Facilidade:</strong></label><br />
        <small>É simples de implementar com os recursos atuais?</small><br />
        <input
          type="number"
          name="facilidade"
          placeholder="Nota de 1 a 5"
          value={scores.facilidade}
          onChange={handleChange}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />
      </div>

      <button
        onClick={calculateScore}
        style={{
          width: '100%',
          backgroundColor: '#1976d2',
          color: '#fff',
          padding: 10,
          borderRadius: 6,
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Calcular
      </button>

      {result && (
        <p style={{ marginTop: 20, fontSize: 16, textAlign: 'center', color: '#333' }}>
          {result}
        </p>
      )}

      <hr style={{ marginTop: 30 }} />
      <p style={{ textAlign: 'center', fontSize: 12, color: '#999' }}>
        feito com ❤️ por mli
      </p>
    </div>
  );
}
