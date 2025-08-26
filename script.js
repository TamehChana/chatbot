const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".chatbot header span");

let userMessage;
const API_KEY = "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";

// Get current time for timestamps
const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

// Create typing indicator
const createTypingIndicator = () => {
    const typingLi = document.createElement("li");
    typingLi.classList.add("typing-indicator");
    typingLi.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    return typingLi;
};

// Create chat message with timestamp
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    
    let chatContent;
    if (className === "outgoing") {
        chatContent = `
            <div class="message-content">
                <p>${message}</p>
                <div class="timestamp">${getCurrentTime()}</div>
            </div>
        `;
    } else {
        chatContent = `
            <span class="material-symbols-outlined">smart_toy</span>
            <div class="message-content">
                <p>${message}</p>
                <div class="timestamp">${getCurrentTime()}</div>
            </div>
        `;
    }
    
    chatLi.innerHTML = chatContent;
    return chatLi;
};

// Generate AI response
const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");
    
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
            max_tokens: 1000,
            temperature: 0.7
        })
    };

    // Send POST request to API, get response
    fetch(API_URL, requestOptions)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            if (data.choices && data.choices[0] && data.choices[0].message) {
                messageElement.textContent = data.choices[0].message.content;
                incomingChatLi.classList.add("success");
            } else {
                throw new Error("Invalid response format");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            messageElement.textContent = "Sorry, I'm having trouble connecting right now. Please try again in a moment.";
            incomingChatLi.classList.add("error");
        })
        .finally(() => {
            chatbox.scrollTo(0, chatbox.scrollHeight);
        });
};

// Handle chat functionality
const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    
    // Clear input
    chatInput.value = "";
    
    // Append user message to chatbox
    const outgoingChatLi = createChatLi(userMessage, "outgoing");
    chatbox.appendChild(outgoingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    // Show typing indicator
    setTimeout(() => {
        const typingIndicator = createTypingIndicator();
        chatbox.appendChild(typingIndicator);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        
        // Remove typing indicator and show response
        setTimeout(() => {
            chatbox.removeChild(typingIndicator);
            const incomingChatLi = createChatLi("", "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi);
        }, 1000);
    }, 600);
};

// Handle Enter key press
const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleChat();
    }
};

// Toggle chatbot visibility
const toggleChatbot = () => {
    document.body.classList.toggle("show-chatbot");
    
    // Focus on input when opening
    if (document.body.classList.contains("show-chatbot")) {
        setTimeout(() => {
            chatInput.focus();
        }, 300);
    }
};

// Close chatbot
const closeChatbot = () => {
    document.body.classList.remove("show-chatbot");
};

// Event listeners
chatbotToggler.addEventListener("click", toggleChatbot);
closeBtn.addEventListener("click", closeChatbot);
sendChatBtn.addEventListener("click", handleChat);
chatInput.addEventListener("keypress", handleKeyPress);

// Auto-resize textarea
chatInput.addEventListener("input", function() {
    this.style.height = "auto";
    this.style.height = Math.min(this.scrollHeight, 120) + "px";
});

// Close chatbot when clicking outside
document.addEventListener("click", (e) => {
    if (!e.target.closest(".chatbot") && !e.target.closest(".chatbot-toggler")) {
        if (document.body.classList.contains("show-chatbot")) {
            closeChatbot();
        }
    }
});

// Add some initial animations
document.addEventListener("DOMContentLoaded", () => {
    // Animate welcome message
    const welcomeMessage = document.querySelector(".chat.incoming");
    if (welcomeMessage) {
        welcomeMessage.style.opacity = "0";
        welcomeMessage.style.transform = "translateY(20px)";
        
        setTimeout(() => {
            welcomeMessage.style.transition = "all 0.5s ease";
            welcomeMessage.style.opacity = "1";
            welcomeMessage.style.transform = "translateY(0)";
        }, 500);
    }
});