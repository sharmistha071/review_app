import { useState, useEffect, Fragment } from "react";
import "./styles.css";
import Form from "./Form";

export default function App() {
  const baseUrl = "http://b015636f34e8.ngrok.io/"
  const [isFormRender, setIsFormRender] = useState(false);
  const [reviewList, setReviewList] = useState([])
  
  const handleCreateButtonClick = () => {
    setIsFormRender(!isFormRender);
  };

  useEffect(() => {
    fetch(`${baseUrl}api/v1/review`).then((response) =>
     response.json()
    ).then((data)=>{
      setReviewList(data)
    });
  }, []);


  return (
    <div className="App">
      {!isFormRender ? (
        <section class="listSection">
          <div class="topSection">
            <h1>List of Complains</h1>
            <button
              type="button"
              class="button"
              onClick={handleCreateButtonClick}
            >
              Create New Complain
            </button>
          </div>
          <div>
            <ul class="list">
              {reviewList.map((review)=><li className="card">
                <p><span className="field_name">Description:</span> {review.description} </p>
                <p><span className="field_name">Department:</span> {review.department_name}</p>
                <p><span className="field_name">Service Person:</span> {review.service_person}</p>
                <p><span className="field_name">Service Person Designation:</span> {review.service_person_designation}</p>
                <p><span className="field_name">Bribe Amount: </span>{review.bribe_amount}</p>
                <p><span className="field_name">Rating:</span> {review.rating}</p>
              </li>)}
            </ul>
          </div>
        </section>
      ) : (
        <section class="formSection">
          <div class="topSection">
            <h1>Create a New Complain</h1>
            <button
              type="button"
              class="button"
              onClick={handleCreateButtonClick}
            >
              Back to List
            </button>
          </div>
          <Form setIsFormRender={setIsFormRender} isFormRender={isFormRender} baseUrl={baseUrl}/>
        </section>
      )}
    </div>
  );
}
