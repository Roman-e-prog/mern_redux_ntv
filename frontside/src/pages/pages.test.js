import {screen, render, waitFor, waitForElementToBeRemoved} from '@testing-library/react'
import {} from '@testing-library/user-event';
import Register from './Register';
describe('register has all its inputs', ()=>{
    it("test the inputs", ()=>{
        render(<Register/>)
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