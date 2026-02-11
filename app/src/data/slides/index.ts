import type { PanelData } from "../types";

import { hero } from "./hero";
import { sectionFoundation } from "./section-foundation";
import { attentionBottleneck } from "./00-attention-bottleneck";
import { claudeMd } from "./01-claude-md";
import { contextManagement } from "./02-context-management";
import { sectionCore } from "./section-core";
import { skillsExtension } from "./03a-skills-extension";
import { browserInLoop } from "./03b-browser-in-loop";
import { parallelWorkflows } from "./04-parallel-workflows";
import { gitCodeReview } from "./05-git-code-review";
import { testingVerification } from "./06-testing-verification";
import { promptEngineering } from "./07-prompt-engineering";
import { sectionAdvanced } from "./section-advanced";
import { sessionDiscipline } from "./08-session-discipline";
import { mcpIntegrations } from "./09-mcp-integrations";
import { stayingEffective } from "./10-staying-effective";
import { automationDevops } from "./11-automation-devops";
import { permissionsSafety } from "./12-permissions-safety";
import { sectionBeyond } from "./section-beyond";
import { extendYourReach } from "./13-extend-your-reach";
import { creatorWorkflow } from "./14-creator-workflow";
import { patternsCompound } from "./15-patterns-compound";

export const panels: PanelData[] = [
  hero,
  sectionFoundation,
  attentionBottleneck,
  claudeMd,
  contextManagement,
  sectionCore,
  skillsExtension,
  browserInLoop,
  parallelWorkflows,
  gitCodeReview,
  testingVerification,
  promptEngineering,
  sectionAdvanced,
  sessionDiscipline,
  mcpIntegrations,
  stayingEffective,
  automationDevops,
  permissionsSafety,
  sectionBeyond,
  extendYourReach,
  creatorWorkflow,
  patternsCompound,
];
