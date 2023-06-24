# - Books Management Project

The Technetium Books Management project is a web application designed to manage books and user reviews. It provides a set of APIs for user registration, login, book creation, book retrieval, book updating, book deletion, and book reviews. The project aims to facilitate efficient management of books and enable users to share their reviews and ratings.

## Project Structure

The project is organized into three main models:

1. User Model: Represents user information, including title, name, contact details, address, and timestamps for creation and update.

2. Books Model: Represents book information, including title, excerpt, user ID, ISBN, category, subcategory, review count, deletion status, release date, and timestamps for creation and update.

3. Review Model: Represents book reviews, including the book ID, reviewer's name, review timestamp, rating, review text, deletion status, and timestamps for creation and update.

## User APIs

- **POST /register**: Creates a new user with the provided information.
- **POST /login**: Allows a user to log in using their email and password.
  

### Models
- User Model
```yaml
{ 
  title: {string, mandatory, enum[Mr, Mrs, Miss]},
  name: {string, mandatory},
  phone: {string, mandatory, unique},
  email: {string, mandatory, valid email, unique}, 
  password: {string, mandatory, minLen 8, maxLen 15},
  address: {
    street: {string},
    city: {string},
    pincode: {string}
  },
  createdAt: {timestamp},
  updatedAt: {timestamp}
}
```

- Books Model
```yaml
{ 
  title: {string, mandatory, unique},
  excerpt: {string, mandatory}, 
  userId: {ObjectId, mandatory, refs to user model},
  ISBN: {string, mandatory, unique},
  category: {string, mandatory},
  subcategory: {string, mandatory},
  reviews: {number, default: 0, comment: Holds number of reviews of this book},
  deletedAt: {Date, when the document is deleted}, 
  isDeleted: {boolean, default: false},
  releasedAt: {Date, mandatory, format("YYYY-MM-DD")},
  createdAt: {timestamp},
  updatedAt: {timestamp},
}
```

- Review Model (Books review)
```yaml
{
  bookId: {ObjectId, mandatory, refs to book model},
  reviewedBy: {string, mandatory, default 'Guest', value: reviewer's name},
  reviewedAt: {Date, mandatory},
  rating: {number, min 1, max 5, mandatory},
  review: {string, optional}
  isDeleted: {boolean, default: false},
}
```


## Books API

- **POST /books**: Creates a new book with the provided information.
- **GET /books**: Retrieves all books that are not marked as deleted.
- **GET /books/:bookId**: Retrieves detailed information about a specific book, including its reviews.
- **PUT /books/:bookId**: Updates a specific book by changing its title, excerpt, release date, or ISBN.
- **DELETE /books/:bookId**: Marks a specific book as deleted.

## Review APIs

- **POST /books/:bookId/review**: Creates a new review for a specific book.
- **PUT /books/:bookId/review/:reviewId**: Updates a specific review for a book.
- **DELETE /books/:bookId/review/:reviewId**: Marks a specific review as deleted for a book.

## Setup and Configuration

1. Clone the Technetium Books Management project repository from GitHub.
2. Install the required dependencies by running `npm install` in the project's root directory.
3. Configure the database connection settings in the project's configuration file.
4. Start the application by running `npm start` in the project's root directory.
5. The application will start and be accessible at the configured URL and port.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)
- Mongoose
- RESTful APIs
- bcrypt
- validtor
- dotenv



## Response

### Successful Response structure
```yaml
{
  status: true,
  message: 'Success',
  data: {

  }
}
```
### Error Response structure
```yaml
{
  status: false,
  message: ""
}
```

## Collections
## users
```yaml
{
  status: true,
  data: {
          _id: ObjectId("88abc190ef0288abc190ef02"),
          title: "Mr",
          name: "John Doe",
          phone: 9897969594,
          email: "johndoe@mailinator.com", 
          password: "abcd1234567",
          address: {
            street: "110, Ridhi Sidhi Tower",
            city: "Jaipur",
            pincode: "400001"
                   },
          "createdAt": "2021-09-17T04:25:07.803Z",
          "updatedAt": "2021-09-17T04:25:07.803Z",
         }
}
```
### Successful Login Response structure
```yaml
{
  status: true,
  data: {
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JJZCI6IjYyZmUzYmUzMzY2ZmFkNDZjY2Q1MzI3ZiIsImlhdCI6MTY2MDgzMDA4MywiZXhwIjoxNjYwODY2MDgzfQ.mSo-TLyRlGhMNcy4ftEvvIlCHlyEqpaFZc-iBth4lfg"

  }
}
```
### books
```yaml
{
  status: true,
  data:{
        "_id": ObjectId("88abc190ef0288abc190ef55"),
        "title": "How to win friends and influence people",
        "excerpt": "book body",
        "userId": ObjectId("88abc190ef0288abc190ef02"),
        "ISBN": "978-0008391331",
        "category": "Book",
        "subcategory": "Non fiction",
        "isDeleted": false,
        "reviews": 0,
        "releasedAt": "2021-09-17"
        "createdAt": "2021-09-17T04:25:07.803Z",
        "updatedAt": "2021-09-17T04:25:07.803Z",
      }
}
```

### reviews
```yaml
{
  "_id": ObjectId("88abc190ef0288abc190ef88"),
  bookId: ObjectId("88abc190ef0288abc190ef55"),
  reviewedBy: "Jane Doe",
  reviewedAt: "2021-09-17T04:25:07.803Z",
  rating: 4,
  review: "An exciting nerving thriller. A gripping tale. A must read book."
}
```

