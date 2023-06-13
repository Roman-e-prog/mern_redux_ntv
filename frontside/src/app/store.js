import { configureStore } from "@reduxjs/toolkit";

//reducers
import inlineNewsReducer from "../features/inlineNews/inlineNewsSlice";
import mainnewsReducer from "../features/news/newsSlice";
import dropdownAudioReducer from "../features/dropdown/audioSlice";
import dropdownBoerseReducer from "../features/dropdown/boerseSlice";
import dropdownProgrammReducer from "../features/dropdown/programmSlice";
import dropdownSportReducer from "../features/dropdown/sportSlice";
import dropdownRessortReducer from "../features/dropdown/ressortSlice";
import dropdownVideosReducer from "../features/dropdown/videosSlice";
import dropdownWetterReducer from "../features/dropdown/wetterSlice";
import advertisesReducer from "../features/advertises/advertiseSlice";
import inlineAdvertisesReducer from "../features/advertises/inlineAdvertisesSlice";
import videosReducer from "../features/video/videoSlice";
import authReducer from "../features/auth/authSlice";
import bilderserieReducer from "../features/bilderserien/bilderserieSlice";
import boersenwerteReducer from "../features/boersenwerte/boersenwerteSlice";
import sliderItemsReducer from "../features/topSlider/sliderItemsSlice";
import dayLinksReducer from "../features/dayLinks/dayLinksSlice";
import ukraineNewsReducer from "../features/ukraineNews/ukraineNewsSlice";
import partnerserviceReducer from "../features/partnerservice/partnerserviceSlice";
import userLetterReducer from "../features/userLetter/userLetterSlice";
import userLetterCommentReducer from "../features/userLetter/userCommentSlice";
import breakingNewsReducer from '../features/breakingNews/breakingNewsSlice';
import newsletterOrderReducer from '../features/newsletter/newsletterSlice';
import searchReducer from '../features/search/searchSlice';
export const store = configureStore({
    reducer:{
        inlineNews: inlineNewsReducer,
        mainnews: mainnewsReducer,
        dropdownAudio: dropdownAudioReducer,
        dropdownBoerse: dropdownBoerseReducer,
        dropdownProgramm: dropdownProgrammReducer,
        dropdownSport:dropdownSportReducer,
        dropdownRessort: dropdownRessortReducer,
        dropdownVideos: dropdownVideosReducer,
        dropdownWetter: dropdownWetterReducer,
        advertises: advertisesReducer,
        inlineAdvertises: inlineAdvertisesReducer,
        videos: videosReducer,
        auth:authReducer,
        bilderserie: bilderserieReducer,
        boersenwerte: boersenwerteReducer,
        sliderItems: sliderItemsReducer,
        dayLinks: dayLinksReducer,
        ukraineNews:ukraineNewsReducer,
        partnerservice: partnerserviceReducer,
        userLetter:userLetterReducer,
        userLetterComment: userLetterCommentReducer,
        breakingNews: breakingNewsReducer,
        newsletter: newsletterOrderReducer,
        search:searchReducer,
    }
});
export default store;