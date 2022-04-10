import React, {isValidElement, ReactNode} from 'react';

type Spacer = {
  children: ReactNode;
  gap?: string | number;
  direction?: 'horizontal' | 'vertical';
};

function Spacer({gap = 10, children, direction = 'vertical'}: Spacer) {
  const horizontal = direction === 'horizontal';

  return (
    <>
      {React.Children.map(children, (child, i) => {
        const margin = i > 0 ? gap : 0;

        const style = {
          marginTop: horizontal ? 0 : margin,
          marginLeft: horizontal ? margin : 0,
        };

        if (isValidElement(child)) {
          const childStyle = child?.props.style;
          const newStyle = ([] as any[]).concat(style, childStyle);
          return React.cloneElement(child, {style: newStyle} as any);
        }

        return child;
      })}
    </>
  );
}

export default Spacer;
