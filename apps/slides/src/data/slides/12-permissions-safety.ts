import type { SlideData } from "../types";

export const permissionsSafety: SlideData = {
  id: "permissions-safety",
  headline: "Permissions for Real Work",
  subheadline: "Match your permission level to the task. Too tight and you babysit every action. Too loose and you risk real damage.",
  section: "advanced",
  blocks: [
    {
      type: "table",
      headers: ["Scenario", "Permission Level", "Why"],
      rows: [
        ["Exploring code, asking questions", "Default (ask each time)", "Zero risk. Full control over every action."],
        ["Making targeted edits", "Auto-edit (files only)", "Claude reads/writes files freely, still asks before shell commands."],
        ["Plan-then-execute session", "Auto-accept after reviewing plan", "You approved the plan. Let Claude execute without interruption."],
        ["Overnight autonomous work", "Skip-permissions + Docker", "The container is the safety net, not the permission prompt."],
      ],
    },
    {
      type: "takeaway",
      icon: "\u{1F6E1}\u{FE0F}",
      text: "The real danger is not the permission level -- it's the combination of private data access + untrusted input + outbound communication at the same time. Remove any one of the three and the risk drops dramatically. Never give all three simultaneously.",
    },
    {
      type: "callout",
      text: "Prompt injection will eventually succeed against any LLM. Build external controls (hooks, containers, deny-lists) that limit damage regardless of what the model decides to do. Defense in depth, not trust in the model.",
      variant: "warning",
    },
    {
      type: "quote",
      text: "Design systems under the assumption that prompt injection will succeed. Build external controls that limit damage regardless of what the LLM decides to do.",
      attribution: "Security engineering principle",
    },
  ],
};
