# Front-End E-commerce Project

![](https://camo.githubusercontent.com/2a2978d145faf7cdcd17d6ce34255492ec41e691923b5d83861ad737f7a14974/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656163742d762e31382d626c7565)
![](https://camo.githubusercontent.com/62f999bcedf010f2692b9221d41934ae1f8a5730beb503c1410faf588daa0b73/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656475782d762e312e392d707572706c65)
![](https://camo.githubusercontent.com/2bf36eec8ef29949a861bc870dbe16640929821eb995924d0a31b28e6ec1d407/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f547970655363726970742d762e342e392d677265656e)
![](https://camo.githubusercontent.com/225d35772b9751928d12ee689bccb63956b6ce97d056fcabfef0b2a63a9ef30c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f534153532d762e342e392d686f7470696e6b)

## Content

- About
- Features
- Website Pages
- Deployed Website Link
- Steps to run the code
- ScreenShots
- Structure

## About

Create an e-commerce website using [ https://fakeapi.platzi.com/ ]( https://fakeapi.platzi.com/ )

## Features

- Fetch all/single products.
- Sort products by price and title.
- Update/delete products. 
- User login/logout and register.
- Update User profile.
- Add product to cart and remove product from cart.
- Includes feature to switch between dark/light themes.
- Testing unit for the reducers.
- Responsive for small display (designed for both laptop and mobile display (400 x 600)).

## Login in as admin

`email`: admin@mail.com
`password`: admin123

## Website Pages

- `/`: displays general information
- `/products`: includes all products and allow user to search and sort products
- `/products/:id`: contain information on a single product and has features that allow `admins` to delete or edit that specific product. The delete and edit features are not displayed to `customers`.
- `/cart`: allow users to view products added to the cart. Users can edit the count or remove product from there.
- `/signin` and `/signout`: allow users to login in or register a new account.
- `/createproduct`: allow any user to create a new product "even Guest users for now".
- `/profile`: view user profile. This route can only be accessed when user is logged in.
- `/*`: Not found page

## Deloyed Link

[https://frontend-project-bessawy.vercel.app ](https://frontend-project-bessawy.vercel.app)

## Steps to run the Code

- Clone the repository to your local machine.
- install dependencies: `npm install`
- run the test scripts: `yarn test`
- run the project: `yarn start`

## Screen-shots 

![](/screenshots/home1.PNG)
![](/screenshots/home2.PNG)
![](/screenshots/product.PNG)
![](/screenshots/product2.PNG)
![](/screenshots/productinfo.PNG)
![](/screenshots/createproduct.PNG)
![](/screenshots/signin.PNG)
![](/screenshots/signup.PNG)
![](/screenshots/userprofile.PNG)
![](/screenshots/smalldisplay.PNG)
![](/screenshots/display2.PNG)

## Structure

```
├───public
│       clothes.jpg
│       electronics.jpg
│       favicon.ico
│       furniture.jpg
│       index.html
│       laptop.jpg
│       Logo.png
│       manifest.json
│       razor.jpg
│       robots.txt
│       shoes.jpg
│
└───src
    │   App.tsx
    │   index.tsx
    │   react-app-env.d.ts
    │
    ├───features
    │       drawerComp.tsx
    │
    ├───Images
    │       black-wallpaper.jpg
    │       login.png
    │       Logo.png
    │       white-wallpaper.jpg
    │
    ├───Pages
    │   │   home.tsx
    │   │   notfound.tsx
    │   │   routes.tsx
    │   │   utils.ts
    │   │
    │   ├───cart
    │   │       Cart.tsx
    │   │
    │   ├───product
    │   │       createproduct.tsx
    │   │       product.tsx
    │   │       productEditForm.tsx
    │   │       products.tsx
    │   │       product_info.tsx
    │   │       product_utils.ts
    │   │
    │   ├───slider
    │   │       slider.scss
    │   │       slider.tsx
    │   │
    │   └───userlog
    │           login.tsx
    │           profilePage.tsx
    │           protectedroutes.tsx
    │           register.tsx
    │
    ├───redux
    │   │   store.ts
    │   │
    │   └───reducers
    │           cartReducer.ts
    │           productReducer.ts
    │           themeModeReducer.ts
    │           userReducer.ts
    │
    ├───reduxhook
    │       hooks.ts
    │
    ├───routes
    │       routes.tsx
    │       
    ├───Styles
    │       app.scss
    │
    ├───test
    │   ├───reducers
    │   │       cartReducer.test.ts
    │   │       productReducer.test.ts
    │   │       userReducer.test.ts
    │   │
    │   └───shared
    │           server.ts
    │
    ├───Themes
    │       badgeTheme.ts
    │       darkTheme.ts
    │       gridTheme.ts
    │       lightTheme.ts
    │
    └───Types
            product.ts
            routes.ts
            user.ts
```

