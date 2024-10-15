import React, { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Button, Card, CardBody, CardTitle} from '../components/ui';
import { Candidate } from '../interfaces/Candidate.interface';

interface GithubUser extends Candidate {
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

const CandidateSearch: React.FC = () => {
  const [candidate, setCandidate] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userList, setUserList] = useState<GithubUser[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchUserList = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchGithub('');
      setUserList(data);
      if (data.length > 0) {
        fetchUserDetails(data[0].login);
      }
    } catch (err) {
      setError('Error fetching user list from GitHub');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async (username: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchGithubUser(username);
      setCandidate(data);
    } catch (err) {
      setError('Error fetching user details from GitHub');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const handleNextCandidate = () => {
    const nextIndex = (currentIndex + 1) % userList.length;
    setCurrentIndex(nextIndex);
    fetchUserDetails(userList[nextIndex].login);
  };

  const handleApprove = () => {
    if (candidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      const updatedCandidates = [...savedCandidates, {
        id: candidate.id,
        avatar_url: candidate.avatar_url,
        name: candidate.login,
        location: candidate.location, 
        email: candidate.email,
        company: candidate.company,
        bio: candidate.bio,

      }];
      localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    }
    handleNextCandidate();
  };

  const handleReject = () => {
    handleNextCandidate();
  };

  if (loading && !candidate) {
    return <div>Loading candidate...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1>Candidate Search</h1>
      {candidate && (
        <Card>
          <CardBody>
            <img 
              src={candidate.avatar_url} 
              alt={`${candidate.login}'s avatar`} 
            />
            <CardTitle><strong>{candidate.login.charAt(0).toUpperCase() + candidate.login.slice(1)}({candidate.login})</strong></CardTitle>
            <p>Location:{candidate.location || 'Not specified'}</p>
            <p>Email: {candidate.email || 'Not specified'}</p>
            <p>Company: {candidate.company || 'Not specified'}</p>
            <p>Bio: {candidate.bio || 'Not specified'}</p>
          </CardBody>
        </Card>
      )}
      <div style={{display: 'flex', justifyContent: 'space-between', alignContent:'flex-start'}}>
        <Button onClick={handleReject} className="rejected">-</Button>
        <Button onClick={handleApprove} className="approved">+ </Button>
      </div>
    </>
  );
};

export default CandidateSearch;