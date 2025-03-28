import React, { useEffect, useState } from 'react';

const EmailProtection = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Reverse the email address
    const reversedEmail = 'moc.hcetdleihsrehpic@ofni'; // Reversed email
    const normalEmail = reversedEmail.split('').reverse().join(''); // Correct email
    setEmail(normalEmail); // Update state with the correct email
  }, []);

  return (
    <div>
      <p>Contact us at <a href={`mailto:${email}`}>{email}</a></p>
    </div>
  );
};

export default EmailProtection;