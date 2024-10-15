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
    // console.log('candidate avatar url', candidate.avatar_url);

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
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id}>
                <td style={{textAlign: 'center'}}>
                  <img src={candidate.avatar_url} style={{ width: '100px', height: '100px' }} alt={candidate.name}
                  />
                </td>
                <td style={{textAlign: 'center'}}>{candidate.name}</td>
                <td style={{textAlign: 'center'}}>{candidate.location}</td>
                <td style={{textAlign: 'center'}}>{candidate.email}</td>
                <td style={{textAlign: 'center'}}>{candidate.company}</td>
                <td style={{textAlign: 'center'}}>{candidate.bio}</td>
                <td style={{textAlign: 'center'}} key={`${candidate.id}-action`}>
                  <Button style={{textAlign: 'center'}} onClick={() => removeCandidate(candidate.id)} className='small'>x</Button>
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
