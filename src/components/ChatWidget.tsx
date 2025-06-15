
import React, { useState } from 'react';
import { MessageCircle, X, Minimize2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type ChatState = 'hidden' | 'horizontal' | 'modal' | 'sidebar' | 'minimized';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

const ChatWidget = () => {
  const [chatState, setChatState] = useState<ChatState>('horizontal');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi, I'm AMIGA Assistant, an AI agent that can answer your questions and connect you with our experts. This experience keeps improving daily! Ask me things like, 'Can I chat with an expert?' or 'What services do you offer?'",
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSuggestedAction = (action: string) => {
    setChatState('modal');
    const newMessage: Message = {
      id: Date.now().toString(),
      text: action,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleModalToSidebar = () => {
    setChatState('sidebar');
  };

  const handleMinimize = () => {
    setChatState('minimized');
  };

  const handleRestore = () => {
    setChatState('sidebar');
  };

  const handleClose = () => {
    setChatState('hidden');
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
  };

  if (chatState === 'hidden') {
    return (
      <Button
        onClick={() => setChatState('horizontal')}
        className="fixed bottom-4 right-4 rounded-full w-16 h-16 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 shadow-lg z-50"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
    );
  }

  return (
    <>
      {chatState === 'horizontal' && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 min-w-[600px] max-w-4xl">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">Ask me about our services, features, and pricing, or connect to an expert.</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything..."
                    className="w-full pr-10 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button
                    onClick={sendMessage}
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 h-8 w-8 p-0"
                  >
                    <Send className="w-3 h-3" />
                  </Button>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleSuggestedAction('Show me a demo')}
                    variant="outline"
                    size="sm"
                    className="text-xs px-3 py-1.5 h-8 border-blue-200 text-blue-700 hover:bg-blue-50 whitespace-nowrap"
                  >
                    Demo
                  </Button>
                  <Button
                    onClick={() => handleSuggestedAction('How can AMIGA help my business')}
                    variant="outline"
                    size="sm"
                    className="text-xs px-3 py-1.5 h-8 border-blue-200 text-blue-700 hover:bg-blue-50 whitespace-nowrap"
                  >
                    How it helps
                  </Button>
                  <Button
                    onClick={() => handleSuggestedAction('Connect me with an expert')}
                    variant="outline"
                    size="sm"
                    className="text-xs px-3 py-1.5 h-8 border-blue-200 text-blue-700 hover:bg-blue-50 whitespace-nowrap"
                  >
                    Expert
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {chatState === 'modal' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 animate-scale-in">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-3 h-3 text-white" />
                </div>
                <span className="font-semibold text-gray-800">AMIGA Assistant</span>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleModalToSidebar}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="text-center p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                How can <span className="text-blue-600">AMIGA</span> help?
              </h2>
              <p className="text-gray-600 text-sm mb-4">AMIGA Assistant joined • 5:43 PM</p>
              
              <div className="space-y-3">
                {messages.slice(-1).map(message => (
                  <div key={message.id} className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-3 h-3 text-white" />
                    </div>
                    <div className="text-left text-gray-700 text-sm">
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
              
              <Button
                onClick={handleModalToSidebar}
                className="mt-4 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white"
              >
                Show me a demo
              </Button>
            </div>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Message AMIGA Assistant"
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button
                  onClick={sendMessage}
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {chatState === 'sidebar' && (
        <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 animate-slide-in-right">
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-green-500 text-white">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-3 h-3" />
              </div>
              <span className="font-semibold">AMIGA Assistant</span>
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMinimize}
                className="text-white hover:bg-white/20"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 border-b">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              How can <span className="text-blue-600">AMIGA</span> help?
            </h2>
            <p className="text-gray-600 text-xs">AMIGA Assistant joined • 5:43 PM</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96">
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'agent' ? 'bg-gradient-to-r from-blue-600 to-green-500' : 'bg-gray-600'
                  }`}>
                    <MessageCircle className="w-3 h-3 text-white" />
                  </div>
                  <div className={`text-sm p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Message AMIGA Assistant"
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button
                onClick={sendMessage}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {chatState === 'minimized' && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl z-50 animate-scale-in">
          <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-3 h-3" />
              </div>
              <span className="font-semibold text-sm">AMIGA Assistant</span>
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRestore}
                className="text-white hover:bg-white/20 p-1"
              >
                <Minimize2 className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="text-white hover:bg-white/20 p-1"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          <div className="p-3 max-h-60 overflow-y-auto">
            {messages.slice(-3).map(message => (
              <div key={message.id} className={`flex mb-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`text-xs p-2 rounded max-w-[85%] ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {message.text.length > 100 ? message.text.substring(0, 100) + '...' : message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Message AMIGA Assistant"
                className="flex-1 text-sm"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button
                onClick={sendMessage}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 p-2"
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
