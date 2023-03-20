import { useState } from "react";

const Statistics = ({ reviews }) => {
  return (
    <div>
      <h1>Statistics</h1>
      <ul>
        <li>good {reviews.good}</li>
        <li>neutral {reviews.neutral}</li>
        <li>bad {reviews.bad}</li>
      </ul>
    </div>
  );
};

const GiveFeedback = ({ handleClick }) => {
  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => handleClick("good")}>good</button>
      <button onClick={() => handleClick("neutral")}>neutral</button>
      <button onClick={() => handleClick("bad")}>bad</button>
    </div>
  );
};

function App() {
  const [reviews, setReviews] = useState({ good: 0, neutral: 0, bad: 0 });
  const handleReviews = (category) => {
    let newReviews;
    switch (category) {
      case "good":
        newReviews = { ...reviews, good: reviews.good + 1 };
        setReviews(newReviews);
        break;
      case "neutral":
        newReviews = { ...reviews, neutral: reviews.neutral + 1 };
        setReviews(newReviews);
        break;
      case "bad":
        newReviews = { ...reviews, bad: reviews.bad + 1 };
        setReviews(newReviews);
        break;
      default:
        newReviews = reviews;
        setReviews(newReviews);
    }
  };
  return (
    <div className="App">
      <GiveFeedback handleClick={handleReviews} />
      <Statistics reviews={reviews} />
    </div>
  );
}

export default App;
