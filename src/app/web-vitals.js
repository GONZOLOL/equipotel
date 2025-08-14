import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';
import { reportWebVitals } from '@/lib/performance';

function sendToAnalytics(metric) {
    reportWebVitals(metric);
}

export function reportWebVitalsToAnalytics() {
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
}
