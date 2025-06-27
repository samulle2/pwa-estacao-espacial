import React, { useEffect, useState } from 'react';
import { Button, Box, Stack, MenuItem, InputLabel, FormControl, Select } from '@mui/material';
import api from '../services/api';

interface Props {
  onSave: (dados: { astronautaId: number; missaoId: number }) => void;
}

const ParticipacaoForm: React.FC<Props> = ({ onSave }) => {
  const [astronautaId, setAstronautaId] = useState('');
  const [missaoId, setMissaoId] = useState('');
  const [astronautas, setAstronautas] = useState<any[]>([]);
  const [missoes, setMissoes] = useState<any[]>([]);

  useEffect(() => {
    const carregar = async () => {
      try {
        const [resAstronautas, resMissoes] = await Promise.all([
          api.get('/astronautas'),
          api.get('/missoes'),
        ]);
        setAstronautas(resAstronautas.data);
        setMissoes(resMissoes.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert('Erro ao carregar astronautas ou missões.');
      }
    };
    carregar();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!astronautaId || !missaoId) {
      alert('Selecione um astronauta e uma missão.');
      return;
    }

    onSave({
      astronautaId: Number(astronautaId),
      missaoId: Number(missaoId),
    });

    setAstronautaId('');
    setMissaoId('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="astronauta-label">Astronauta</InputLabel>
            <Select
              labelId="astronauta-label"
              value={astronautaId}
              label="Astronauta"
              onChange={e => setAstronautaId(e.target.value)}
              required
            >
              <MenuItem value="">Selecione um astronauta</MenuItem>
              {astronautas.map((a: any) => (
                <MenuItem key={a.id} value={a.id}>{a.nome}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
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
        </Stack>
        
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Vincular
        </Button>
      </Stack>
    </Box>
  );
};

export default ParticipacaoForm;