import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, name, type }) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title ? `${title} | Dealora` : 'Dealora | Premium E-commerce Platform'}</title>
      <meta name='description' content={description || "Shop premium sneakers with exclusive deals, fast delivery, secure payments, and guaranteed quality."} />
      <meta name='keywords' content={keywords || "e-commerce, shopping, online store, deals, sneakers"} />
      
      {/* OpenGraph tags */}
      <meta property="og:title" content={title || 'Dealora'} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type || 'website'} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name || 'Dealora'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || 'Dealora'} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
