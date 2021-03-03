import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { toast, Toaster } from 'react-hot-toast';

function App() {

  const {register, handleSubmit, errors, watch} = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
    toast.success("Formulário enviado com sucesso!")
  }

  const estado = watch("estadoCivil")

  return (
    <div className="App">
      <Container maxWidth="sm">
        <Toaster />
        <Typography variant="h4" gutterBottom>
          Formulário
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField id="standard-required" label="Nome" name="nome" inputRef={register({required: true})} />
          {errors.nome && <p>Nome é obrigatório</p>}
          <br/>
          <TextField id="standard-required" label="Cidade" name="cidade" inputRef={register} />
          <br/>
          <TextField id="standard-required" label="E-mail" name="email" inputRef={register({required: true, pattern: /\S+@\S+\.\S+/})} />
          {errors.email && <p>E-mail no formato exemplo@exemplo.com é obrigatório</p>}
          <br/>
          <TextField id="standard-number" label="Idade" type="number" name="idade" InputLabelProps={{ shrink: true }} inputRef={register({required: true, min: 19})} />
          {errors.idade && <p>Idade deve ser superior a 18 anos.</p>}
          <br/>
          <br/>
          <FormLabel component="legend">Estado Civil</FormLabel>
          <RadioGroup aria-label="estadoCivil">
            <FormControlLabel value="casado" control={<Radio />} label="Casado(a)" name="estadoCivil" inputRef={register({required: true})} />
            <FormControlLabel value="solteiro" control={<Radio />} label="Solteiro(a)" name="estadoCivil" inputRef={register({required: true})} />
            <FormControlLabel value="divorciado" control={<Radio />} label="Divorciado(a)" name="estadoCivil" inputRef={register({required: true})} />
            <FormControlLabel value="viúvo" control={<Radio />} label="Viúvo(a)" name="estadoCivil" inputRef={register({required: true})} />
            {errors.estadoCivil && <p>Estado Civil é obrigatório</p>}
          </RadioGroup>
          {estado === "casado" && (
            <div>
              <TextField id="standard-required" label="Nome do(a) cônjuge" name="nomeConjuge" inputRef={register}/>
              <br/>
            </div>
          )}
          <button>Enviar</button>
        </form>
      </Container>
    </div>
  );
}

export default App;
