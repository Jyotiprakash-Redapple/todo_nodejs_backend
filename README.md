# Todo (Backend And Frontend)

Todo full-stack application is built using a combination of technologies to handle both the server-side and client-side development. It leverages Node.js, a powerful JavaScript runtime, and Express.js, a web application framework, to handle the server-side logic and API endpoints. On the client-side, React.js, a popular JavaScript library for building user interfaces, is used to create a dynamic and responsive user experience.

Node.js and Express.js handle the backend logic, including API endpoints, authentication, database interactions, and business logic implementation. Mongoose acts as the bridge between the application and the MongoDB database, allowing easy modeling and querying of data. On the client-side, React.js takes care of rendering the user interface, handling user interactions, and communicating with the server through API requests.

## API Reference

### Aunthication :

### Base Uri : http://localhost:3030

#### Sign Up

```http
  POST /api/v1/auth/signUp
```

| Parameter  | Type     | Description |
| :--------- | :------- | :---------- |
| `email`    | `string` | Required    |
| `name`     | `string` | Required    |
| `password` | `string` | Required    |

#### Sign In

```http
  Get /api/v1/auth/signIn
```

| Parameter  | Type     | Description |
| :--------- | :------- | :---------- |
| `email`    | `string` | Required    |
| `password` | `string` | Required    |

### Authorization :

#### Get Current Log In User Info

```http
  GET /api/v1/auth/whoAmI
```

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `auth`    | `string` | **Required**. Token For Authorization In Header |

### Todo :

#### Get all todo list

```http
  GET /api/v1/todo/getAll
```

| Parameter  | Type     | Description                                     |
| :--------- | :------- | :---------------------------------------------- |
| `auth`     | `string` | **Required**. Token For Authorization In Header |
| `page`     | `Number` | **Optional**. page in Query                     |
| `pageSize` | `Number` | **Optional**. PageSize in query                 |

#### Add Todo

```http
  POST /api/v1/todo/add
```

| Parameter     | Type     | Description                                     |
| :------------ | :------- | :---------------------------------------------- |
| `auth`        | `string` | **Required**. token For Authorization In Header |
| `description` | `string` | **Required**. Description In Body               |

#### Modify One Todo

```http
  POST /api/v1/todo/modify
```

| Parameter     | Type     | Description                                     |
| :------------ | :------- | :---------------------------------------------- |
| `auth`        | `string` | **Required**. token For Authorization In Header |
| `todo_id`     | `string` | **Required**. id in Body For Modify Todo        |
| `description` | `string` | **Required**. Description In Body               |

#### Delete One Todo

```http
  Delete /api/v1/todo/delete
```

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `auth`    | `string` | **Required**. token For Authorization In Header |
| `todo_id` | `string` | **Required**. id in Body For Modify Todo        |

### DEVELOPEMENT

#### Get all User List

```http
  GET api/v1/dev/getAllUser
```

| Parameter  | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `page`     | `Number` | **Optional**. page in Query     |
| `pageSize` | `Number` | **Optional**. PageSize in query |

## Tech Stack

                                                   |

**Server:**
| dependencies | Version | Description |
| :-------- | :------- | :-------------------------------- |
| `mongodb` | `^5.2.0` | MongoDB is a cross-platform document-oriented database program. |
| `express` | `^4.18.2` | is a back end web application framework for building RESTful APIs with Node.js. |
| `mongoose` | `^7.0.3` | mongoose is a JavaScript object-oriented programming library that creates a connection between MongoDB and the Node.js JavaScript runtime environment |
| `bcryptjs` | `^2.4.3` | to hash and verify passwords in Node. js.|
|`cors`| `^2.8.5` | CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
|`dotenv`|`^16.0.3`| loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
|`jsonwebtoken`|`^9.0.0`| JSON Web Token is a proposed Internet standard for creating data with optional signature and/or optional encryption whose payload holds JSON that asserts some number of claims. The tokens are signed either using a private secret or a public/private key.
|`helmet`| `^6.1.5` | helps secure Express apps by setting HTTP response headers.
|`morgan` | `1.10.0` | HTTP request logger middleware for node.js |

## Run Locally

Clone the project

```bash
  git clone https://github.com/hellojyoti01/
```

Go to the project directory

```bash
  cd
```

Install dependencies

```bash
   yarn install
```

Start the server

```bash
  yarn dev
```

## Demo

![alt text](./screen-capture.gif)

## Documentatio

https://scribehow.com/shared/How_to_Sign_Up_and_Create_a_Contact_Form__dUy_XHJxTVKGLhHVCuWtaA

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`=`6050`
`ENVIROMENT`=`DEVELOPEMENT`

## Features

- user create account and sign in
- Fullscreen mode
- Responsive for max device
- Cross platform
- add, get, modifay, delete Todo

## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

### Hi 👋, I'm Jyotiprakash Panigrahi

A passionate frontend and Backend 👨‍💻 🚀 developer from India

- 🔭 I’m currently working on [FullStack Project](https://github.com/hellojyoti01/backend-social-tech_)

- 🌱 I’m currently learning NodeJS and MongoDB

- ❓ Ask me about anything related to MERN stack and related technologies

- 📫 How to reach me **jyotiprakash.panigrahi055@gmail.com**

- 📄 Know about my experiences [https://drive.google.com/file/d/1zG-IHLqs93fEV5-rJOh8MP-z7Tdy_ozR/view?usp=sharing](https://drive.google.com/file/d/1zG-IHLqs93fEV5-rJOh8MP-z7Tdy_ozR/view?usp=sharing)

- ⚡ Fun fact: I use tabs over spaces

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://hellojyoti01.github.io/portfolio_website/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hellojyoti/)

## Authors

- [@hellojyoti01](https://github.com/hellojyoti01/)

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Documentation

[Documentation](https://scribehow.com/shared/How_to_Sign_Up_and_Create_a_Contact_Form__dUy_XHJxTVKGLhHVCuWtaA)
