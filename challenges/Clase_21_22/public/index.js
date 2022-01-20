const socket = io();

socket.on("welcome", (data) => console.log(data));

const emailInput = document.getElementById("email");
let email = "";
emailInput.addEventListener("keyup", (e) => {
  if (e.target.value) email = e.target.value;
});

const firstNameInput = document.getElementById("firstName");
let firstName = "";
firstNameInput.addEventListener("keyup", (e) => {
  if (e.target.value) firstName = e.target.value;
});

const lastNameInput = document.getElementById("lastName");
let lastName = "";
lastNameInput.addEventListener("keyup", (e) => {
  if (e.target.value) lastName = e.target.value;
});

const ageInput = document.getElementById("age");
let age = "";
ageInput.addEventListener("keyup", (e) => {
  if (e.target.value) age = e.target.value;
});

const aliasInput = document.getElementById("alias");
let alias = "";
aliasInput.addEventListener("keyup", (e) => {
  if (e.target.value) alias = e.target.value;
});

const avatarInput = document.getElementById("avatar");
let avatar = "";
avatarInput.addEventListener("keyup", (e) => {
  if (e.target.value) avatar = e.target.value;
});

const messageInput = document.getElementById("message");
let message = "";
messageInput.addEventListener("keyup", (e) => {
  if (e.target.value) message = e.target.value;
});

document.addEventListener("submit", sendForm);

function sendForm(e) {
  e.preventDefault();

  const data = {
    id: email,
    firstName: firstName,
    lastName: lastName,
    age: age,
    alias: alias,
    avatar: avatar,
    message: message,
  };

  if (
    !email ||
    !firstName ||
    !lastName ||
    !age ||
    !alias ||
    !avatar ||
    !message
  ) {
    window.alert("Fields have not been completed!");
    return;
  }

  fetch("/api/chats", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      socket.emit("chats");
    });
}

socket.on("chats", (data) => {
  const result = data;
  const originalData = {
    id: "messages",
    chats: JSON.parse(JSON.stringify(result)),
  };

  const author = new normalizr.schema.Entity("author");

  const chat = new normalizr.schema.Entity("chat", {
    author: author,
  });

  const messages = new normalizr.schema.Entity("messages", {
    chats: [chat],
  });

  const normalizedData = normalizr.normalize(originalData, messages);
  console.log("Data normalizada", normalizedData);

  const denormalizedData = normalizr.denormalize(
    normalizedData.result,
    messages,
    normalizedData.entities
  );
  console.log("Data desnormalizada", denormalizedData);

  const originalLength = JSON.stringify(originalData).length;
  const normalizedLength = JSON.stringify(normalizedData).length;
  const compression = 100 - (normalizedLength * 100) / originalLength;
  console.log(compression.toFixed(2) + "%");

  const element = document.getElementById("percentage");
  console.log(element);
  element.innerText = `${compression.toFixed(2)}%`;

  const divChat = document.getElementById("chats");
  const message = data
    .map((chat) => {
      return `<div class='d-flex align-items-center flex-wrap p-2'>
            <img src='${
              chat.author.avatar
            }' class='rounded pe-2' style='height: 45px; width: auto;' /><span style='color: blue; font-weight: 600;'>${
        chat.author.id
      }</span> [<span style='color: brown;'>${formatISODate(
        chat.createdAt
      )}</span>]: <span style='color: green;font-style: italic;'>${
        chat.message
      }</span>
          </div>`;
    })
    .join("");
  divChat.innerHTML = message;
});

function formatISODate(date) {
  if (!date) return;
  const DATE = date.split("T")[0];
  const HOUR = date.split("T")[1];
  return DATE + " " + HOUR.substring(0, 8);
}
