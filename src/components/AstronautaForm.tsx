import React, { useState } from 'react';

interface Props {
  onSave: (astronauta: any) => void;
  initialData?: any;
}

const AstronautaForm: React.FC<Props> = ({ onSave, initialData }) => {
  const [nome, setNome] = useState(initialData?.nome || '');
  const [especialidade, setEspecialidade] = useState(initialData?.especialidade || '');
  const [dataNascimento, setDataNascimento] = useState(
    initialData?.data_nascimento?.substring(0, 10) || ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !especialidade || !dataNascimento) {
      alert('Preencha todos os campos!');
      return;
    }

    const data = new Date(dataNascimento);
    const ano = data.getFullYear();
    if (ano < 1900 || ano > 2100) {
      alert('Ano de nascimento inválido. Escolha entre 1900 e 2100.');
      return;
    }

    onSave({
      nome,
      especialidade,
      data_nascimento: data.toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" />
      <input value={especialidade} onChange={e => setEspecialidade(e.target.value)} placeholder="Especialidade" />
      <input
        type="date"
        value={dataNascimento}
        onChange={e => setDataNascimento(e.target.value)}
        placeholder="Data de nascimento"
      />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default AstronautaForm;
