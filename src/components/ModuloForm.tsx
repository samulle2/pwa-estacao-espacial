import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Stack, MenuItem, InputLabel, FormControl, Select } from '@mui/material';
import api from '../services/api';

interface Props {
  onSave: (modulo: any) => void;
  initialData?: any;
}

const ModuloForm: React.FC<Props> = ({ onSave, initialData }) => {
  const [nome, setNome] = useState(initialData?.nome || '');
  const [funcao, setFuncao] = useState(initialData?.funcao || '');
  const [missaoId, setMissaoId] = useState(initialData?.missao_id || '');
  const [missoes, setMissoes] = useState<any[]>([]);

  useEffect(() => {
    api.get('/missoes').then(res => setMissoes(res.data));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !funcao || !missaoId) {
      alert('Todos os campos são obrigatórios.');
      return;
    }

    onSave({
      nome,
      funcao,
      missao_id: Number(missaoId),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Nome do módulo"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
        
        <TextField
          fullWidth
          label="Função"
          value={funcao}
          onChange={e => setFuncao(e.target.value)}
          required
        />
        
        <FormControl fullWidth>
          <InputLabel id="missao-label">Missão</InputLabel>
          <Select
            labelId="missao-label"
            value={missaoId}
            label="Missão"
            onChange={e => setMissaoId(e.target.value)}
            required
          >
            <MenuItem value="">Selecione uma missão</MenuItem>
            {missoes.map((m: any) => (
              <MenuItem key={m.id} value={m.id}>{m.nome}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Salvar
        </Button>
      </Stack>
    </Box>
  );
};

export default ModuloForm;