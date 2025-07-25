import { useState, useEffect } from "react";

import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";

import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";

import Editor from "react-simple-code-editor";

import { BarLoader } from "react-spinners";

import { Oval } from "react-loader-spinner";

import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import axios from "axios";

import Markdown from "react-markdown";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const [code, setCode] = useState(``);

  const [review, setReview] = useState(``);
  // const [language, setLanguage] = useState("javascript");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Highlight the code block
    prism.highlightAll();
  });

  async function reviewCode() {
    // Set loading to true to show the loader
    setLoading(true);
    try {
      // Send the code to the backend for review
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });

      // Update the review state with the response from the backend
      setReview(response.data);

      // Handle the response from the backend
      console.log(response.data);
    } catch (error) {
      setReview("Error fetching review.");
    }
    setLoading(false);
  }

  return (
    <>
      <header>
        <h1>AI-Powered Code Reviewer</h1>
      </header>
      <main>
        {/* Left half will contain the code */}
        <div className="left">
          {/* <div style={{ marginBottom: "0.5rem" }} className="language">
            Select the language the code will be in

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                borderRadius: "0.4rem",
                padding: "0.2rem 0.5rem",
              }}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="typescript">TypeScript</option>
              <option value="markup">HTML</option>
              <option value="css">CSS</option>
              <option value="json">JSON</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
            </select>
          </div> */}
          <div className="left-head">
            <h3>Insert your code below</h3>
          </div>
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => prism.highlight(code, prism.languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                color: "#ffffff",
                minHeight: "100%",
              }}
            />
          </div>
          <button
            onClick={loading ? undefined : reviewCode}
            className="review-btn"
            disabled={loading}
          >
            {loading ? (
              <Oval
                height={24}
                width={24}
                color="#111"
                secondaryColor="#ccc"
                strokeWidth={5}
                strokeWidthSecondary={5}
                ariaLabel="loading"
              />
            ) : (
              "Review"
            )}
          </button>
        </div>

        {/* Right half will contain the review */}
        <div className="right">
          <div className="right-head">
            <h3>Code Review</h3>
          </div>
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
