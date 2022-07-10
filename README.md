# Kyoto Manga - Free website to read comics!

![logo](https://res.cloudinary.com/lee1002/image/upload/v1656521375/personal/s3xxxnifckkingetv4p8.png)

## The official website is [Kyotomanga.live](http://kyotomanga.live/)

| Table content                                                          |
| ---------------------------------------------------------------------- |
| [Tech stack](https://github.com/leephan2k1/manga-app#tech-stack)       |
| [Inspiration](https://github.com/leephan2k1/manga-app#inspiration)     |
| [Screenshots](https://github.com/leephan2k1/manga-app#screenshots)     |
| [Project setup](https://github.com/leephan2k1/manga-app#project-setup) |
| [Plans](https://github.com/leephan2k1/manga-app#plans)                 |

## Tech stack

-   NextJS + ReactJS
-   Recoil
-   Mongodb
-   Next-auth
-   TailwindCSS + HeadlessUI

## Inspiration

### Name

Kyoto comes from the name of an old Japanese place. I was impressed by the beauty of Kyoto so I used this name

### Inspired UI

-   [Kaguya.live](https://kaguya.live/) (Also a manga website. But they have full anime and manga and more amazing)
-   [Zoro.to](https://zoro.to)
-   [Mangareader.to](https://mangareader.to/)
-   [Mangadex.org](https://mangadex.org)
-   [Project on Behance](https://www.behance.net/gallery/127797927/Manga-Reader-Website-design-freelance-project/modules/724762653?fbclid=IwAR0y_RgdUybLajZZMWpnDYUWxf1IHytDsrOSsJheEAopC-wmNVqzISjZatk)

### Refer other project nextjs

-   Special thanks: [Kaguya](https://github.com/hoangvu12/Kaguya)

## Screenshots

### Home page:

![home-page-kyoto-manga](https://res.cloudinary.com/lee1002/image/upload/v1656087170/personal/dqpi0v4gfsoj6kkwg7oc.png)

### Browse page:

-   Multiple layout:

![browse-page-mutilple-layout](https://res.cloudinary.com/lee1002/image/upload/v1656522858/personal/wo6mcb9ns4adr620gt6u.png)

-   Details layout:

![details-layout](https://res.cloudinary.com/lee1002/image/upload/v1656522973/personal/qjc3pznflejhthtysjbs.png)

-   Row layout:

![Column layout](https://res.cloudinary.com/lee1002/image/upload/v1656523036/personal/bsqssrxxxqgtvzes4hbm.png)

### Details page

![details page](https://res.cloudinary.com/lee1002/image/upload/v1656523136/personal/vzkbstxjgo62tvz8grxl.png)

### Read page

-   Desktop vertical:

![read-page-desktop-vertical](https://res.cloudinary.com/lee1002/image/upload/v1656523214/personal/j3usixubbkjcxtlpjk0k.png)

-   Desktop horizontal:

![read-page-desktop-hr](https://res.cloudinary.com/lee1002/image/upload/v1656523313/personal/wwqvuoud5dlcs6mqdlgz.png)

-   Mobile vertical:

![Mobile-vertical-read](https://res.cloudinary.com/lee1002/image/upload/v1656523418/personal/o9xlpliyd9blxjtq6lof.png)

-   Mobile horizontal:

![mobile-horizontal-reading](https://res.cloudinary.com/lee1002/image/upload/v1656523548/personal/ldcmg19fp3rzemo5a8oe.png)

### Login page

![login-page](https://res.cloudinary.com/lee1002/image/upload/v1656523611/personal/fuwgteshnqlftmzb3ssb.png)

### Follow page

![follow-page](https://res.cloudinary.com/lee1002/image/upload/v1656523730/personal/l554kot7wopcmm4zqznu.png)

### Search

![search ui](https://res.cloudinary.com/lee1002/image/upload/v1656523786/personal/ryzjmqmxlmpq2egyfwz5.png)

## Project setup

-   Enviroment Variables

```
# Node service (See: https://github.com/leephan2k1/manga-scraper)
NEXT_PUBLIC_BASE_URL=your-node-service
HOST_NAME=your-nextjs-host-name

# Mongodb: (See: https://www.mongodb.com/atlas/database)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster....
MONGODB_DB=your-db-name

# Note: Because i use next-auth You must provide callback uri for facebook and google has the following form: your-domain.com/api/auth/callback/<provider> .Otherwise the authentication won't work!

# Google Oauth2 (See: https://console.cloud.google.com/)
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-secret

# Facebook Oauth (See: https://developers.facebook.com/apps)
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-secret

# Random Secret (Easy generate: https://generate-secret.vercel.app/32)
JWT_SECRET=your-jwt-secret

```

## Plans:

-   [ ] save chapter
-   [x] automatically switch chapters
-   [ ] notify
-   [ ] comments
-   [x] add more source (+1 LHM)
-   [ ] import follow list from user anilist (public)
-   [ ] recommended from users
