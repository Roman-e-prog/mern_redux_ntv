import {screen, render, waitFor, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent, {} from '@testing-library/user-event';
import Register from '../pages/Register';
import { Provider } from 'react-redux';
import {store} from "../app/store";
import { MemoryRouter } from 'react-router-dom';//not affect the browsers memory during tests
import Login from '../pages/Login';
afterEach(()=>{
    jest.resetAllMocks();
})
describe('register has all its inputs', ()=>{
    it("test the inputs", ()=>{
        render(<Provider store={store}>
                    <MemoryRouter>
                        <Register/>
                    </MemoryRouter>
                </Provider>)
        expect(localStorage.__STORE__).toEqual(undefined);
       
        const vorname = screen.getByRole('textbox',{
            name:"Vorname"
        });
        const nachname = screen.getByRole('textbox',{
            name:"Nachname"
        });
        const email = screen.getByRole('textbox',{
            name:"E-Mail"
        });
        const password = screen.getByLabelText('Passwort');
        const passwordConfirm = screen.getByLabelText('Passwortbestätigung');
        const button = screen.getByRole('button',{
            name:"Registrieren"
        })   
    })
})

describe.only('test the login', ()=>{
    beforeEach(()=>{
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Login/>
                </MemoryRouter>
            </Provider>
        )
    })
    it('test if all inputs are there', ()=>{
        const email = screen.getByRole('textbox',{
            name:/E-Mail/i
        })
        const username = screen.getByRole('textbox',{
            name:/Benutzername/i
        })
        const password = screen.getByLabelText('Passwort');
        const button = screen.getByRole('button',{
            name:/Login/i
        })
        expect(email).toBeInTheDocument();
        expect(username).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        
    })
})