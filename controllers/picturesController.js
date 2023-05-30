const axios = require("axios");

const BASE_URL =
  "https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=$";

exports.getAllPictures = async (req, res) => {
  const response = await axios.get(`${BASE_URL}${req.query.category}`);

  const picturesFound = response.data.hits;

  if (!picturesFound.length) {
    return res.status(404).json({ message: "Pictures not found!" });
  }

  //sort by id
  const sortedItems = picturesFound.sort((prev, next) => next.id - prev.id);

  // pagination
  const page = parseInt(req.query.page) || 1; // Current page number
  const limit = 9; // Number of items per page

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Slice the items array based on the start and end indexes
  const paginatedItems = sortedItems.slice(startIndex, endIndex);

  const total = Math.ceil(sortedItems.length / limit);

  res.json({ status: "success", data: paginatedItems, total });
};
