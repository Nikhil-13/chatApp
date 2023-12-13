import {useContext} from 'react';
import AuthContext from '../store/context/authContext';

const withContext = Component => {
  const Wrapper = props => {
    const context = useContext(AuthContext);

    return <Component context={context} {...props} />;
  };

  return Wrapper;
};
export default withContext;
