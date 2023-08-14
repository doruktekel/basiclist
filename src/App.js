import { useState } from "react";
import "./App.css";
import Books from "./component/books";
import Form from "./component/forms";

function App() {
  const [isForm, setIsForm] = useState(false);

  const onclickForm = () => {
    setIsForm(true);
  };

  return <>{isForm ? <Form /> : <Books onclickForm={onclickForm} />}</>;
}

export default App;
