import pool from '../config/postgresdb.js';

export const getAllBooks = async () => {
  const { rows } = await pool.query('SELECT * FROM books ORDER BY created_at DESC');
  return rows;
};

export const getBookById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM books WHERE _id = $1', [id]);
  return rows[0];
};

export const createBook = async (bookData) => {
  const { rows } = await pool.query(
    `INSERT INTO books (
      title, author, description, cover_image, documentType, 
      genre, isbn, published_year, publisher, price
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
    RETURNING *`,
    [
      bookData.title,
      bookData.author,
      bookData.description,
      bookData.cover_image,
      bookData.documentType,
      bookData.genre,
      bookData.isbn,
      bookData.published_year,
      bookData.publisher,
      bookData.price
    ]
  );
  return rows[0];
};

export const updateBook = async (id, bookData) => {
  const { rows } = await pool.query(
    `UPDATE books 
    SET 
      title = $1,
      author = $2,
      description = $3,
      cover_image = $4,
      documentType = $5,
      genre = $6,
      isbn = $7,
      published_year = $8,
      publisher = $9,
      price = $10
    WHERE _id = $11
    RETURNING *`,
    [
      bookData.title,
      bookData.author,
      bookData.description,
      bookData.cover_image,
      bookData.documentType,
      bookData.genre,
      bookData.isbn,
      bookData.published_year,
      bookData.publisher,
      bookData.price,
      id
    ]
  );
  return rows[0];
};

export const deleteBook = async (id) => {
  const { rows } = await pool.query(
    'DELETE FROM books WHERE _id = $1 RETURNING *',
    [id]
  );
  return rows[0];
};

export const incrementDownloads = async (id) => {
  const { rows } = await pool.query(
    'UPDATE books SET downloads = downloads + 1 WHERE _id = $1 RETURNING *',
    [id]
  );
  return rows[0];
};

export const incrementLikes = async (id) => {
  const { rows } = await pool.query(
    'UPDATE books SET likes = likes + 1 WHERE _id = $1 RETURNING *',
    [id]
  );
  return rows[0];
};