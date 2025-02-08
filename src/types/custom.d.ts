declare module '*.svg' {
  import * as React from 'react';
  const Component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default Component;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
