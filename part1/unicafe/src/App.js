import { useState } from "react";

const Statistics = ({ reviews }) => {
  const total = reviews.good + reviews.neutral + reviews.bad;
  if (reviews.good !== 0 || reviews.neutral !== 0 || reviews.bad !== 0) {
    return (
      <div>
        <h1>Statistics</h1>
        {
          <table>
            <tbody>
              <DisplayStatistic
                displayStatistic={reviews.good}
                displayText={"good"}
              />
              <DisplayStatistic
                displayStatistic={reviews.neutral}
                displayText={"neutral"}
              />
              <DisplayStatistic
                displayStatistic={reviews.bad}
                displayText={"bad"}
              />
              <DisplayStatistic displayStatistic={total} displayText={"all"} />
              <DisplayStatistic
                displayStatistic={(reviews.good / total) * 100 + "%"}
                displayText={"positive"}
              />
            </tbody>
          </table>
        }
      </div>
    );
  } else {
    return <h2>No statistics available</h2>;
  }
};

const Button = ({ handleClick, displayText }) => {
  return (
    <button onClick={() => handleClick(displayText)}>{displayText}</button>
  );
};

const DisplayStatistic = ({ displayStatistic, displayText }) => {
  return (
    <tr>
      <td>{displayText}:</td>
      <td>{displayStatistic}</td>
    </tr>
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
      <h1>Give Feedback</h1>
      <Button handleClick={handleReviews} displayText={"good"} />
      <Button handleClick={handleReviews} displayText={"neutral"} />
      <Button handleClick={handleReviews} displayText={"bad"} />
      <Statistics reviews={reviews} />
    </div>
  );
}

export default App;
