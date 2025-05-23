// import React, { useEffect } from 'react';

// const GreetingWidget = ({ actionProvider }) => {
//   useEffect(() => {
//     actionProvider.handleGreeting();
//   }, []);

//   return null;
// };

// export default GreetingWidget;

// 23-05-25
import React, { useEffect } from 'react';

const GreetingWidget = ({ actionProvider }) => {
  useEffect(() => {
    actionProvider.handleGreeting();
  }, []);

  return null;
};

export default GreetingWidget;