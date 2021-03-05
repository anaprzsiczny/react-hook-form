import React, { useState } from 'react';
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
  const [success, setSuccess] = useState<String>("")

  const onSubmit = (data: any) => {
    console.log(data)
    setSuccess("Formulário enviado com sucesso!")
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
        <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
          <TextField id="standard-required" label="Nome" title="nome" name="nome" inputRef={register({required: true})} />
          {errors.nome && <p title="error-nome">Nome é obrigatório</p>}
          <br/>
          <TextField id="standard-required" label="Cidade" title="cidade" name="cidade" inputRef={register} />
          <br/>
          <TextField id="standard-required" label="E-mail" title="email" name="email" inputRef={register({required: true, pattern: /\S+@\S+\.\S+/})} />
          {errors.email && <p title="error-email">E-mail no formato exemplo@exemplo.com é obrigatório</p>}
          <br/>
          <TextField id="standard-number" label="Idade" type="number" title="idade" name="idade" InputLabelProps={{ shrink: true }} inputRef={register({required: true, min: 19})} />
          {errors.idade && <p title="error-idade">Idade deve ser superior a 18 anos.</p>}
          <br/>
          <br/>
          <FormLabel component="legend">Estado Civil</FormLabel>
          <RadioGroup aria-label="estadoCivil" title="estadoCivil">
            <FormControlLabel value="casado" control={<Radio />} label="Casado(a)" name="estadoCivil" inputRef={register({required: true})} />
            <FormControlLabel value="solteiro" control={<Radio />} label="Solteiro(a)" name="estadoCivil" inputRef={register({required: true})} />
            <FormControlLabel value="divorciado" control={<Radio />} label="Divorciado(a)" name="estadoCivil" inputRef={register({required: true})} />
            <FormControlLabel value="viúvo" control={<Radio />} label="Viúvo(a)" name="estadoCivil" inputRef={register({required: true})} />
            {errors.estadoCivil && <p title="error-estado-civil">Estado Civil é obrigatório</p>}
          </RadioGroup>
          {estado === "casado" && (
            <div>
              <TextField id="standard-required" label="Nome do(a) cônjuge" name="nomeConjuge" inputRef={register}/>
              <br/>
            </div>
          )}
          <button type="submit">Enviar</button>
          <p title="sucesso">{success !== "" && success}</p>
        </form>
      </Container>
    </div>
  );
}

export default App;
