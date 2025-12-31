import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatWidget.module.css';

/**
 * AI Assistant Chat Widget Component for Docusaurus
 * Intelligent conversational interface with memory and RAG capabilities
 */
function ChatWidget({ apiUrl = 'http://localhost:8000' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm your Physical AI assistant. I can help you with ROS 2, VLA systems, robotics, and more. I'll remember our conversation context!",
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [useRag, setUseRag] = useState(false);  // Default to false to avoid quota issues
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          conversation_id: conversationId,
          use_rag: useRag
        })
      });

      if (!response.ok) {
        throw new Error('Chat request failed');
      }

      const data = await response.json();

      // Store conversation ID for continuity
      if (!conversationId) {
        setConversationId(data.conversation_id);
      }

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: data.message,
          sources: data.sources,
          timestamp: data.timestamp
        }
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: '❌ Sorry, I encountered an error. Make sure the backend server is running at ' + apiUrl,
          timestamp: new Date().toISOString()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearConversation = async () => {
    if (!conversationId) {
      // Just clear local messages
      setMessages([
        {
          role: 'assistant',
          content: "👋 Hi! I'm your Physical AI assistant. I can help you with ROS 2, VLA systems, robotics, and more. I'll remember our conversation context!",
          timestamp: new Date().toISOString()
        }
      ]);
      return;
    }

    try {
      await fetch(`${apiUrl}/conversation/${conversationId}`, {
        method: 'DELETE'
      });
      setConversationId(null);
      setMessages([
        {
          role: 'assistant',
          content: "👋 Conversation cleared! How can I help you today?",
          timestamp: new Date().toISOString()
        }
      ]);
    } catch (error) {
      console.error('Clear conversation error:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.chatWidget}>
      {/* Chat Toggle Button */}
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <h3>🤖 AI Assistant</h3>
              <span className={styles.status}>
                {conversationId ? '🧠 Memory Active' : '💭 New Chat'}
              </span>
            </div>
            <div className={styles.headerActions}>
              <button
                className={styles.clearButton}
                onClick={handleClearConversation}
                title="Clear conversation"
              >
                🔄
              </button>
              <label className={styles.ragToggle} title="Toggle RAG retrieval">
                <input
                  type="checkbox"
                  checked={useRag}
                  onChange={(e) => setUseRag(e.target.checked)}
                />
                <span className={styles.ragLabel}>
                  {useRag ? '📚 RAG On' : '📚 RAG Off'}
                </span>
              </label>
            </div>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.message} ${styles[msg.role]}`}
              >
                <div className={styles.messageContent}>
                  {msg.content}
                </div>
                {msg.sources && msg.sources.length > 0 && (
                  <div className={styles.sources}>
                    <small>📖 Sources:</small>
                    {msg.sources.map((src, sidx) => (
                      <span key={sidx} className={styles.sourceTag} title={src.content}>
                        {src.source}
                      </span>
                    ))}
                  </div>
                )}
                {msg.timestamp && (
                  <div className={styles.timestamp}>
                    <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.assistant}`}>
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about Physical AI, robotics, ROS 2..."
              rows={2}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className={styles.sendButton}
            >
              {isLoading ? '⏳' : '📤'} Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;
