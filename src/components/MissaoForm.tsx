import React from 'react';
import { TextField, Button, Box, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';

interface Props {
  onSave: (missao: any) => void;
  initialData?: any;
}

const MissaoForm: React.FC<Props> = ({ onSave, initialData }) => {
  const [nome, setNome] = React.useState(initialData?.nome || '');
  const [descricao, setDescricao] = React.useState(initialData?.descricao || '');
  const [dataInicio, setDataInicio] = React.useState<Date | null>(
    initialData?.data_inicio ? new Date(initialData.data_inicio) : null
  );
  const [dataFim, setDataFim] = React.useState<Date | null>(
    initialData?.data_fim ? new Date(initialData.data_fim) : null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !descricao || !dataInicio || !dataFim) {
      alert('Preencha todos os campos!');
      return;
    }

    if (dataInicio > dataFim) {
      alert('Data de início não pode ser maior que a data de fim.');
      return;
    }

    const anoInicio = dataInicio.getFullYear();
    const anoFim = dataFim.getFullYear();
    if (anoInicio < 1900 || anoInicio > 2100 || anoFim < 1900 || anoFim > 2100) {
      alert('As datas devem estar entre 1900 e 2100.');
      return;
    }

    onSave({
      nome,
      descricao,
      data_inicio: dataInicio.toISOString(),
      data_fim: dataFim.toISOString(),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Nome da missão"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
        
        <TextField
          fullWidth
          label="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          required
          multiline
          rows={4}
        />
        
        <Stack direction="row" spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Data de início"
              value={dataInicio}
              onChange={(newValue) => setDataInicio(newValue)}
              slotProps={{ textField: { fullWidth: true, required: true } }}
            />
          </LocalizationProvider>
          
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Data de fim"
              value={dataFim}
              onChange={(newValue) => setDataFim(newValue)}
              slotProps={{ textField: { fullWidth: true, required: true } }}
            />
          </LocalizationProvider>
        </Stack>
        
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Salvar
        </Button>
      </Stack>
    </Box>
  );
};

export default MissaoForm;