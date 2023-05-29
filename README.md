# Frontend Mentor - Devfinder

![preview of the site](preview.jpg)

This is a challenge from [Frontend Mentor](https://www.frontendmentor.io/). Coded by [me](https://www.frontendmentor.io/profile/Martin-K-Kamir)! 😁

Welcome to the repository for this project. Feel free to look around and explore! 😀

### Tools

- [Vite](https://vitejs.dev/)
- [SCSS](https://sass-lang.com/)
- [PostCSS](https://postcss.org/)

### Features
- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- View the current time and location information based on their IP address
- View additional information about the date and time in the expanded state
- Be shown the correct greeting and background image based on the time of day they're visiting the site
- Generate random programming quotes by clicking the refresh icon near the quote

I added couple of extra features to the project:
- Random Background Image: The project now displays a random background image fetched from [Unsplash](https://unsplash.com/). The image changes dynamically based on the time of day and the user's viewport (landscape or portrait).
- Extension Directory: I have created an extension directory that can be added to the browser as a new tab page.
- Reverse Geocoding: The project now incorporates reverse geocoding to retrieve and display the current location of the user.

APIs used in this project:
- [IP Geolocation API](https://ipgeolocation.io/)
- [Getting IP address](https://www.ipify.org/)
- [Unsplash API](https://unsplash.com/developers)
- [Programming Quotes API](https://github.com/lukePeavey/quotable)
- [Reverse Geocoding API](https://www.geoapify.com/)


### Development
For this project, I initially decided to forgo using React and instead opted for Vanilla JavaScript, implementing the MVC pattern using JavaScript classes. This approach served as a valuable practice, and as the codebase grew, I realized the benefits of using React.

Regarding CSS, I utilized SCSS and adhered to the CUBE methodology to enhance class organization. Over time and through multiple projects, I found myself gravitating towards the use of utility classes. I appreciate how they expedite development and contribute to cleaner code, given that I can reuse these utility classes consistently. However, I noticed that for smaller projects, this approach can result in a larger CSS file. While I experimented with various uncss plugins, I didn't find one that fully met my needs.

Ultimately, I consider this challenge project from Frontend Mentor to be a significant accomplishment. It allowed me to acquire valuable knowledge, and I'm genuinely satisfied with the end result.
### Links

- Live Site URL - [Link](https://clockapp-martinkamir.netlify.app)
- My website - [Martin Kamír](https://martinkamir.com/)
- Frontend Mentor - [@Martin-K-Kamir](https://www.frontendmentor.io/profile/Martin-K-Kamir)
- Frontend Mentor Solution - [Solution link](https://www.frontendmentor.io/solutions/devfinder-app-js-scss-vite-pwa-zNcsGwcuwt)

Happy coding! 😄