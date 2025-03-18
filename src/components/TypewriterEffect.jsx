import React, { useState, useEffect } from "react";

const textArray = [
  "Find the best hospitals",
  "Compare hospitals easily",
  "Book an ambulance instantly",
  "Get AI-based recommendations",
];

const TypewriterEffect = () => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = textArray[index];

    // Speed settings for typing and deleting
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseBeforeDelete = 1000; // Pause after completing the sentence

    const handleTyping = () => {
      if (!isDeleting && charIndex < currentText.length) {
        setText(currentText.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setText(currentText.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % textArray.length);
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index]);

  return (
    <h1 className="typewriter">
      {text}
      <span className="cursor">|</span>
    </h1>
  );
};

export default TypewriterEffect;
