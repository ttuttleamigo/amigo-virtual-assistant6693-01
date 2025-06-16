
import { useState } from 'react';
import { ProductInfo } from '@/services/serialNumberService';

export type ChatState = 'hidden' | 'horizontal' | 'modal' | 'sidebar';

export interface ChatStateManager {
  chatState: ChatState;
  previousState: ChatState;
  setChatState: (state: ChatState) => void;
  setPreviousState: (state: ChatState) => void;
  handleModalToSidebar: () => void;
  handleMinimize: () => void;
  handleClose: () => void;
  handleChatButtonClick: () => void;
}

export interface ChatInputState {
  inputValue: string;
  setInputValue: (value: string) => void;
  productInfo: ProductInfo | null;
  setProductInfo: (info: ProductInfo | null) => void;
  expectingSerialNumber: boolean;
  setExpectingSerialNumber: (expecting: boolean) => void;
  expectingModel: boolean;
  setExpectingModel: (expecting: boolean) => void;
  allowSerialNumberEntry: boolean;
  setAllowSerialNumberEntry: (allow: boolean) => void;
  showInitialButtons: boolean;
  setShowInitialButtons: (show: boolean) => void;
}

export const useChatState = (): ChatStateManager => {
  const [chatState, setChatState] = useState<ChatState>('horizontal');
  const [previousState, setPreviousState] = useState<ChatState>('horizontal');

  const handleModalToSidebar = () => {
    setChatState('sidebar');
    setPreviousState('sidebar');
  };

  const handleMinimize = () => {
    setChatState('modal');
    setPreviousState('modal');
  };

  const handleClose = () => {
    if (chatState !== 'hidden' && chatState !== 'horizontal') {
      setPreviousState(chatState);
    }
    setChatState('hidden');
  };

  const handleChatButtonClick = () => {
    if (previousState !== 'horizontal') {
      setChatState(previousState);
    } else {
      setChatState('horizontal');
    }
  };

  return {
    chatState,
    previousState,
    setChatState,
    setPreviousState,
    handleModalToSidebar,
    handleMinimize,
    handleClose,
    handleChatButtonClick
  };
};

export const useChatInputState = (): ChatInputState => {
  const [inputValue, setInputValue] = useState('');
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [expectingSerialNumber, setExpectingSerialNumber] = useState(false);
  const [expectingModel, setExpectingModel] = useState(false);
  const [allowSerialNumberEntry, setAllowSerialNumberEntry] = useState(false);
  const [showInitialButtons, setShowInitialButtons] = useState(false);

  return {
    inputValue,
    setInputValue,
    productInfo,
    setProductInfo,
    expectingSerialNumber,
    setExpectingSerialNumber,
    expectingModel,
    setExpectingModel,
    allowSerialNumberEntry,
    setAllowSerialNumberEntry,
    showInitialButtons,
    setShowInitialButtons
  };
};
