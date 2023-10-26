// `nodes` contain any nodes you add from the graph (dependencies)
// `root` is a reference to this program's root node
// `state` is an object that persists across program updates. Store data here.
import { state } from "membrane";

state.messages = state.messages || {};

// This action is invoked for every email received by program
export async function email(message) {
  // Save message
  state.messages[message.id] = message;

  // Print message thread.
  let level = 0;
  let msg = message;
  do {
    format(level++, msg);
    msg = state.messages[msg.inReplyTo];
  } while (msg);
}

// Helper function
const format = (level: number, { from, text, replyText }) => {
  console.log(
    "--".repeat(level) +
      `>  ${from}: ${JSON.stringify(replyText ?? text).slice(0, 50)}`
  );
};
