import * as Yup from 'yup';

 export const UkraineNewsSchema = Yup.object().shape({
    title: Yup.string().required("Bitte geben Sie den Titel ein"),
    text:Yup.string().required("Bitte geben Sie einen Text ein"),
});