import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe("testing form in app component", () => {

  it("should render", async() => {
    render(<App />)
  }),

  it("should validate if 'name' is filled", async() => {
    render(<App />)

    const formElement =  screen.getByTestId("form")
    const inputIdade =  screen.getByTitle("idade")
    const inputCidade =  screen.getByTitle("cidade")
    const inputEmail =  screen.getByTitle("email")

    userEvent.type(inputIdade, "20")
    userEvent.type(inputCidade, "Campinas")
    userEvent.type(inputEmail, "test@test.com")
  
    fireEvent.submit(formElement)

    const paragraphElement = await screen.findByTitle("error-nome")
    expect(paragraphElement.textContent).toBe("Nome é obrigatório")
  }),

  it("should validate if 'email' is filled", async() => {
    render(<App />)

    const formElement =  screen.getByTestId("form")
    const inputNome =  screen.getByTitle("nome")
    const inputIdade =  screen.getByTitle("idade")
    const inputCidade =  screen.getByTitle("cidade")

    userEvent.type(inputNome, "Ana")
    userEvent.type(inputIdade, "20")
    userEvent.type(inputCidade, "Campinas")
  
    fireEvent.submit(formElement)

    const paragraphElement = await screen.findByTitle("error-email")
    expect(paragraphElement.textContent).toBe("E-mail no formato exemplo@exemplo.com é obrigatório")
  }),

  it("should validate 'idade' more than 18", async() => {
    render(<App />)

    const formElement =  screen.getByTestId("form")
    const inputNome =  screen.getByTitle("nome")
    const inputIdade =  screen.getByTitle("idade")
    const inputCidade =  screen.getByTitle("cidade")
    const inputEmail =  screen.getByTitle("email")

    userEvent.type(inputNome, "Ana")
    userEvent.type(inputIdade, "15")
    userEvent.type(inputEmail, "test@test.com")
    userEvent.type(inputCidade, "Campinas")
  
    fireEvent.submit(formElement)

    const paragraphElement = await screen.findByTitle("error-idade")
    expect(paragraphElement.textContent).toBe("Idade deve ser superior a 18 anos.")
  }),

  it("should validate if 'estado civil' is selected", async() => {
    render(<App />)

    const formElement =  screen.getByTestId("form")
    const inputNome =  screen.getByTitle("nome")
    const inputIdade =  screen.getByTitle("idade")
    const inputCidade =  screen.getByTitle("cidade")
    const inputEmail =  screen.getByTitle("email")

    userEvent.type(inputNome, "Ana")
    userEvent.type(inputIdade, "20")
    userEvent.type(inputEmail, "test@test.com")
    userEvent.type(inputCidade, "Campinas")
  
    fireEvent.submit(formElement)

    const paragraphElement = await screen.findByTitle("error-estado-civil")
    expect(paragraphElement.textContent).toBe("Estado Civil é obrigatório")
  })

})