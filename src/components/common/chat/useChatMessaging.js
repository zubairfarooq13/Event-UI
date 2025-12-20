import { useState, useEffect } from 'react';
import { enquiryService } from '../../../services';

/**
 * Custom hook for managing chat messaging functionality
 * @param {string} enquiryId - The enquiry ID
 * @param {Object} options - Configuration options
 * @param {number} options.pollingInterval - Polling interval in ms (default: 5000)
 * @param {boolean} options.enablePolling - Enable/disable polling (default: true)
 * @returns {Object} Chat messaging state and functions
 */
const useChatMessaging = (enquiryId) => {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Format messages from API response to component format
   */
  const formatMessages = (messagesList) => {
    return messagesList.map(msg => ({
      id: msg.id,
      sender: msg.sender_role, // 'customer' or 'vendor'
      senderName: msg.sender_name,
      text: msg.message_text,
      timestamp: new Date(msg.created_at).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      avatar: msg.sender_avatar || null,
      attachments: msg.attachments || []
    }));
  };

  /**
   * Load messages from API
   */
  const loadMessages = async () => {
    if (!enquiryId) return;

    try {
      const response = await enquiryService.getEnquiryById(enquiryId);
      const messagesList = response.data?.enquiry?.messages || [];
      const formattedMessages = formatMessages(messagesList);
      
      setMessages(formattedMessages);
      setError(null);

      // Mark messages as read
      if (formattedMessages.length > 0) {
        enquiryService.markMessagesAsRead(enquiryId)
          .catch(err => console.error('Error marking messages as read:', err));
      }
    } catch (err) {
      console.error('Error loading messages:', err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Send a new message
   */
  const sendMessage = async (messageText) => {
    if (!messageText.trim() || !enquiryId) return;

    setSending(true);
    try {
      const response = await enquiryService.sendMessage(enquiryId, messageText);

      // Add new message to UI optimistically
      const newMessage = {
        id: response.data?.message?.id || response.message?.id || response.id || Date.now(),
        sender: 'customer',
        senderName: 'You',
        text: messageText,
        timestamp: new Date().toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        avatar: null,
        attachments: []
      };

      setMessages(prev => [...prev, newMessage]);
      setError(null);
      return newMessage;
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
      throw err;
    } finally {
      setSending(false);
    }
  };

  /**
   * Upload file attachment
   */
  const uploadAttachment = async (file) => {
    if (!file || !enquiryId) return;

    try {
      const response = await enquiryService.uploadAttachment(enquiryId, file);
      setError(null);
      return response;
    } catch (err) {
      console.error('Error uploading attachment:', err);
      setError('Failed to upload file');
      throw err;
    }
  };

  /**
   * Refresh messages manually
   */
  const refreshMessages = () => {
    return loadMessages();
  };

  // Initial load
  useEffect(() => {
    loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enquiryId]);

  return {
    messages,
    loading,
    sending,
    error,
    sendMessage,
    uploadAttachment,
    refreshMessages
  };
};

export default useChatMessaging;
