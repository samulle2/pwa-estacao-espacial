import React from 'react';
import { TextField, Button, Box, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';

interface Props {
  onSave: (astronauta: any) => void;
  initialData?: any;
}

const AstronautaForm: React.FC<Props> = ({ onSave, initialData }) => {
  const [nome, setNome] = React.useState(initialData?.nome || '');
  const [especialidade, setEspecialidade] = React.useState(initialData?.especialidade || '');
  const [dataNascimento, setDataNascimento] = React.useState<Date | null>(
    initialData?.data_nascimento ? new Date(initialData.data_nascimento) : null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !especialidade || !dataNascimento) {
      alert('Preencha todos os campos!');
      return;
    }

    const ano = dataNascimento.getFullYear();
    if (ano < 1900 || ano > 2100) {
      alert('Ano de nascimento inválido. Escolha entre 1900 e 2100.');
      return;
    }

    onSave({
      nome,
      especialidade,
      data_nascimento: dataNascimento.toISOString(),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            label="Nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Especialidade"
            value={especialidade}
            onChange={e => setEspecialidade(e.target.value)}
            required
          />
        </Stack>
        
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <DatePicker
            label="Data de nascimento"
            value={dataNascimento}
            onChange={(newValue) => setDataNascimento(newValue)}
            slotProps={{ textField: { fullWidth: true, required: true } }}
          />
        </LocalizationProvider>
        
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Salvar
        </Button>
      </Stack>
    </Box>
  );
};

export default AstronautaForm;