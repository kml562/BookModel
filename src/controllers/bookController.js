import { isValidObjectId } from "mongoose";
import { checkISBN, isValid } from "../utils/validatior/validatior.js";
import BookModel from "../model/bookModel.js";
import moment from "moment";

export const createBooks = async (req, res) => {
  try {
    const { title, excerpt, userId, ISBN, category, subcategory, reviews } = req.body;

    if (!title || !excerpt || !userId || !category || !subcategory || !ISBN) {
      return res
        .status(400)
        .json({ status: false, message: "fill all the required fields" });
    }
    if (!isValid(userId)) {
      return res
        .status(400)
        .json({ status: false, message: "user Id invalid" });
    }
    if (!isValidObjectId(userId)) {
      return res
        .status(400)
        .json({ status: false, messsage: "please provide valid user Id" });
    }

    const bookData = req.body;
    bookData.isDeleted = false;
    // when book is created then it will be released-----------------------------------------
    bookData.releasedAt = moment().format("YYYY-MM-DD");
    const checkbook = await BookModel.findOne({
      $or: [{ title: title }, { ISBN: ISBN }],
    });
    if (checkbook) {
      return res
        .status(400)
        .json({ status: false, messsage: "book already exists" });
    }
    const data = await BookModel.create(bookData);
    res.status(201).json({ status: true, data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Returns all books in the collection that aren't deleted. Return only book _id, title, excerpt, userId, category, releasedAt, reviews field. Response example here
// Return the HTTP status 200 if any documents are found. The response structure should be like this
// If no documents are found then return an HTTP status 404 with a response like this
// Filter books list by applying filters. Query param can have any combination of below filters.
// By userId
// By category
// By subcategory example of a query url: books?filtername=filtervalue&f2=fv2
// Return all books sorted by book name in Alphabatical order
export const getbooks = async (req, res) => {
  try {
    const { userId, category, subcategory } = req.query;
    let crad = { isDeleted: false };
    if (userId) {
      //if userid exists then check for the validation-------------------------------------------------------------------
      if (!isValid(userId)) {
        return res
          .status(400)
          .json({ status: false, message: "user Id invalid" });
      }
      if (!isValidObjectId(userId)) {
        return res
          .status(400)
          .json({ status: false, messsage: "please provide valid user Id" });
      }
      crad.userId = userId;
    }
    if (category) {
      crad.category = category;
    }
    if (subcategory) {
      crad.subcategory = subcategory;
    }

    const data = await BookModel.find(crad)
      .select({
        _id: 1,
        title: 1,
        excerpt: 1,
        userId: 1,
        category: 1,
        releasedAt: 1,
        reviews: 1,
      })
      .sort({ title: 1 });
    if (data.length === 0) {
      return res.status(404).json({ status: false, message: "no such books" });
    }
    return res.status(200).json({
      status: true,
      message: "Books list",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Returns a book with complete details including reviews. Reviews array would be in the form of Array. Response example here
// Return the HTTP status 200 if any documents are found. The response structure should be like this
// If the book has no reviews then the response body should include book detail as shown here and an empty array for reviewsData.
// If no documents are found then return an HTTP status 404 with a response like this

export const getbookId = async (req, res) => {
  try {
    let bookId = req.params.bookId;
    if (!isValid(bookId)) {
        return res.status(400).json({
          status: false,
          message: "Invalid bookID, please enter a valid ID",
        });
      }

    let book = await BookModel.findOne({ _id: bookId, isDeleted: false });
    if (!book) {
      return res
        .status(404)
        .json({ status: false, message: "Book does not exist with this ID" });
    }

    let review = await reviewModel.find({ bookId: bookId, isDeleted: false });

    book.review = review;
    return res.status(200).json({ status: true, data: book });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Update a book by changing its
// title
// excerpt
// release date
// ISBN
// Make sure the unique constraints are not violated when making the update
// Check if the bookId exists (must have isDeleted false and is present in collection). If it doesn't, return an HTTP status 404 with a response body like this
// Return an HTTP status 200 if updated successfully with a body like this
// Also make sure in the response you return the updated book docu

export const updateBook = async (req, res) => {
  try {
      let bookId = req.params.bookId;
      if (!isValid(bookId)) {
        return res.status(400).json({
          status: false,
          message: "Invalid bookID, please enter a valid ID",
        });
      }
    let data = req.body;
    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .json({ status: false, message: "provide data in body to update" });
    }
    let obj = {};

    //checking types of  all the feilds------------------------------------------------------------
    if (data.title) {
      if (typeof data.title != "string") {
        return res
          .status(400)
          .json({ message: "please Enter title in a string format" });
      }
      data.title = data.title.trim();

      if (validator.isNumeric(data.title))
        return res
          .status(400)
          .json({ status: false, message: "Book title cannot be numbers only" });
    }

    if (data.excerpt) {
      if (typeof data.excerpt !== "string") {
        return res
          .status(400)
          .json({ message: "please Enter data.excerpt in a string format" });
      }
      data.excerpt = data.excerpt.trim();
      if (data.excerpt != "") obj.excerpt = data.excerpt;
    }

    if (data.ISBN) {
      data.ISBN = data.ISBN.trim();
      if (typeof data.ISBN != "string") {
        return res
          .status(400)
          .json({ message: "please Enter ISBN in a string format" });
      }

      if (!checkISBN(data.ISBN)) {
        return res
          .status(400)
          .json({ status: false, message: `ISBN is Not valid.` });
      }
    }
    // relleasedAt key-------------------------------------------------------------------
    if (data.releasedAt) {
      if (moment(data.releasedAt).format("YYYY-MM-DD") != data.releasedAt)
        return res
          .status(400)
          .json({ status: false, message: "Enter date in YYYY-MM-DD" });
      obj.releasedAt = data.releasedAt;
    }

    // title and ISBN is alreday present or not--------------------------------------------
    if (data.title) {
      let booksData = await BookModel.findOne({ title: data.title });
      if (booksData) {
        return res
          .status(400)
          .json({ status: false, message: "Book with this title already exists" });
      }

      obj.title = data.title;
    }

    if (data.ISBN) {
      let ISBNdata = await BookModel.findOne({ ISBN: data.ISBN });
      if (ISBNdata) {
        return res
          .status(400)
          .json({ status: false, message: "Book with this ISBN already exists" });
      }
      obj.ISBN = data.ISBN;
    }
    // to check in the end user has passed something or not  after ignoring spaces------------
    if (Object.keys(obj).length == 0)
      return res
        .status(400)
        .json({ status: false, message: "please provide something to update" });

    let update = await BookModel.findOneAndUpdate(
      { _id: bookId, isDeleted: false },
      obj,
      { new: true }
    );

    return res.status(200).json({ status: true, data: update });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};


// delete-----------------------------------------------------------------------------
export const deletedbyId = async function (req, res) {
  try {
      let bookId = req.params.bookId;
      if (!bookId) {
          return res.status(400).json({ status:false,error:'bookId is required' });
      };
      if (!isValid(bookId)){
          return res.status(400).json({
              status: false,
              message: "Invalid bookID, please enter a valid ID",
          });}
          
    let deletedbybookid = await BookModel.findOneAndUpdate(
      { _id: bookId, isDeleted: false },
      { isDeleted: true, DeletedAt:moment.format('YYYY-MM-DD HH:mm:ss') }
    );
    if (!deletedbybookid)
      return res
        .status(404)
        .json({ status: false, message: "no book document found" });

    return res
      .status(200)
      .json({ status: true, message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};
