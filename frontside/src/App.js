
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Ukraine from "./pages/Ukraine";
import DerTag from "./pages/DerTag";
import BoersenTag from "./pages/BoersenTag";
import SportTag from "./pages/SportTag";
import Bilderserien from "./pages/Bilderserien";
import Nutzungsbedinungen from "./pages/Nutzungsbedinungen";
import Dashboard from "./pages/Dashboard";
//edits
import DropdownRessortEdit from "./pages/Dashboard/edits/DropdownRessortEdit";
import DropdownAudioEdit from "./pages/Dashboard/edits/DropdownAudioEdit";
import MainnewsEdit from "./pages/Dashboard/edits/MainnewsEdit";
import InlineNewsEdit from "./pages/Dashboard/edits/InlineNewsEdit";
import AdvertisesEdit from "./pages/Dashboard/edits/AdvertisesEdit";
import InlineAdvertisesEdit from "./pages/Dashboard/edits/InlineAdvertisesEdit";
import UkraineNewsEdit from "./pages/Dashboard/edits/UkraineNewsEdit";
import DayLinksEdit from "./pages/Dashboard/edits/DayLinksEdit";
import BilderserienEdit from "./pages/Dashboard/edits/BilderserienEdit";
import TopSliderItemEdit from "./pages/Dashboard/edits/TopSliderItemEdit";
//Links
import DropdownLinkPage from "./pages/DropdownLinkPage";
import Sport from "./pages/MainLinks/Sport";
import Boerse from "./pages/MainLinks/Boerse";
import Programm from "./pages/MainLinks/Programm";
import Video from "./pages/MainLinks/Video";
import Wetter from "./pages/MainLinks/Wetter";
//Einzelseiten
import MainNewsArticles from "./pages/Articles/MainNewsArticles";
import VideosArticles from "./pages/Articles/VideosArticles";
import InlineNewsArticles from "./pages/Articles/InlineNewsArticles";
import SalesServices from "./pages/MainLinks/SalesServices";
import UserLetter from "./pages/UserLetter";
import BreakingNewsEdit from "./pages/Dashboard/edits/BreakingNewsEdit";
import DropdownBoerseEdit from "./pages/Dashboard/edits/DropdownBoerseEdit";
import DropdownProgrammEdit from "./pages/Dashboard/edits/DropdownProgrammEdit";
import DropdownSportEdit from "./pages/Dashboard/edits/DropdownSportEdit";
import DropdownVideoEdit from "./pages/Dashboard/edits/DropdownVideoEdit";
import DropdownWetterEdit from "./pages/Dashboard/edits/DropdownWetterEdit";
import Search from "./pages/Search";
import NewsletterOrder from "./pages/Dashboard/NewsletterOrder";
import AdvertiseArticles from "./pages/Articles/AdvertiseArticles";
import InlineAdvertiseArticle from "./pages/Articles/InlineAdvertiseArticle";
import VideoEdit from "./pages/Dashboard/edits/VideoEdit";
import Impressum from "./pages/Impressum";
import Datenschutzerklaerung from "./pages/Datenschutzerklaerung";
import PartnerserviceEdit from "./pages/Dashboard/edits/PartnerserviceEdit";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* entry */}
          <Route path="*" element={<NotFound/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/newsletter" element={<NewsletterOrder/>}/>
          {/* edits */}
          <Route path="/dropdownressortedit/:id" element={<DropdownRessortEdit/>}/>
          <Route path="/dropdownaudioedit/:id" element={<DropdownAudioEdit/>}/>
          <Route path="/dropdownboerseedit/:id" element={<DropdownBoerseEdit/>}/>
          <Route path="/dropdownprogrammedit/:id" element={<DropdownProgrammEdit/>}/>
          <Route path="/dropdownsportedit/:id" element={<DropdownSportEdit/>}/>
          <Route path="/dropdownvideoedit/:id" element={<DropdownVideoEdit/>}/>
          <Route path="/dropdownwetteredit/:id" element={<DropdownWetterEdit/>}/>
          <Route path="/mainnewsEdit/:id" element={<MainnewsEdit/>}/>
          <Route path="/inlineNewsEdit/:id" element={<InlineNewsEdit/>}/>
          <Route path="/advertisesEdit/:id" element={<AdvertisesEdit/>}/>
          <Route path="/inlineAdvertisesEdit/:id" element={<InlineAdvertisesEdit/>}/>
          <Route path="/ukraineNewsEdit/:id" element={<UkraineNewsEdit/>}/>
          <Route path="/dayLinksEdit/:id" element={<DayLinksEdit/>}/>
          <Route path="/bilderserienEdit/:id" element={<BilderserienEdit/>}/>
          <Route path="/topSliderItemsEdit/:id" element={<TopSliderItemEdit/>} />
          <Route path="/breakingNewsEdit/:id" element={<BreakingNewsEdit/>} />
          <Route path="/videosEdit/:id" element={<VideoEdit/>}/>
          <Route path="/partnerserviceEdit/:id" element={<PartnerserviceEdit/>}/>
          {/* pages */}
          <Route exact path="/" element={<Home/>}/>
          <Route path="/sport" element={<Sport/>}/>
          <Route path="/boerse" element={<Boerse/>}/>
          <Route path="/programm" element={<Programm/>}/>
          <Route path="/video" element={<Video/>}/>
          <Route path="/wetter" element={<Wetter/>}/>
          <Route path="/Sales&Services" element={<SalesServices/>}/>
          <Route path="/userLetter" element={<UserLetter/>}/>
          <Route path="/:li" element={<DropdownLinkPage/>}/>
          {/*Einzelseiten */}
          <Route path="/mainNewsArticles/:id" element={<MainNewsArticles/>}/>
          <Route path="/inlineNewsArticles/:id" element={<InlineNewsArticles/>}/>
          <Route path="/videosArticles/:id" element={<VideosArticles/>}/>
          <Route path="/advertiseArticles/:id" element={<AdvertiseArticles/>}/>
          <Route path="/inlineAdvertiseArticles/:id" element={<InlineAdvertiseArticle/>}/>
          {/* spezialNewscontainer corona*/}
          <Route path="/ukraine" element={<Ukraine/>}/>
          {/* Tageslinks */}
          <Route path="/tag" element={<DerTag/>}/>
          <Route path="/boersentag" element={<BoersenTag/>}/>
          <Route path="/sporttag" element={<SportTag/>}/>
          {/* Bilderserien */}
          <Route path="/bilderserien" element={<Bilderserien/>}/>
          {/* Footer */}
          <Route path="/nutzungsbedingungen" element={<Nutzungsbedinungen/>}/>
          <Route path="/impressum" element={<Impressum/>}/>
          <Route path="/datenschutzerklaerung" element={<Datenschutzerklaerung/>}/>
          <Route path="/search" element={<Search/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
