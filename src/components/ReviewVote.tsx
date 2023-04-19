import "../styles/VoteButtons.css";
import { useEffect, useState } from "react";
import { fetchSingleReview, patchVotes } from "../utils/api";

const ReviewVote = ({
  votes: initialVotes,
  review_id,
}: {
  votes?: number;
  review_id?: any;
}): JSX.Element => {
  const [votes, setVotes] = useState<number>(initialVotes || 0);
  const [hasVotedUp, setHasVotedUp] = useState<boolean>(false);
  const [hasVotedDown, setHasVotedDown] = useState<boolean>(false);

  const handleVoteUp = async () => {
    setVotes((prevVotes) => prevVotes + 1);
    setHasVotedUp(true);
    await patchVotes(review_id, 1);
  };

  const handleVoteDown = async () => {
    setVotes((prevVotes) => prevVotes - 1);
    setHasVotedDown(true);
    await patchVotes(review_id, -1);
  };

  const handleUndo = async () => {
    if (hasVotedUp) {
      setVotes((prevVotes) => prevVotes - 1);
      setHasVotedUp(false);
    }
    if (hasVotedDown) {
      setVotes((prevVotes) => prevVotes + 1);
      setHasVotedDown(false);
    }
  };

  return (
    <div className="vote-buttons">
      <p className="vote-header">
        {hasVotedUp || hasVotedDown
          ? "Vote registered!"
          : "Was this article interesting?"}
      </p>
      <button
        className="vote-up"
        onClick={hasVotedUp ? handleUndo : handleVoteUp}
        disabled={hasVotedDown}
      >
        {hasVotedUp ? "↩️ Undo" : "👍 Vote up!"}
      </button>
      <button
        className="vote-down"
        onClick={hasVotedDown ? handleUndo : handleVoteDown}
        disabled={hasVotedUp}
      >
        {hasVotedDown ? "↩️ Undo" : "👎 Vote down!"}
      </button>
      <h4 className="vote-count">Votes: {votes}</h4>
    </div>
  );
};

export default ReviewVote;
