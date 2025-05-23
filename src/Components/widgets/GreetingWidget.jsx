import React, { useEffect } from 'react';

const GreetingWidget = ({ actionProvider }) => {
  useEffect(() => {
    actionProvider.handleGreeting();
  }, []);

  return null;
};

export default GreetingWidget;