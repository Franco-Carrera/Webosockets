const socket = io();
const d = document;

//-------------------- Eventos de Socket ----------------
const emailInput = document.getElementById("email");
let email = "";
emailInput.addEventListener("keyup", (e) => {
  //si tiene el target de input, cuando se toca una tecla, sucede el evento
  if (e.target.value) email = e.target.value;
  //e.preventDefault()
});

const firstNameInput = document.getElementById("lastName");
let firstName = "";
firstNameInput.addEventListener("keyup", (e) => {
  if (e.target.value) firstName = e.target.value;
});

const lastNameInput = document.getElementById("lastName");
let lastName = "";
lastNameInput.addEventListener("keyup", (e) => {
  if (e.target.value) lastName = e.target.value;
});

const ageInput = d.getElementById("age");
let age = "";
ageInput.addEventListener("keyup", (e) => {
  if (e.target.value) age = e.target.value;
});

const aliasInPut = d.getElementById("alias");
let alias = "";
aliasInPut.addEventListener("keyup", (e) => {
  if (e.target.value) alias = e.target.value;
});

const personInput = d.getElementById("person");
let person = "";
personInput.addEventListener("keyup", (e) => {
  if (e.target.value) person = e.target.value;
});

const messageInput = d.getElementById("Message");
let message = "";
messageInput.addEventListener("keyup", (e) => {
  if (e.target.value) message = e.target.value;
});

//-------------------- Eventos de Socket Form----------------

document.addEventListener("submit", sendForm);

function sendForm(e) {
  e.preventDefault();
  console.log(e);
  if (
    !email ||
    !firstName ||
    !lastName ||
    !age ||
    !alias ||
    !person ||
    !message
  ) {
    window.alert("Not completed labels. ");
  }

  const form = d.getElementById("messagesCenter");
  const data = new FormData(form);
  fetch("/api/chat", {
    method: "POST",
    body: data,
  }).then((result) => {
    console.log(result);
  });
  //  .then((json) => {
  //Swal.fire({
  //    title: "Éxito",
  //  text: json.message,
  //     icon: "success",
  //     timer: 2000,
}

socket.on("chat", (data) => {
  const divChat = d.getElementById("chat");
  const chat = data
    .map((chat) => {
      return `
                <p>
                  <span style:"color: violet; font-weight: 600;">${chat.email}</span> [<span style="color: brown;">${chat.date}</span>]: <span style="color: green; font-style: italic;>${chat.message}</span>]
                </p>
               `;
    })
    .join("");
  divChat.innerHTML = chat;
});

// ------------------- --------Fin Events Socket--------------------
