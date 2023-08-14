import React from "react";

const Form = () => {
  return (
    <div>
      <form className="form-parent">
        <input
          type="text"
          name="title"
          placeholder="Write Title"
          className="form-child"
        />
        <input
          type="text"
          name="content"
          placeholder="Write Content"
          className="form-child"
        />
        <button type="submit" className="form-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
