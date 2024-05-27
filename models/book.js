const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	title: String,
	author: String,
	genre: String,
	description: String,
	price: Number,
	image: String,
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;