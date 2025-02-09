import { Button } from '@/components/Button/Button';

import Logo from './assets/logo.svg';
import './styles/global.scss';

const App = () => {
  return (
    <div>
      <h1>App Test</h1>
      <Logo width={50} height={50} />
      <Button>Click me</Button>
    </div>
  );
};

export default App;
