import { Link, useLocation } from 'react-router-dom';

const Nav =  () => {
  const location = useLocation();  
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav style={{display: 'flex', flexWrap: 'wrap'}} >
      <ul style={{display: 'flex', flexWrap: 'wrap'}}>
        <li  style={{ margin: '10px 20px' }}>
          <Link to="/" style={{color:'white', fontWeight: location.pathname === '/' ? 'bold' : 'normal' }}>Home</Link>
        </li>
        <li  style={{ margin: '10px 20px'}}>
          <Link to="/SavedCandidates" style={{color:'white', fontWeight: location.pathname === '/SavedCandidates' ? 'bold' : 'normal' }}>Potential Candidates</Link>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;
