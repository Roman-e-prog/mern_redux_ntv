import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    username:Yup.string().required("Bitte geben Sie Ihren Username ein"),
    email:Yup.string().email("Bitte geben Sie die korrekte Emai-Adresse ein").required("Die Eingabe der Email ist verpflichtend"),
    passwort:Yup.string().min(6, "Das Passwort muss mindestens 6 Zeichen enthalten").required("Ohne Passwort geht das nicht")
})