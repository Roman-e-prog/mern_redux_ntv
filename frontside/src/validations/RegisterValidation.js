import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
    vorname: Yup.string().required("Bitte geben Sie Ihren Vornamen ein"),
    nachname: Yup.string().required("Bitte geben Sie Ihren Nachnamen ein"),
    email: Yup.string().email("Bitte geben Sie eine korrekte E-mail Adresse ein").required("Die E-mail Adresse ist verpflichtend"),
    username: Yup.string().required("Bitte geben Sie Ihren Benutzernamen ein"),
    passwort: Yup.string().min(6, "Das Passwort muss mindestens 6 Zeichen umfassen").required("Bitte geben Sie ihr Passwort ein"),
    passwortValidation: Yup.string()
     .oneOf([Yup.ref('passwort'), null], 'Passwörter müssen übereinstimmen')
})