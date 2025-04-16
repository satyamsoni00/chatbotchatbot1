import { useState } from "react";
import { motion } from "framer-motion";

const querySections = {
  "📦 Orders": [
    {
      question: "Where is my order?",
      answer: "You can track your order [here](#).",
    },
    {
      question: "Can I modify my order?",
      answer:
        "Order modifications are allowed within 24 hours. More info [here](#).",
    },
  ],
  "🔄 Returns & Refunds": [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy. Read more [here](#).",
    },
    {
      question: "How long does a refund take?",
      answer: "Refunds are processed within 5-7 business days.",
    },
  ],
  "💰 Payments": [
    {
      question: "Do you accept credit cards?",
      answer: "Yes, we accept all major credit cards.",
    },
    {
      question: "Can I pay with PayPal?",
      answer: "Yes, PayPal is an accepted payment method.",
    },
  ],
  "🚚 Shipping": [
    {
      question: "What are your shipping options?",
      answer: "We offer standard and express shipping. More details [here](#).",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to multiple countries. Check availability [here](#).",
    },
  ],
};

export default function EcommerceChatbot() {
  const [chatHistory, setChatHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState(null);

  const handleQuestionClick = (q) => {
    setChatHistory([
      ...chatHistory,
      { question: q.question, answer: q.answer },
    ]);
  };

  const filteredQuestions = selectedSection
    ? querySections[selectedSection].filter((q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div
      style={{
        width: "320px",
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "white",
        padding: "15px",
        borderRadius: "12px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial",
      }}
    >
      <motion.h2
        style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}
        animate={{ opacity: 1 }}
      >
        💬 Chat with Us
      </motion.h2>
      {selectedSection ? (
        <>
          <button
            onClick={() => setSelectedSection(null)}
            style={{
              marginBottom: "10px",
              padding: "8px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
            }}
          >
            ⬅ Back to Main Queries
          </button>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <div
            style={{
              maxHeight: "250px",
              overflowY: "auto",
              paddingBottom: "10px",
            }}
          >
            {chatHistory.map((entry, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <p style={{ fontWeight: "bold", color: "#007bff" }}>
                  {entry.question}
                </p>
                <motion.p
                  style={{ marginTop: "5px" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {entry.answer}
                </motion.p>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginTop: "10px",
            }}
          >
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(q)}
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#007bff",
                    color: "white",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {q.question}
                </button>
              ))
            ) : (
              <p style={{ color: "gray" }}>No matching questions found.</p>
            )}
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginTop: "10px",
          }}
        >
          {Object.keys(querySections).map((section, index) => (
            <button
              key={index}
              onClick={() => setSelectedSection(section)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#28a745",
                color: "white",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {section}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
