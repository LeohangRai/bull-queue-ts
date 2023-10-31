export interface MailPayload {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: any;
}
