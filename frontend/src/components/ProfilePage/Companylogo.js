import { useState, useEffect } from 'react';
import defaultLogo from './assets/nologo.jpeg'

const CompanyLogo = ({ company }) => {
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    const fetchLogo = async () => {
      const response = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${company}`);
      const data = await response.json();
      setLogoUrl(data[0]?.logo || defaultLogo);
    };

    fetchLogo();
  }, [company]);

  useEffect(() => {
    const image = new Image();
    image.src = logoUrl;
  
    image.onload = function() {
      if (image.width !== 128 || image.height !== 128) {
        setLogoUrl(defaultLogo);
      }
    };
  }, [logoUrl]);

  return <img src={logoUrl} alt='companyLogo' />;
}

export default CompanyLogo;