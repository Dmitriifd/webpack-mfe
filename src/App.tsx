import React from 'react';
import './styles/global.scss';
// import { ReactComponent as Logo } from './assets/logo.svg';
import { ReactComponent as LogoComponent } from './assets/logo.svg';
import logoUrl from './assets/logo.svg';

const App = () => {
  return (
    <div>
      <h1>App Test </h1>
      <LogoComponent width={50} height={50} />
      <img src={logoUrl} alt="logo" width={50} height={50} />
    </div>
  );
};

export default App;
