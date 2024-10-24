const express = require("express");
const bodyParser = require("body-parser");

const users = [
  {
    userName: "Aditya Gupta",
    userEmail: "aditya@gmail.com",
    userAge: "22",
    userUniqueId: "1",
  },
  {
    userName: "Vanshita Jaiswal",
    userEmail: "vanshita@gmail.com",
    userAge: "21",
    userUniqueId: "2",
  },
  {
    userName: "Sachin Yadav",
    userEmail: "sachin@gmail.com",
    userAge: "22",
    userUniqueId: "3",
  },
];

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.render("home", {
    data: users,
  });
});

app.post("/", (req, res) => {
  console.log("req post: " + req.body.userName);

  const inputUserName = req.body.userName;
  const inputUserEmail = req.body.userEmail;
  const inputUserAge = req.body.userAge;
  const inputUserUniqueId = req.body.userUniqueId;

  users.push({
    userName: inputUserName,
    userEmail: inputUserEmail,
    userAge: inputUserAge,
    userUniqueId: inputUserUniqueId,
  });

  res.render("home", {
    data: users,
  });
});

app.post("/delete", (req, res) => {
  console.log("req delete: " + req);
  var requestedUserUniqueId = req.body.userUniqueId;
  var j = 0;
  users.forEach((user) => {
    j = j + 1;
    if (user.userUniqueId === requestedUserUniqueId) {
      users.splice(j - 1, 1);
    }
  });
  res.render("home", {
    data: users,
  });
});

app.post("/update", (req, res) => {
  console.log("req update: " + req);
  const inputUserName = req.body.userName;
  const inputUserEmail = req.body.userEmail;
  const inputUserAge = req.body.userAge;
  const inputUserUniqueId = req.body.userUniqueId;

  var j = 0;
  users.forEach((user) => {
    j = j + 1;
    if (user.userUniqueId === inputUserUniqueId) {
      user.userName = inputUserName;
      user.userEmail = inputUserEmail;
      user.userAge = inputUserAge;
    }
  });
  res.render("home", {
    data: users,
  });
});

app.listen(3000, (req, res) => {
  console.log("App is running on port 3000");
});
