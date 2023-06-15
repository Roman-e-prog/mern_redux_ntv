# mern_redux_ntv

# Project purpose
This project was built to gain knowledge and experience in using JavaScript technologies with the React and Node libraries. The website is an example for a website with many different components rendered on one page.
# Project description
This Project has been built as a fullstack application, using mongoose, express, react and node.
For styling, I have used the styled-components library. I like to have a documentation, by using individual tag names.
This website is oriented to the official website of the german newschannel ntv.
The website was built without using external code. The only developer of this website is Roman Armin Rostock.
# General informations
All code was developed by me, and I used only a few libraries to gain a deep understanding of MERN stack development. Some parts like weather data, stock market data and corona data are hardcoded. I have not found long term free usable data for this.
    The registration and login are on the front side. Admins are directed to the dashboard while all other users are directed to a user letter page
    All menu points in the dropdown menu lead to one page, named DropdownLinkPage. There the different contents are filtered to render the correct entries. The Navbar is changed into a hamburger menue when the the screen width reaches 420px.
    The website has three breakpoints: 1024px, 780px, and 420px
    The dashboard is only including one page for the entire crud operations. Only a link to the newsletterpage and the userletterpage are included in the navbar. 
    The first point Breakingnews starts an animated scrolling text on the hompepage.
    The sliders on the webpage are build by hand, only for the automatic imageseries slider I have used the slick-slider librarie. 
    For the Part "Bilderserien" I have build only one example.

# Structure

-At the top a navbar, with full screen dropdownmenue and a search that opens on a single page.

-Top bar with stock market data and weather data.(Hardcoded data, stock market data comes from the database)

-Live ticker for Ukraine news - displays only the last entry. All entries are found by clicking the link.

-One section with news (two different styles)and one section for videos. Clicking the entrys opens the indivual Article. All clicks are counted and sort the component "Meist gelesen" or "Meist gesehen" on the homepage.
For all news there is an evaluation component, that is used to sort the articles in "Das Beste" on the homepage.

-A chart with corona data using react-charts librarie.(Hardcoded data);

-"Bilderserie" The component is a link that leads to a fullscreen slider.

-"Meist gesehen" sorts videos like described above.

-Advertise component with two different styled advertises.

-Acordeon with services

-Footer.
