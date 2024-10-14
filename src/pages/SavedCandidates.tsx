import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle } from '../components/ui/index';

interface Candidate {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  score: number;
}

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      setCandidates((savedCandidates));
    }, []);
    const removeCandidate = (id:number) => {
      const updatedCandidates = candidates.filter(candidate => candidate.id !== id);
      setCandidates(updatedCandidates);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    }
  return (
    <>
      <h1>Potential Candidates</h1>
      {candidates.length === 0 ? (
        <p>No saved candidates yet.</p>
      ) : (
        <div>
          {candidates.map((candidate) => (
            <Card key={candidate.id}>
              <CardHeader>
                <CardTitle>{candidate.login}</CardTitle>
              </CardHeader>
              <CardBody>
                <img src={candidate.avatar_url} alt={candidate.login} />
                <p>Score: {candidate.score}</p>
                <div>
                  <a href={candidate.html_url}>View Profile</a>           
                  <Button onClick={() => removeCandidate(candidate.id)}>Remove</Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default SavedCandidates;
