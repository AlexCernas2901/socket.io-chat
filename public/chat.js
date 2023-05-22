window.onload = function() {
  const socket = io();
  const messagesDiv = document.getElementById("messages");
  const messageForm = document.getElementById("message-form");
  const messageInput = document.getElementById("message-input");

  // Función para enviar un mensaje al servidor
  const sendMessage = (event) => {
    event.preventDefault();
    const message = messageInput.value;
    socket.emit("chatMessage", message);
    messageInput.value = "";
  }

  // Función para agregar un mensaje al chat
  const addMessage = (message, color) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.style.color = color;
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
  }

  // Evento cuando se recibe un nuevo mensaje del servidor
  socket.on("chatMessage", (data) => {
    addMessage(data.message, data.color);
  });

  // Asociar el evento de envío del formulario
  messageForm.addEventListener("submit", sendMessage);
}