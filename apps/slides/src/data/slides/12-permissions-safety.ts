import type { SlideData, DetailSlide } from "../types";

export const permissionsSafety: SlideData = {
  id: "permissions-safety",
  headline: "Data + Untrusted Input + Outbound = Remove Any One",
  subheadline: "The real danger is not the permission level -- it's the combination of private data access + untrusted input + outbound communication at the same time.",
  section: "advanced",
  blocks: [
    {
      type: "takeaway",
      icon: "\u{1F6E1}\u{FE0F}",
      text: "The real danger is not the permission level -- it's the combination of private data access + untrusted input + outbound communication at the same time. Remove any one of the three and the risk drops dramatically. Never give all three simultaneously.",
    },
  ],
};

export const permissionsSafetyDetails: DetailSlide[] = [
  {
    id: "permissions-safety-d1",
    headline: "Permission Levels",
    block: {
      type: "table",
      headers: ["Scenario", "Permission Level", "Why"],
      rows: [
        ["Exploring code, asking questions", "Default (ask each time)", "Zero risk. Full control over every action."],
        ["Making targeted edits", "Auto-edit (files only)", "Claude reads/writes files freely, still asks before shell commands."],
        ["Plan-then-execute session", "Auto-accept after reviewing plan", "You approved the plan. Let Claude execute without interruption."],
        ["Overnight autonomous work", "Skip-permissions + Docker", "The container is the safety net, not the permission prompt."],
      ],
    },
  },
  {
    id: "permissions-safety-d2",
    headline: "Prompt Injection Will Succeed",
    block: {
      type: "callout",
      text: "Prompt injection will eventually succeed against any LLM. Build external controls (hooks, containers, deny-lists) that limit damage regardless of what the model decides to do. Defense in depth, not trust in the model.",
      variant: "warning",
    },
  },
  {
    id: "permissions-safety-d3",
    headline: "Design for Failure",
    block: {
      type: "quote",
      text: "Design systems under the assumption that prompt injection will succeed. Build external controls that limit damage regardless of what the LLM decides to do.",
      attribution: "Security engineering principle",
    },
  },
];
