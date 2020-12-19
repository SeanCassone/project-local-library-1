function totalBooksCount(books) {
  // return the length of books
  return books.length;
}

function totalAccountsCount(accounts) {
  // return the length of accounts
  return accounts.length;
}

function booksBorrowedCount(books) {
  // 1. filter the books to have only unreturned items
  // 2. return length of the filtered array.
  return books.filter(({ borrows }) => {
    const [currentBookStatus] = borrows;
    return !currentBookStatus.returned;
  }).length;
}

// I use this multiple times. This is nice and DRY isn't it?
function topFiveObjsUsingCount(arrOfObjects) {
  // 1. Sort the array by count
  const sortedArr = [...arrOfObjects].sort(
    ({ count: countA }, { count: countB }) => {
      return countA > countB ? -1 : 1;
    }
  );
  // 2. slice the first 5 largest counts and return it
  return sortedArr.slice(0, 5);
}

function mostCommonGenres(books) {
  // 1. get a counter object of genre pointing to counts
  const genreCountsObj = createCounterObjectForGenresOf(books);
  // 2. map the keys of genreCountsObj to array of objects with name and counts
  //    as keys
  const genreNameAndCounts = Object.keys(genreCountsObj).map((key) => {
    return { name: key, count: genreCountsObj[key] };
  });
  // 3. return top five items from the counter object;
  return topFiveObjsUsingCount(genreNameAndCounts);
}

function createCounterObjectForGenresOf(books) {
  return books.reduce((accum, { genre }) => {
    // 1. get the genre of the current book
    // 2. if the property exists, add 1 to the count, otherwise set it to 1
    accum[genre] = accum[genre] ? accum[genre] + 1 : 1;
    return accum;
  }, {});
}

function mostPopularBooks(books) {
  // 1. map books to objects of name = title of book and count = number of
  //    borrows
  const titleNameAndCount = books.map(({ title: name, borrows }) => {
    return { name, count: borrows.length };
  }, {});
  // 2. return the top 5 items from that counter object
  return topFiveObjsUsingCount(titleNameAndCount);
}

function mostPopularAuthors(books, authors) {
  // 1. get a counter object of author id pointing to count
  const authorIdCounts = createCounterObjForAuthorIdToCountOfCheckoutsOf(books);
  // 2. map the keys of the counter object to an array of objects with name
  //    pointing to the author's first and last name and count pointing to the
  //    count
  const authorNameAndCounts = mapIdsToAuthorNameAndCountObj(
    authorIdCounts,
    authors
  );
  // 3. return top Five items from counter object
  return topFiveObjsUsingCount(authorNameAndCounts);
}

function mapIdsToAuthorNameAndCountObj(authorIdCounts, authors) {
  return Object.keys(authorIdCounts).map((authorId) => {
    // keys are strings but authorId needs to be a number
    // 1. find the respective author obj
    const author = authors.find((author) => author.id === parseInt(authorId));
    // 2. create a new obj with name pointing to first and last of author
    //     and count pointing to the count
    const {
      name: { first, last },
    } = author;
    return { name: `${first} ${last}`, count: authorIdCounts[authorId] };
  });
}

function createCounterObjForAuthorIdToCountOfCheckoutsOf(books) {
  return books.reduce((accum, { authorId, borrows }) => {
    // 1. get the authorId, borrows of the current book
    // 2. if the property exists, add 1 to the count, otherwise set it to 1
    accum[authorId] = accum[authorId]
      ? accum[authorId] + borrows.length
      : borrows.length;
    return accum;
  }, {});
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  mostCommonGenres,
  mostPopularBooks,
  mostPopularAuthors,
};