## Response examples
### Get books response
```yaml
{
  status: true,
  message: 'Books list',
  data: [
    {
      "_id": ObjectId("88abc190ef0288abc190ef55"),
      "title": "How to win friends and influence people",
      "excerpt": "book body",
      "userId": ObjectId("88abc190ef0288abc190ef02")
      "category": "Book",
      "reviews": 0,
      "releasedAt": "2021-09-17T04:25:07.803Z"
    },
    {
      "_id": ObjectId("88abc190ef0288abc190ef56"),
      "title": "How to win friends and influence people",
      "excerpt": "book body",
      "userId": ObjectId("88abc190ef0288abc190ef02")
      "category": "Book",
      "reviews": 0,
      "releasedAt": "2021-09-17T04:25:07.803Z"
    }
  ]
}
```

### Book details response
```yaml
{
  status: true,
  message: 'Books list',
  data: {
    "_id": ObjectId("88abc190ef0288abc190ef55"),
    "title": "How to win friends and influence people",
    "excerpt": "book body",
    "userId": ObjectId("88abc190ef0288abc190ef02")
    "category": "Book",
    "subcategory": ["Non fiction", "Self Help"],
    "isDeleted": false,
    "reviews": 4,
    "releasedAt": "2021-09-17T04:25:07.803Z"
    "createdAt": "2021-09-17T04:25:07.803Z",
    "updatedAt": "2021-09-17T04:25:07.803Z",
    "reviewsData": [
      {
        "_id": ObjectId("88abc190ef0288abc190ef88"),
        bookId: ObjectId("88abc190ef0288abc190ef55"),
        reviewedBy: "Jane Doe",
        reviewedAt: "2021-09-17T04:25:07.803Z",
        rating: 4,
        review: "An exciting nerving thriller. A gripping tale. A must read book."
      },
      {
        "_id": ObjectId("88abc190ef0288abc190ef89"),
        bookId: ObjectId("88abc190ef0288abc190ef55"),
        reviewedBy: "Jane Doe",
        reviewedAt: "2021-09-17T04:25:07.803Z",
        rating: 4,
        review: "An exciting nerving thriller. A gripping tale. A must read book."
      },
      {
        "_id": ObjectId("88abc190ef0288abc190ef90"),
        bookId: ObjectId("88abc190ef0288abc190ef55"),
        reviewedBy: "Jane Doe",
        reviewedAt: "2021-09-17T04:25:07.803Z",
        rating: 4,
        review: "An exciting nerving thriller. A gripping tale. A must read book."
      },
      {
        "_id": ObjectId("88abc190ef0288abc190ef91"),
        bookId: ObjectId("88abc190ef0288abc190ef55"),
        reviewedBy: "Jane Doe",
        reviewedAt: "2021-09-17T04:25:07.803Z",
        rating: 4,
        review: "An exciting nerving thriller. A gripping tale. A must read book."
      }, 
    ]
  }
}
```

### Book details response no reviews
```yaml
{
  status: true,
  message: 'Books list',
  data: {
    "_id": ObjectId("88abc190ef0288abc190ef55"),
    "title": "How to win friends and influence people",
    "excerpt": "book body",
    "userId": ObjectId("88abc190ef0288abc190ef02")
    "category": "Book",
    "subcategory": "Non fiction", "Self Help"],
    "isDeleted": false,
    "reviews": 0,
    "releasedAt": "2021-09-17"
    "createdAt": "2021-09-17T04:25:07.803Z",
    "updatedAt": "2021-09-17T04:25:07.803Z",
    "reviewsData": []
  }
}
```
### Delete Response Structure
```yaml
{
  status: true,
  message: ""
}
```
### Review Response Structure
```yaml
{
    "status": true,
    "message": "Review added successfully",
    "data": {
        "reviews": 2,
        "isDeleted": false,
        "_id": "63ede089c7c6ef5f68ca5360",
        "title": "Wings of Fire 8347",
        "excerpt": "Free will",
        "userId": "63ede081c7c6ef5f68ca5356",
        "ISBN": "1001078",
        "category": "Science",
        "subcategory": "Life Science",
        "releasedAt": "1990-12-20T00:00:00.000Z",
        "createdAt": "2023-02-16T07:51:37.348Z",
        "updatedAt": "2023-02-16T07:51:47.075Z",
        "__v": 0,
        "reviewsData": {
            "reviewedBy": "Jack",
            "isDeleted": false,
            "_id": "63ede093c7c6ef5f68ca5367",
            "bookId": "63ede089c7c6ef5f68ca5360",
            "rating": 3,
            "review": "very good",
            "reviewedAt": "2023-02-16T07:51:47.029Z",
            "createdAt": "2023-02-16T07:51:47.031Z",
            "updatedAt": "2023-02-16T07:51:47.031Z",
            "__v": 0
        }
    }
}
```

## Conclusion

The Technetium Books Management project provides a robust and scalable solution for managing books and user reviews. By utilizing the provided APIs, users can register, log in, create books, retrieve book information, update books, delete books, and submit reviews. The project is built using modern web technologies and follows industry-standard best practices for security and performance.

For any further assistance or questions, please don't hesitate to contact the project maintainers.

Thank you for using my Books Management!
