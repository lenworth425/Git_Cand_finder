import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Button, Card, CardBody, CardHeader, CardTitle } from '../components/ui';
import Input from '../components/ui/Input/Input';
import { Candidate } from '../interfaces/Candidate.interface';

interface GithubUser extends Candidate {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  score: number;
}

const CandidateSearch = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<GithubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        if (search) {
            setLoading(true);
            setError(null);
            try {
                const data = await searchGithub(search);
                setResults(data);
            } catch (err) {
                setError('Error fetching data from GitHub');
            } finally {
                setLoading(false);
            }
        }
    };

    fetchData();
  }, [search]);

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSearchClick = () => {
        searchGithubUser(search);
    };
    
  return (
    <>
      <h1>CandidateSearch</h1>
      <div>
        <Input type="text" onChange={handleSearchInput} placeholder="Enter Github Username" />
        <Button onClick={handleSearchClick} disabled={loading}>{loading ? 'Searching...' : 'Search'}</Button>
      </div>
      {error && <p>{error}</p>}
      <div>
        {results.map((result) => (
          <Card key={result.id}>
            <CardHeader>
              <CardTitle>{result.login}</CardTitle>
            </CardHeader>
            <CardBody>
              <img src={result.avatar_url} alt={result.login} />
              <p>Score: {result.score}</p>
              <a href={result.html_url}>View Profile</a>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
};

export default CandidateSearch;
