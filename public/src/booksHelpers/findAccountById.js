function findAccountById(accountsArr, accountIdStr) {
  // return the account object that matches the account id
  return accountsArr.find(({ id: idStr }) => idStr === accountIdStr);
}
module.exports = { findAccountById };
