import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function IceScoreCalculator() {
  const [scores, setScores] = useState({ impacto: '', confianca: '', facilidade: '' });
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(null);
  const [hipotese, setHipotese] = useState('');
  const [hipoteseNota, setHipoteseNota] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScores({ ...scores, [name]: value });
  };

  const avaliarHipotese = (texto) => {
    const criterios = [
      /persona|médico|perfil/i,
      /canal|ads|email|instagram|facebook|linkedin/i,
      /ativo|ebook|conteúdo|masterclass|webinar/i,
      /cpl|cpa|métrica|meta|conversão|resultado esperado/i,
      /hipótese|esperamos que|acreditamos que|causa/i,
      /prazo|período|início|fim|data/i
    ];
    const encontrados = criterios.filter((regex) => regex.test(texto)).length;
    return {
      nota: encontrados,
      mensagem: encontrados >= 5 ?
        'Hipótese bem estruturada' :
        'Hipótese precisa ser mais clara e conter todos os elementos do experimento'
    };
  };

  const calculateScore = () => {
    const impacto = parseFloat(scores.impacto);
    const confianca = parseFloat(scores.confianca);
    const facilidade = parseFloat(scores.facilidade);

    if ([impacto, confianca, facilidade].some(isNaN)) {
      setResult('Por favor, insira todos os valores corretamente.');
      return;
    }

    const calculatedScore = ((impacto + confianca + facilidade) / 3).toFixed(1);
    setScore(calculatedScore);

    let classification = '';
    if (calculatedScore >= 4.5) {
      classification = 'Alta prioridade para escalar ou reaplicar';
    } else if (calculatedScore >= 3.5) {
      classification = 'Potencial de otimização ou segmentação melhor';
    } else {
      classification = 'Descartar ou revisar hipótese';
    }

    setResult(`ICE Score: ${calculatedScore} — ${classification}`);

    const avaliacao = avaliarHipotese(hipotese);
    setHipoteseNota(`Nota da Hipótese: ${avaliacao.nota}/6 — ${avaliacao.mensagem}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card className="shadow-lg rounded-2xl border border-gray-200">
        <CardContent className="space-y-6 p-6">
          <h2 className="text-2xl font-bold text-gray-800">Calculadora de ICE Score</h2>
          <p className="text-sm text-gray-600">Preencha os campos abaixo com notas de 1 a 5 para calcular a priorização de sua ideia com base no framework ICE.</p>

          <div>
            <Label htmlFor="impacto">Impacto</Label>
            <p className="text-xs text-gray-500 mb-1">Qual o potencial dessa ideia gerar impacto real no negócio?</p>
            <Input name="impacto" placeholder="Impacto (1-5)" value={scores.impacto} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="confianca">Confiança</Label>
            <p className="text-xs text-gray-500 mb-1">Com base em dados ou experiências, quão confiante estamos de que funcionará?</p>
            <Input name="confianca" placeholder="Confiança (1-5)" value={scores.confianca} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="facilidade">Facilidade</Label>
            <p className="text-xs text-gray-500 mb-1">É simples de implementar com os recursos atuais?</p>
            <Input name="facilidade" placeholder="Facilidade (1-5)" value={scores.facilidade} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="hipotese">Hipótese do experimento</Label>
            <p className="text-xs text-gray-500 mb-1">Descreva a hipótese conforme a estrutura: Persona / Canal / Ativo / Resultado Esperado / Hipótese / Prazo</p>
            <Textarea placeholder="Digite aqui sua hipótese" value={hipotese} onChange={(e) => setHipotese(e.target.value)} />
          </div>

          <Button onClick={calculateScore} className="w-full">Calcular</Button>

          {result && <p className="text-lg font-medium mt-4 text-center text-gray-700">{result}</p>}
          {hipoteseNota && <p className="text-sm mt-2 text-center text-gray-600">{hipoteseNota}</p>}

          <div className="pt-4 border-t text-xs text-center text-gray-400">
            feito com ❤️ por mli
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
