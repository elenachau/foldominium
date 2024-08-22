import { useEffect, useState } from 'react';

const MyComponent = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Fetch the HTML content
    fetch('cpedit.html')
      .then((response) => response.text())
      .then((data) => setHtmlContent(data))
      .catch((error) => console.error('Error fetching HTML:', error));
  }, []);

  useEffect(() => {
    // Load external scripts
    const loadScript = (src: string) => {
      const script = document.createElement('script');
      script.src = src;
      script.type = 'module';
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    };

    loadScript('../../public/node_modules/svg.js/dist/svg.min.js');
    loadScript('../../public/node_modules/fold/dist/fold.js');
    loadScript('../../public/cpedit.js');
    // loadScript('cpedit-bundle.js');
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default MyComponent;
