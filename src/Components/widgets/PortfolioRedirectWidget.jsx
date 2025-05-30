import  { useEffect } from 'react';

const PortfolioRedirectWidget = ({ actionProvider }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // ActionProvider के माध्यम से navigate करें
      actionProvider.handleViewPortfolio();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [actionProvider]);

  return (
    <div className="portfolio-redirect-message">
      Portfolio redirect...
    </div>
  );
};

export default PortfolioRedirectWidget;