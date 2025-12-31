import React from 'react';
import { useLocation } from '@docusaurus/router';
import ChatWidget from './ChatWidget';

// Default API URL - change this if your backend runs elsewhere
const CHAT_API_URL = 'http://localhost:8000';

export default function ChatWidgetLoader() {
  // Show chat on all pages
  return <ChatWidget apiUrl={CHAT_API_URL} />;
}
