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
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Calculadora de ICE Score</h2>
      <input name="impacto" placeholder="Impacto (1-5)" onChange={handleChange} /><br />
      <input name="confianca" placeholder="Confiança (1-5)" onChange={handleChange} /><br />
      <input name="facilidade" placeholder="Facilidade (1-5)" onChange={handleChange} /><br />
      <button onClick={calculateScore}>Calcular</button>
      {result && <p>{result}</p>}
    </div>
  );
}
