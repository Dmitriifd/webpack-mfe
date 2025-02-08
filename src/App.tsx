import Logo from './assets/logo.svg';
import Button from './components/Button/Button';
import './styles/global.scss';

const App = () => {
  return (
    <div>
      <h1>App Test</h1>
      <Logo width={50} height={50} />
      <Button>Click me</Button>
      {/* <Button2 /> */}
    </div>
  );
};

export default App;
