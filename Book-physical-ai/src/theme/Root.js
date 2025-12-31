import React from 'react';
import ChatWidgetLoader from '@site/src/components/ChatWidgetLoader';

/**
 * Docusaurus Root theme file - injects global components into every page
 * This is the proper Docusaurus way to add global React components
 */
export default function Root({children}) {
  return (
    <>
      {children}
      <ChatWidgetLoader />
    </>
  );
}
