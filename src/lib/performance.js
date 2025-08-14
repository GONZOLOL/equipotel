// Monitoreo de Web Vitals
export const reportWebVitals = (metric) => {
  // Enviar métricas a Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }

  // Enviar métricas a consola en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
};

// Monitoreo de errores
export const reportError = (error, errorInfo) => {
  // Enviar errores a Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: error.toString(),
      fatal: false,
    });
  }

  // Enviar errores a consola en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }
};

// Monitoreo de rendimiento de carga de página
export const trackPageLoadTime = () => {
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'timing_complete', {
          name: 'load',
          value: Math.round(loadTime),
        });
      }
    });
  }
};

// Monitoreo de interacciones del usuario
export const trackUserInteraction = (element, action) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'user_interaction', {
      event_category: 'engagement',
      event_label: `${element}_${action}`,
    });
  }
};

// Monitoreo de tiempo en página
export const trackTimeOnPage = () => {
  if (typeof window !== 'undefined') {
    let startTime = Date.now();
    
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Date.now() - startTime;
      
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'timing_complete', {
          name: 'time_on_page',
          value: Math.round(timeOnPage / 1000), // Convertir a segundos
        });
      }
    });
  }
};

// Monitoreo de scroll
export const trackScrollDepth = () => {
  if (typeof window !== 'undefined') {
    let maxScroll = 0;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Trackear cada 25% de scroll
        if (maxScroll % 25 === 0) {
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'scroll_depth', {
              event_category: 'engagement',
              event_label: `${maxScroll}%`,
            });
          }
        }
      }
    });
  }
};

// Monitoreo de dispositivos y navegadores
export const trackDeviceInfo = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    
    window.gtag('event', 'device_info', {
      event_category: 'system',
      event_label: isMobile ? 'mobile' : 'desktop',
    });
  }
};

// Inicializar todo el monitoreo
export const initPerformanceMonitoring = () => {
  trackPageLoadTime();
  trackTimeOnPage();
  trackScrollDepth();
  trackDeviceInfo();
};
