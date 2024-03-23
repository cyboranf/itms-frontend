export const RegexpValidators = {
  EMAIL: /^[a-z0-9._%+-]+@[a-z.-]+.[a-z]+$/,
  PASSWORD_NUMBER: /\d/,
  PASSWORD_LENGTH: /[a-zA-Z\d$&+,:;=?~@%{}#|/'<>.^*()%!-]{8,}/,
  SPECIAL_CHARACTERS: /[$&+,:;=?~@%{}#|/'<>.^*()%!-]/,
  BIG_LETTER: /[A-Z]+/,
  SMALL_LETTER: /[a-z]+/,
  STRING_LENGTH: /^.{3,}$/,
  USERNAME_LETTERS_ONLY: /^[a-zA-Z]+$/
};
