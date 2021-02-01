function createCounterObjectForGenresOf(booksArr) {
  return booksArr.reduce((accumObj, { genre: genreStr }) => {
    // 1. get the genre of the current book
    // 2. if the property exists, add 1 to the count, otherwise set it to 1
    accumObj[genreStr] = accumObj[genreStr] ? accumObj[genreStr] + 1 : 1;
    return accumObj;
  }, {});
}
module.exports = { createCounterObjectForGenresOf };
