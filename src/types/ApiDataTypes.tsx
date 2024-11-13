export interface SampleQustion {
  id: number;
  text: string;
  chatbot_id: number;
  created_at: string;
  updatedAt: string;
}

export interface IknowledgeBase {
  id: number;
  active_status: boolean;
  path: string;
  chatbot_id: number;
  created_at: string;
  updatedAt: string;
}
