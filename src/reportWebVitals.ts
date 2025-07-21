type ReportHandler = (metric: {
  id: string;
  name: string;
  value: number;
}) => void;

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then((webVitals) => {
      webVitals.onCLS(onPerfEntry);
      webVitals.onFID(onPerfEntry);
      webVitals.onFCP(onPerfEntry);
      webVitals.onLCP(onPerfEntry);
      webVitals.onTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;