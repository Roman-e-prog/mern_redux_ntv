import * as Yup from 'yup';

export const TopSliderSchema = Yup.object().shape({
    title:Yup.string().required("Bitte geben Sie den Titel ein"),
    body:Yup.string().required("Bitte geben Sie den Inhalt ein"),
})