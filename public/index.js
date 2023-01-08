const socket = io.connect("http://localhost:3000");

const output = document.getElementById("output");
const feedback = document.getElementById("feedback");
const sender = document.getElementById("sender");
var message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", () => {
  socket.emit("chat", {
    sender: sender.value,
    message: message.value,
  });
  message.value = "";
});

message.addEventListener("keyup", (e) => {
  socket.emit("typing", {
    sender: sender.value,
    message: message.value,
  });
});

socket.on("chat", (data) => {
  feedback.innerHTML = "";
  output.innerHTML += `<p><strong>${data.sender}:</strong> ${data.message}</p>`;
});

socket.on("typing", (data) => {
  if (data.message == "") {
    feedback.innerHTML = "";
  } else {
    feedback.innerHTML = `${data.sender} typing...`;
  }
});

sender.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    message.focus();
  }
});
message.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    submitBtn.click();
  }
});
