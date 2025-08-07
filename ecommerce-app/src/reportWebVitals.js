const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then((webVitals) => {
      // webVitals might be a default export or named exports object
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = webVitals;

      // Defensive check:
      if (getCLS) getCLS(onPerfEntry);
      if (getFID) getFID(onPerfEntry);
      if (getFCP) getFCP(onPerfEntry);
      if (getLCP) getLCP(onPerfEntry);
      if (getTTFB) getTTFB(onPerfEntry);
    }).catch(err => {
      console.error('Failed to load web-vitals:', err);
    });
  }
};

export default reportWebVitals;
