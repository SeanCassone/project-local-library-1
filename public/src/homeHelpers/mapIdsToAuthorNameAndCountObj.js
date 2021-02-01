function mapIdsToAuthorNameAndCountObj(authorIdCounterObj, authorsArr) {
  return Object.keys(authorIdCounterObj).map((authorIdStr) => {
    // keys are strings but authorId needs to be a number
    // 1. find the respective author obj
    const authorObj = authorsArr.find(
      ({ id: idInt }) => idInt === parseInt(authorIdStr, 10)
    );
    // 2. create a new obj with name pointing to first and last of author
    //     and count pointing to the count
    const {
      name: { first: firstStr, last: lastStr },
    } = authorObj;
    return {
      name: `${firstStr} ${lastStr}`,
      count: authorIdCounterObj[authorIdStr],
    };
  });
}
module.exports = { mapIdsToAuthorNameAndCountObj };
