import * as Yup from 'yup';

 export const PartnerserviceSchema = Yup.object().shape({
    title: Yup.string().required("Bitte geben Sie den Titel ein"),
    content:Yup.string().required("Bitte geben Sie einen Servicenamen ein"),
});