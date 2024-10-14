const ErrorPage = () => {
  return (
    <section style={{
      color: 'white',
      display: 'flex',            
      flexDirection: 'column',    
      alignItems: 'center',      
      justifyContent: 'center',   
      height: '100vh'             
    }}>
      <h1>404: Page Not Found</h1>
      <h1> ¯\_(ツ)_/¯</h1>
      <img 
        src="https://media.tenor.com/YyOVJJ1G9ukAAAAi/mystic-messenger-video-game.gif" 
        alt="crying" 
        style={{ maxWidth: '100%', height: 'auto' }} 
      />
    </section>
  );
};

export default ErrorPage;
