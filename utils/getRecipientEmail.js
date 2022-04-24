export const getRecipientEmail = (users, currentUserEmail) => {
  return users?.filter((user) => user !== currentUserEmail)[0];
};
