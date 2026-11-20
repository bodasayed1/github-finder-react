const USERNAME_PATTERN = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export function validateUsername(value) {
  const username = value.trim();

  if (username === "") {
    return "Please enter a GitHub username.";
  }

  if (!USERNAME_PATTERN.test(username)) {
    return "Usernames use letters, numbers, and single hyphens only, up to 39 characters.";
  }

  return "";
}