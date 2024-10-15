import { Link } from 'react-router-dom';

const Nav =  () => {  
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav style={{display: 'flex', flexWrap: 'wrap'}} >
      <ul style={{display: 'flex', flexWrap: 'wrap'}}>
        <li  style={{ margin: '10px 20px' }}>
          <Link to="/" style={{color:'white'}}>Home</Link>
        </li>
        <li  style={{ margin: '10px 20px'}}>
          <Link to="/SavedCandidates" style={{color:'white'}}>Potential Candidates</Link>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;
