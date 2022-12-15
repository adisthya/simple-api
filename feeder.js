const users = ['staff:staff', 'sales:sales'];

users.forEach(user => {
  const token = Buffer.from(user).toString('base64');

  console.log(user, token);
});
