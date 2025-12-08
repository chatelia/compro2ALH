export interface Product {
  id: string;
  category: 'Sound System' | 'Lighting' | 'Music';
  name: string;
  specs: string[];
  price: string;
  image: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  options?: { label: string; value: string }[];
  isHtml?: boolean; // For bolding text or complex formatting
}

export interface ChatStep {
  message: string;
  options?: { [key: string]: string }; // Map input "1" to nextStepId "step_1"
  actions?: { label: string; value: string }[]; // For UI buttons
  isEndpoint?: boolean;
}