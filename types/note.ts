export interface Note {
  id: number;
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
  createdAt: string;
  updatedAt: string;
}

export type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";