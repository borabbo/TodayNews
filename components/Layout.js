import Hero from './Hero';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Navigation />
      {children}
    </div>
  );
};

export default Layout; 