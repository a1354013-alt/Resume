import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
}

/**
 * SEO Head Component
 * 
 * 動態設置頁面 meta 標籤以改善 SEO 和社交分享
 */
export default function SEOHead({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  canonical,
}: SEOHeadProps) {
  useEffect(() => {
    // 設置頁面標題
    document.title = title;

    // 設置或更新 meta 標籤
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      let element = document.querySelector(
        isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
      );
      
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // 基本 meta 標籤
    setMetaTag('description', description);
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph 標籤
    setMetaTag('og:title', ogTitle || title, true);
    setMetaTag('og:description', ogDescription || description, true);
    if (ogImage) {
      setMetaTag('og:image', ogImage, true);
    }
    if (ogUrl) {
      setMetaTag('og:url', ogUrl, true);
    }
    setMetaTag('og:type', 'website', true);

    // Twitter Card 標籤
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', ogTitle || title);
    setMetaTag('twitter:description', ogDescription || description);
    if (ogImage) {
      setMetaTag('twitter:image', ogImage);
    }

    // Canonical URL
    if (canonical) {
      let canonicalElement = document.querySelector('link[rel="canonical"]');
      if (!canonicalElement) {
        canonicalElement = document.createElement('link');
        canonicalElement.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalElement);
      }
      canonicalElement.setAttribute('href', canonical);
    }
  }, [title, description, ogTitle, ogDescription, ogImage, ogUrl, canonical]);

  return null;
}
