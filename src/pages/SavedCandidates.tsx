import { useEffect, useState } from 'react';
import { Button } from '../components/ui/index';
import { Candidate } from '../interfaces/Candidate.interface';

interface Candidates extends Candidate {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  location: string;
  email: string;
  company: string;
  bio: string;
}

const SavedCandidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidates[]>([]);

  useEffect(() => {
    const loadCandidates = () => {
      const savedCandidates= JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      setCandidates(savedCandidates);
    }
    loadCandidates();
    window.addEventListener('storage', loadCandidates);
    return () => {
      window.removeEventListener('storage', loadCandidates);
    };
    
    }, []);      
    console.log('candidate', candidates);

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
          <table className='table'>
            <thead>
              <tr>
                <th>image</th>
                <th>Name</th>
                <th>Location</th>
                <th>Email</th>
                <th>Company</th>
                <th>Bio</th>
                <th>Reject</th>
              </tr>
            </thead>
            <tbody style={{textAlign: 'center'}}>
              {candidates.map((candidate) => (
                <tr key={candidate.id}>
                <td>
                  <img src={candidate.avatar_url} style={{ width: '120px', height: '120px' }} />
                </td>
                <td>{candidate.name}</td>
                <td>{candidate.location}</td>
                <td>{candidate.email}</td>
                <td>{candidate.company}</td>
                <td>{candidate.bio}</td>
                <td key={`${candidate.id}-action`}>
                  <Button onClick={() => removeCandidate(candidate.id)}>Reject</Button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default SavedCandidates;
