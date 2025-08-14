// Configuración de Google Analytics
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Función para trackear eventos de Google Analytics
export const trackEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Función para trackear páginas vistas
export const trackPageView = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Función para trackear conversiones
export const trackConversion = (conversionId, conversionLabel) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${GA_TRACKING_ID}/${conversionId}/${conversionLabel}`,
    });
  }
};

// Función para trackear formularios
export const trackFormSubmission = (formName) => {
  trackEvent('form_submit', 'engagement', formName);
};

// Función para trackear clicks en productos
export const trackProductClick = (productName, productCategory) => {
  trackEvent('product_click', 'ecommerce', productName, 1);
};

// Función para trackear llamadas telefónicas
export const trackPhoneCall = () => {
  trackEvent('phone_call', 'engagement', 'contact');
};

// Función para trackear emails
export const trackEmailClick = () => {
  trackEvent('email_click', 'engagement', 'contact');
};

// Configuración de Facebook Pixel
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

// Función para trackear eventos de Facebook Pixel
export const trackFbEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};

// Función para trackear conversiones de Facebook
export const trackFbConversion = (value, currency = 'EUR') => {
  trackFbEvent('Purchase', {
    value: value,
    currency: currency,
  });
};

// Función para trackear leads de Facebook
export const trackFbLead = () => {
  trackFbEvent('Lead');
};

// Función para trackear vistas de contenido
export const trackFbViewContent = (contentName, contentCategory) => {
  trackFbEvent('ViewContent', {
    content_name: contentName,
    content_category: contentCategory,
  });
};
