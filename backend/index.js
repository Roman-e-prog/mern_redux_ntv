const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const errorHandler = require("./middleware/errorMiddleware");
dotenv.config();
const port = process.env.PORT;
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");

//UserRoutes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
//DropdownRoutes
const dropdownRessortRoute = require("./routes/dropdownRessort");
const dropdownSportRoute = require("./routes/dropdownSport");
const dropdownBoerseRoute = require("./routes/dropdownBoerse");
const dropdownWetterRoute = require("./routes/dropdownWetter");
const dropdownVideosRoute = require("./routes/dropdownVideos");
const dropdownAudioRoute = require("./routes/dropdownAudio");
const dropdownProgrammRoute = require("./routes/dropdownProgramm");
//Topbar & Slider
const boersenwerteRoute = require("./routes/boersenwerte");
const sliderItemRoute = require("./routes/sliderItem");
//SpecialNews
const ukraineNewsRoute = require("./routes/ukraineNews");
//Daylinks
const daylinksRoute = require("./routes/daylinks");
//News
const mainNewsRoute = require("./routes/mainNews");
const inlineNewsRoute = require("./routes/inlineNews");
//Bilderserie
const bilderserieRoute = require("./routes/bilderserie");
//Videos
const videosRoute = require("./routes/video");
//Advertises
const advertisesRoute = require("./routes/advertises");
const inlineAdvertisesRoute = require("./routes/inlineAdvertises");
//partnerservice
const partnerserviceRoute = require("./routes/partnerservice");
//userLetter
const userLettersRoute = require("./routes/userLetters");
const userCommentsRoute = require("./routes/userComments");
//breakingNews
const breakingNewsRoute = require("./routes/breakingNews");
//NewsletterOrder
const newsletterOrderRoute = require("./routes/newsletter");
//APP
const app = express();
connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//USER
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
//DROPDOWN
app.use("/api/dropdownRessort", dropdownRessortRoute);
app.use("/api/dropdownSport", dropdownSportRoute);
app.use("/api/dropdownboerse", dropdownBoerseRoute);
app.use("/api/dropdownWetter", dropdownWetterRoute);
app.use("/api/dropdownVideos", dropdownVideosRoute);
app.use("/api/dropdownAudio", dropdownAudioRoute);
app.use("/api/dropdownProgramm", dropdownProgrammRoute);
//TopBar
app.use("/api/boersenwerte", boersenwerteRoute);
//Slider Top
app.use("/api/sliderItem", sliderItemRoute);
//SpecialNews
app.use("/api/ukraineNews", ukraineNewsRoute);
//Daylinks
app.use("/api/daylinks", daylinksRoute);
//News
app.use("/api/mainNews", mainNewsRoute);
app.use("/api/inlineNews", inlineNewsRoute);
//Bilderserie
app.use("/api/bilderserie", bilderserieRoute);
//Videos
app.use("/api/videos", videosRoute);
//advertises
app.use("/api/advertises", advertisesRoute);
app.use("/api/inlineAdvertises", inlineAdvertisesRoute);
//partnerservice
app.use("/api/partnerservice", partnerserviceRoute);
//userLetter
app.use("/api/userLetters", userLettersRoute);
app.use('/api/userComments', userCommentsRoute);
//breakingNews
app.use('/api/breakingNews', breakingNewsRoute);
//newsletter
app.use('/api/newsletterOrder', newsletterOrderRoute);
//uploads
app.use(express.static(path.resolve(process.cwd(), 'frontside/public/')));
// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontside/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontside', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }

app.use(errorHandler);

app.listen(port || 5000, ()=>{
    console.log(`Server is running on port ${port}`);
})
