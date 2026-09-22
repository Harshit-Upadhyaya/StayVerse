// Floating AI Assistant

// Do not show the floating assistant on the full AI page
if (window.location.pathname !== "/ai") {

    const aiToggle = document.getElementById("aiToggle");
    const aiClose = document.getElementById("aiClose");
    const aiChatWindow = document.getElementById("aiChatWindow");

    const floatingChatForm =
        document.getElementById("floatingChatForm");

    const floatingChatBox =
        document.getElementById("floatingChatBox");

    const floatingMessageInput =
        document.getElementById("floatingMessageInput");

    const floatingSendButton =
        document.getElementById("floatingSendButton");

    // Open / close chat window
    aiToggle.addEventListener("click", () => {
        aiChatWindow.classList.toggle("active");
    });

    // Close chat window
    aiClose.addEventListener("click", () => {
        aiChatWindow.classList.remove("active");
    });

    // Send message
    floatingChatForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const message = floatingMessageInput.value.trim();

        if (!message) {
            return;
        }

        // Display user's message
        const userMessage = document.createElement("div");

        userMessage.className = "floating-user-message";

        userMessage.textContent = message;

        floatingChatBox.appendChild(userMessage);

        // Clear input
        floatingMessageInput.value = "";

        // Scroll to latest message
        floatingChatBox.scrollTop =
            floatingChatBox.scrollHeight;

        // Disable send button
        floatingSendButton.disabled = true;

        // Show thinking message
        const thinkingMessage = document.createElement("div");

        thinkingMessage.className = "floating-ai-message";

        thinkingMessage.textContent = "Thinking...";

        floatingChatBox.appendChild(thinkingMessage);

        floatingChatBox.scrollTop =
            floatingChatBox.scrollHeight;

        try {
            // Send message to our existing AI endpoint
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

            // Remove "Thinking..."
            thinkingMessage.remove();

            if (!response.ok) {
                throw new Error(
                    data.error || "Something went wrong."
                );
            }

            // Display AI response
            const aiMessage = document.createElement("div");
            aiMessage.className = "floating-ai-message";
            aiMessage.textContent = data.reply;
            floatingChatBox.appendChild(aiMessage);

            // Scroll to latest message
            floatingChatBox.scrollTop =
                floatingChatBox.scrollHeight;

        } catch (error) {
            thinkingMessage.textContent =
                error.message;
        } finally {
            // Enable send button again
            floatingSendButton.disabled = false;
        }
    });

}