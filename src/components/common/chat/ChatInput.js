import React, { useState, useRef } from 'react';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';

/**
 * ChatInput Component
 * Message input form with file upload support
 */
const ChatInput = ({ 
  onSendMessage, 
  onFileUpload, 
  sending = false,
  uploadingFile = false,
  enableFileUpload = true 
}) => {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageText = message.trim();
    
    if (messageText && !sending) {
      try {
        await onSendMessage(messageText);
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await onFileUpload(file);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200 p-4 flex-shrink-0 bg-white">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        {enableFileUpload && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingFile || sending}
              className="p-3 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              title="Attach file"
            >
              <FaPaperclip size={20} />
            </button>
          </>
        )}
        
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          rows="2"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
          onKeyPress={handleKeyPress}
          disabled={sending}
        />
        
        <button
          type="submit"
          disabled={!message.trim() || sending}
          className="p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaPaperPlane size={18} />
        </button>
      </form>
      
      {uploadingFile && (
        <p className="text-xs text-gray-500 mt-2">Uploading file...</p>
      )}
      {sending && (
        <p className="text-xs text-gray-500 mt-2">Sending message...</p>
      )}
    </div>
  );
};

export default ChatInput;
