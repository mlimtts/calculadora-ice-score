import React, { useState } from 'react';

export default function IceScoreCalculator() {
  const [scores, setScores] = useState({ impacto: '', confianca: '', facilidade: '' });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScores({ ...scores, [name]: value });
  };

  const calculateScore = () => {
    const impacto = parseFloat(scores.impacto);
    const confianca = parseFloat(scores.confianca);
    const facilidade = parseFloat(scores.facilidade);

    if ([impacto, confianca, facilidade].some(isNaN)) {
      setResult('Preencha todos os campos corretamente.');
      return;
    }

    const total = ((impacto + confianca + facilidade) / 3).toFixed(1);
    let classificacao = '';

    if (total >= 4.5) classificacao = 'Alta prioridade para escalar ou reaplicar';
    else if (total >= 3.5) classificacao = 'Potencial de otimização ou segmentação melhor';
    else
