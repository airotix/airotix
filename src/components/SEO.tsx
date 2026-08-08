import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  name?: string;
  imageUrl?: string;
  publishDate?: string;
  modifiedDate?: string;
  author?: string;
  category?: string;
  keywords?: string[];
  isBlogPost?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = 'AIROTIX | AI Solutions & Automation',
  description = 'AIROTIX builds high-performance AI and computer vision systems that see, understand, and act in real time for enterprise automation.',
  type = 'website',
  name = 'AIROTIX Technologies',
  imageUrl = '/lovable-uploads/48ecf6e2-5a98-4a9d-af6f-ae2265cd4098.png',
  publishDate,
  modifiedDate,
  author,
  category,
  keywords = [
    'computer vision',
    'AI automation',
    'industrial AI',
    'factory defect detection',
    'real-time inspection',
    'YOLOv8',
    'machine learning',
    'automation solutions',
    'AI for manufacturing',
    'enterprise AI systems',
    'AIROTIX'
  ],
  isBlogPost = false
}) => {
  const location = useLocation();
  const currentUrl = `https://airotix.com${location.pathname}`;
  const absoluteImageUrl = imageUrl.startsWith('http')
    ? imageUrl
    : `https://airotix.com${imageUrl}`;

  /* --- KEYWORD EXPANSION LOGIC (optional, smart enrichment) --- */
  const enhancedKeywords = [
    ...keywords,
    'AI solutions company',
    'AI automation services',
    'AI computer vision consulting',
    'top AI companies',
    'enterprise automation'
  ];

  /* --- STRUCTURED DATA: WebSite + SearchAction (Google Search Box) --- */
  const webSiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AIROTIX Technologies',
    url: 'https://airotix.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://airotix.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  /* --- STRUCTURED DATA: Organization --- */
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AIROTIX Technologies',
    url: 'https://airotix.com',
    logo: 'https://airotix.com/lovable-uploads/airotix.logo.white.png',
    description:
      'AIROTIX specializes in computer vision, AI automation, real-time inspection systems, and intelligent analytics for industrial and enterprise applications.',
    sameAs: [
      'https://www.linkedin.com/company/airotix',
      'https://twitter.com/airotix'
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'airotix@gmail.com',
        availableLanguage: ['en']
      }
    ]
  };

  /* --- STRUCTURED DATA: BLOG POSTS (enhanced for Google Discover) --- */
  const blogPostStructuredData =
    isBlogPost && publishDate
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': currentUrl
          },
          headline: title,
          description,
          image: absoluteImageUrl,
          datePublished: publishDate,
          dateModified: modifiedDate || publishDate,
          author: {
            '@type': 'Organization',
            name: author || 'AIROTIX Technologies'
          },
          publisher: {
            '@type': 'Organization',
            name: 'AIROTIX Technologies',
            logo: {
              '@type': 'ImageObject',
              url: 'https://airotix.com/lovable-uploads/airotix.logo.white.png',
              width: 1024,
              height: 1024
            }
          },
          articleSection: category || 'AI & Computer Vision',
          keywords: enhancedKeywords.join(', '),
          isAccessibleForFree: true
        }
      : null;

  /* --- OPTIONAL: Add FAQs if needed (you can keep your existing ones) --- */

  const keywordString = enhancedKeywords.join(', ');

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywordString} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content={author || name} />

      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={isBlogPost ? 'article' : type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="AIROTIX Technologies" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      <meta name="twitter:creator" content="@airotix" />

      {/* Theme */}
      <meta name="theme-color" content="#000000" />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(webSiteStructuredData)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(organizationStructuredData)}
      </script>

      {blogPostStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(blogPostStructuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
