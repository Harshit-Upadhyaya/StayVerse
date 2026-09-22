const chatForm = document.getElementById("chatForm");

if (chatForm) {

  const messageInput = document.getElementById("messageInput");
  const chatBox = document.getElementById("chatBox");
  const sendButton = chatForm.querySelector("button");

  function addMessage(label, message, className) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `chat-message ${className}`;

    const labelDiv = document.createElement("div");
    labelDiv.className = "message-label";
    labelDiv.textContent = label;

    const textDiv = document.createElement("div");
    textDiv.textContent = message;

    messageDiv.appendChild(labelDiv);
    messageDiv.appendChild(textDiv);

    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
  }

  chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = messageInput.value.trim();

    if (!message) {
      return;
    }

    addMessage("You", message, "user-message");

    const thinkingMessage = document.createElement("div");
    thinkingMessage.className = "chat-message ai-message";
    thinkingMessage.textContent = "StayVerse AI is thinking...";

    chatBox.appendChild(thinkingMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    messageInput.value = "";

    try {
      sendButton.disabled = true;
      sendButton.textContent = "Thinking...";

      const response = await fetch("/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: message
        })
      });

      const data = await response.json();

      thinkingMessage.remove();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      addMessage("StayVerse AI", data.reply, "ai-message");

    } catch (error) {

      addMessage(
        "Error",
        error.message,
        "ai-message"
      );

    } finally {

      sendButton.disabled = false;
      sendButton.textContent = "Send";

    }
  });

}