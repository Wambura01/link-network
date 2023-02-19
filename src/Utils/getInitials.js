export const getInitials = (name) => {
  const fullName = name?.split(" ");
  const initials = fullName?.shift().charAt(0) + fullName?.pop().charAt(0);
  return initials ? initials.toUpperCase() : "";
};

export const getFirstLetter = (email) => {
  const firstLetters = email?.charAt(0) + email?.charAt(1);
  return firstLetters ? firstLetters.toUpperCase() : "";
};
