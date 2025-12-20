import React from 'react';

/**
 * ChatMessages Component
 * Displays a list of messages with proper styling for customer/vendor
 */
const ChatMessages = ({ messages = [], messagesEndRef, userType = 'customer' }) => {
  if (messages.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>No messages yet. Start the conversation!</p>
      </div>
    );
  }

  return (
    <>
      {messages.map((msg) => {
        const isCurrentUser = msg.sender === userType;
        
        return (
          <div
            key={msg.id}
            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${isCurrentUser ? 'order-2' : 'order-1'}`}>
              {!isCurrentUser && (
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                    {msg.avatar ? (
                      <img 
                        src={msg.avatar} 
                        alt={msg.senderName} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-600 text-sm font-medium">
                        {msg.senderName?.charAt(0) || 'V'}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {msg.senderName}
                  </span>
                </div>
              )}
              
              <div
                className={`rounded-lg px-4 py-3 ${
                  isCurrentUser
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{msg.text}</p>
                
                {/* Attachments */}
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {msg.attachments.map((attachment, idx) => (
                      <a
                        key={idx}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs underline flex items-center ${
                          isCurrentUser ? 'text-teal-100' : 'text-teal-600'
                        }`}
                      >
                        📎 {attachment.filename || 'Attachment'}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              
              <p className="text-xs text-gray-500 mt-1">
                {msg.timestamp}
              </p>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </>
  );
};

export default ChatMessages;
