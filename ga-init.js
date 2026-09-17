'use strict';
(function(){
  const MEASUREMENT_ID='G-32P1J6H5JB';
  try {
    window.dataLayer=window.dataLayer||[];
    window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};

    const s=document.createElement('script');
    s.async=true;
    s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(MEASUREMENT_ID);
    s.onload=function(){
      document.documentElement.dataset.p07GaLoader='loaded';
    };
    s.onerror=function(){
      document.documentElement.dataset.p07GaLoader='error';
      console.warn('[P-07 Analytics] Google tag unavailable; service continues.');
    };

    document.head.appendChild(s);
    window.gtag('js',new Date());
    window.gtag('config',MEASUREMENT_ID);
  } catch (e) {
    document.documentElement.dataset.p07GaLoader='exception';
    console.warn('[P-07 Analytics] initialization skipped; service continues.',e);
  }
})();
