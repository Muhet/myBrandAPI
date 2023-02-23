const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const response = await fetch('https://nice-teal-chinchilla-suit.cyclic.app/users?username=' + username + '&password=' + password);

  if (response.ok) {
    const user = await response.json();
    console.log('Logged in successfully:', user);
  } else {
    console.log('Login failed');
  }
});

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('https://nice-teal-chinchilla-suit.cyclic.app/users', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = router.db.get('users').find({ username: username, password: password }).value();

  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});