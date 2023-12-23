import {AuthContextProvider} from './src/store/context/authContext';
import Navigation from './src/navigation';

const App = () => {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
};

export default App;
