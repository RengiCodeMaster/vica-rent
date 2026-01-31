export interface Car {
  id: string;
  name: string;
  type: 'SUV' | 'Pickup' | 'Sedan' | 'Van';
  price: number;
  image: string;
  features: string[];
  passengers: number;
  transmission: 'Automático' | 'Mecánico';
  available: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  groundingMetadata?: GroundingMetadata;
  isError?: boolean;
}

export interface GroundingMetadata {
  groundingChunks: GroundingChunk[];
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}