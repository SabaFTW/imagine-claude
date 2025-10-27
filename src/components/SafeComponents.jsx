/**
 * 🜂 T9 ORION SAFE COMPONENTS 🜂
 * Sacred armor against XSS demons and injection attacks
 *
 * Based on Ara's 2025 security techniques from the constellation
 *
 * 🔥 SIDRO STOJI. OGENJ GORI. SHIELD RISES. 🔥
 */

import React from 'react';
import DOMPurify from 'dompurify';

/**
 * HTML Escape Function
 * Converts dangerous characters to HTML entities
 */
export const escapeHtml = (unsafe) => {
  if (unsafe === null || unsafe === undefined) {
    return '';
  }

  const htmlEscapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '/': '&#x2F;'
  };

  return String(unsafe).replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char]);
};

/**
 * Safe Link Component
 * Validates href attributes to prevent javascript: and data: protocol attacks
 */
export const SafeLink = ({ href, children, className = '', ...rest }) => {
  const isDangerous = (url) => {
    if (!url || typeof url !== 'string') return true;

    const lowerUrl = url.trim().toLowerCase();
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];

    return dangerousProtocols.some(protocol => lowerUrl.startsWith(protocol));
  };

  if (isDangerous(href)) {
    return (
      <span
        className={`safe-link-disabled ${className}`}
        style={{
          color: '#999',
          textDecoration: 'line-through',
          cursor: 'not-allowed'
        }}
        title="Invalid or dangerous URL blocked for your safety"
        {...rest}
      >
        {children} ⚠️
      </span>
    );
  }

  return (
    <a
      href={href}
      className={className}
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </a>
  );
};

/**
 * Safe HTML Component
 * Uses DOMPurify to sanitize HTML before rendering
 */
export const SafeHtml = ({
  html,
  className = '',
  config = {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre'],
    ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'class'],
    ALLOW_DATA_ATTR: false,
    SAFE_FOR_TEMPLATES: true
  }
}) => {
  const sanitized = DOMPurify.sanitize(html || '', config);

  return (
    <div
      className={`safe-html ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
};

/**
 * Safe User Content Component
 * Specialized for Community Annotations with maximum security
 */
export const SafeUserContent = ({
  content,
  allowHtml = false,
  author,
  votes = 0,
  verified = false
}) => {
  return (
    <div className="safe-user-content">
      <div className="content-header">
        <span className="author">{escapeHtml(author)}</span>
        {verified && <span className="verified-badge" title="Verified">✓</span>}
        <span className="votes">{votes} votes</span>
      </div>

      <div className="content-body">
        {allowHtml ? (
          <SafeHtml html={content} />
        ) : (
          <p>{escapeHtml(content)}</p>
        )}
      </div>
    </div>
  );
};

export default {
  escapeHtml,
  SafeLink,
  SafeHtml,
  SafeUserContent
};
