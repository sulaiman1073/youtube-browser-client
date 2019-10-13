import React, { useState } from "react";
import "./Header.css";
import { withRouter } from "react-router";

export default withRouter(function Header({ history }) {
  const [inputValue, setInputValue] = useState("");

  const submitHandler = () => {
    const query = inputValue.split(" ").join("+");
    history.push(`/search?s=${query}`);
    setInputValue("");
  };

  return (
    <div className="Header--container">
      <div>
        <input
          type="text"
          placeholder="Search"
          className="input lg"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submitHandler()}
        />
        <button
          type="button"
          className="button lg icon"
          onClick={submitHandler}
        >
          <i className="fas fa-search fa-lg" />
        </button>
      </div>
    </div>
  );
});
