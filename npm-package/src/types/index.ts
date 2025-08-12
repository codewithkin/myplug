export interface WaitlistUser {
    id: string;
    email: string;
    joinedAt: Date;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
    plan: string;
    sessions: Session[];
    accounts: Account[];
    chatBots: ChatBot[];
    apikeys: Apikey[];
  }
  
  export interface Session {
    id: string;
    expiresAt: Date;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    ipAddress?: string | null;
    userAgent?: string | null;
    userId: string;
    user: User;
  }
  
  export interface Account {
    id: string;
    accountId: string;
    providerId: string;
    userId: string;
    user: User;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: Date | null;
    refreshTokenExpiresAt?: Date | null;
    scope?: string | null;
    password?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Verification {
    id: string;
    identifier: string;
    value: string;
    expiresAt: Date;
    createdAt?: Date | null;
    updatedAt?: Date | null;
  }
  
  export interface ChatBot {
    id: string;
    userId: string;
    user: User;
    name: string;
    websiteUrl: string;
    chats: Chat[];
    template: string;
    dataFile?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Chat {
    id: string;
    chatBotId: string;
    chatBot: ChatBot;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Apikey {
    id: string;
    name?: string | null;
    start?: string | null;
    prefix?: string | null;
    key: string;
    userId: string;
    user: User;
    refillInterval?: number | null;
    refillAmount?: number | null;
    lastRefillAt?: Date | null;
    enabled?: boolean | null;
    rateLimitEnabled?: boolean | null;
    rateLimitTimeWindow?: number | null;
    rateLimitMax?: number | null;
    requestCount?: number | null;
    remaining?: number | null;
    lastRequest?: Date | null;
    expiresAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    permissions?: string | null;
    metadata?: string | null;
  }
  
  export interface Message {
    id: string;
    chatId: string;
    chat: Chat;
    content: string;
    createdAt: Date;
  }