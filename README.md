# Fullstack Project

![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.4-hotpink)
![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/Redux-v.1.9-brown)
![.NET Core](https://img.shields.io/badge/.NET%20Core-v.7-purple)
![EF Core](https://img.shields.io/badge/EF%20Core-v.7-cyan)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v.14-drakblue)

* Frontend: SASS, TypeScript, React, Redux Toolkit
* Backend: ASP .NET Core, Entity Framework Core, PostgreSQL

## About

* This is project is about the development of Full-stack ecommerce website using react for the front-end and Microsoft entity-framework for the back-end.

* This readme file only talk about back-end server. More details about front-end can be found in the readme at the frontend file.

## Setting Up `Backend Server`

1. This project uses `.Net core 6` - congifure dependencies based on version used.

2. Install all the needed packages:

    * Microsoft.EntityFrameworkCore
    * Microsoft.EntityFrameworkCore.Design
    * Microsoft.IdentityModel.Tokens
    * Microsoft.AspNetCore.Identity.EntityFrameworkCore
    * Microsoft.AspNetCore.Authentication.Certificate
    * Microsoft.AspNetCore.Authentication.JwtBearer
    * Microsoft.AspNetCore.Authentication.Google
    * Npgsql.EntityFrameworkCore.PostgreSQL
    * Swashbuckle.AspNetCore
    * System.IdentityModel.Tokens.Jwt
    * Google.Apis.Auth
    * EFCore.NamingConventions

3. Run using: `dotnet run` command. 

4. Change the `config files` for your environment. (ex. Database connection)

## End-points for `Backend Server`

The end-points can be viewed by:

* Runing the server.
* Runing swagger: `https://{server-address}/Swagger`.
* `server-address` can be the localhost if run locally or the deployment server.

## Features for `Backend Server`
    
Entities, Relationships, Database

1. Entities:

    * Users
    * Products
    * CartItems
    * Categories
    * Reviews

2. Entities Relationships:

    * Categories -> Products : (one-many)
    * Users -> Reviews : (one-many)
    * Products -> Reviews : (one-many)
    * Users -> CartItems : (one-many)
    * Products -> CartItems : (one-many)

3. Database:

    * Based on relational database: Postgresql.

3. Controllers:

    * ProductController:
        - Get all products.
        - Get all products filters by search keyword.
        - Get all product sorted by price or title in asc|desc.
        - Get specific products given {id}.
        - Create new product.
        - Delete a product given {id}.
        - Update a product.
        - Get all reviews for a product.

    * CategoryController:

        - Get all Categories.
        - Get all Products for a given category {id}.
        - Create new category.
        - Delete a category.
        - Update a category.
    
    * GoogleController:

        - Allow user to Login using google account.
        - It takes a token, and varify it with the google server.
        - Returns a token for the registered user.

    * ReviewController:

        - Create a review for a product {id}.
        - Delete a review for a product {id}.
        - Get user review for a product {id}.
    
    * UserControlelr:

        - Allow user to signup for a new account.
        - Allow user to login using a registered account.
        - Get user profile.
        - Update user profile.
        - Update user password.

    * CartController:

        - Get cart items.
        - Decrease items from cart.
        - Add items to cart.

4. Authentication & Authorization:  

    * when you login with the user two different bearer token can be returned
        - Admin token.
        - Customer token.

    * Any user can Get all products, categories and reviews.
    
    * Customer or Admins token needed to:

        - Add a single review for a product.
        - Delete the user's review.
        - Access user profile.
        - Update user info/password.
        - Create a new product.
    
    * Admin tokens used to:

        - Delete a product/category.
    
## FileStructure

Project Layers:

    * Models & DTOs.
    * Controllers -> Services -> Database.
    * Repositories is not used since the logic in services is simple and thus another layer that handles database quries separately is not need.

```
C:.
│   appsettings.Development.json
│   appsettings.json
│   Ecommerce.csproj
│   Program.cs
│
├───Common
│       PasswordAttribute.cs
│       QueryParamAttribute.cs
│
├───Controllers
│       ApiControllerBase.cs
│       CartController.cs
│       CategoryController.cs
│       CrudController.cs
│       GoogleController.cs
│       ProductController.cs
│       ReviewController.cs
│       UserController.cs
│
├───Db
│       AppDbContext.cs
│       AppDbContextSaveChangesInterceptor.cs
│       IdentityConfigExtension.cs
│       PropertyConfigExtension.cs
│
├───DTOs
│   │   BaseDTO.cs
│   │   CartDTO.cs
│   │   CategoryDTO.cs
│   │   EmailRequestDTO.cs
│   │   ProductDTO.cs
│   │   ReviewDTO.cs
│   │
│   └───UserDTO
│           ChangePasswordDTO.cs
│           EmailDTO.cs
│           UserDTO.cs
│           UserSignInDTO.cs
│           UserSignUpRequestDTO.cs
│
├───Migrations
│       20230315151348_DatabaseV1.0.cs
│       20230315151348_DatabaseV1.0.Designer.cs
│       AppDbContextModelSnapshot.cs
│
├───Models
│       BaseModel.cs
│       CartItem.cs
│       Category.cs
│       JwtTokenSetting.cs
│       PasswordSetting.cs
│       Product.cs
│       Review.cs
│       User.cs
│
└───Services
    │   ICartService.cs
    │   ICategoryService.cs
    │   ICrudService.cs
    │   IProductService.cs
    │   IReviewService.cs
    │   IRoleService.cs
    │   ISearchForignID.cs
    │   ITokenService.cs
    │   IUserService.cs
    │
    └───Impl
            CartService.cs
            DbCategoryService.cs
            DbCrudService.cs
            DbProductService.cs
            ReviewService.cs
            RoleService.cs
            TokenService.cs
            UserService.cs
```