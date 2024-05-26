import { Session, Chatbox } from "@talkjs/react";

export default function Chat() {
  return (
    <Session appId="t7cn6UCj" userId="sample_user_alice">
      <Chatbox conversationId="sample_conversation" />
    </Session>
  );
}