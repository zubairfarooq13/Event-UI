import React, { useRef, useEffect, useState } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import useChatMessaging from './useChatMessaging';

/**
 * EnquiryChat Component
 * Independent chat module for enquiry messaging
 */
const EnquiryChat = ({ 
  enquiryId,
  userType = 'customer',
  enableFileUpload = true,
  className = '',
  onMessageSent,
  enquirySummary = null
}) => {
  const messagesEndRef = useRef(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  const {
    messages,
    loading,
    sending,
    error,
    sendMessage,
    uploadAttachment
  } = useChatMessaging(enquiryId);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (messageText) => {
    try {
      const newMessage = await sendMessage(messageText);
      if (onMessageSent) {
        onMessageSent(newMessage);
      }
    } catch (error) {
      alert('Failed to send message. Please try again.');
    }
  };

  const handleFileUpload = async (file) => {
    setUploadingFile(true);
    try {
      await uploadAttachment(file);
      // Send message with attachment info
      const attachmentMessage = `📎 ${file.name}`;
      await handleSendMessage(attachmentMessage);
    } catch (error) {
      alert('Failed to upload file. Please try again.');
    } finally {
      setUploadingFile(false);
    }
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 flex items-center justify-center p-8 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 flex flex-col min-h-0 overflow-hidden ${className}`}>
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-b border-red-200 p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
        <div className="p-6 space-y-4 min-h-full">
          {/* Enquiry Summary - if provided */}
          {enquirySummary && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              {enquirySummary}
            </div>
          )}
          
          <ChatMessages 
            messages={messages}
            messagesEndRef={messagesEndRef}
            userType={userType}
          />
        </div>
      </div>

      {/* Message Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        onFileUpload={handleFileUpload}
        sending={sending}
        uploadingFile={uploadingFile}
        enableFileUpload={enableFileUpload}
      />
    </div>
  );
};

export default EnquiryChat;
