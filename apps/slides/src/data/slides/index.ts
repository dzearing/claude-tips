import type { PanelData, SlideRow } from "../types";

import { hero } from "./hero";
import { sectionFoundation } from "./section-foundation";
import { attentionBottleneck, attentionBottleneckDetails } from "./00-attention-bottleneck";
import { contextManagement, contextManagementDetails } from "./02-context-management";
import { parallelIsolation, parallelIsolationDetails } from "./02a-parallel-isolation";
import { overlappingConcerns, overlappingConcernsDetails } from "./02b-overlapping-concerns";
import { sectionGuardrails } from "./section-guardrails";
import { guardrails, guardrailsDetails } from "./01a-guardrails";
import { sectionCore } from "./section-core";
import { skillsExtension, skillsExtensionDetails } from "./03a-skills-extension";
import { browserInLoop, browserInLoopDetails } from "./03b-browser-in-loop";
import { gitCodeReview, gitCodeReviewDetails } from "./05-git-code-review";
import { testingVerification, testingVerificationDetails } from "./06-testing-verification";
import { promptEngineering, promptEngineeringDetails } from "./07-prompt-engineering";
import { sectionAdvanced } from "./section-advanced";
import { sessionDiscipline, sessionDisciplineDetails } from "./08-session-discipline";
import { mcpIntegrations, mcpIntegrationsDetails } from "./09-mcp-integrations";
import { automationDevops, automationDevopsDetails } from "./11-automation-devops";
import { sectionBeyond } from "./section-beyond";
import { extendYourReach, extendYourReachDetails } from "./13-extend-your-reach";
import { creatorWorkflow, creatorWorkflowDetails } from "./14-creator-workflow";
import { patternsCompound, patternsCompoundDetails } from "./15-patterns-compound";

export const rows: SlideRow[] = [
  { gist: hero, details: [] },
  { gist: sectionFoundation, details: [] },
  { gist: attentionBottleneck, details: attentionBottleneckDetails },
  { gist: contextManagement, details: contextManagementDetails },
  { gist: parallelIsolation, details: parallelIsolationDetails },
  { gist: overlappingConcerns, details: overlappingConcernsDetails },
  { gist: sectionGuardrails, details: [] },
  { gist: guardrails, details: guardrailsDetails },
  { gist: sectionCore, details: [] },
  { gist: skillsExtension, details: skillsExtensionDetails },
  { gist: browserInLoop, details: browserInLoopDetails },
  { gist: gitCodeReview, details: gitCodeReviewDetails },
  { gist: testingVerification, details: testingVerificationDetails },
  { gist: promptEngineering, details: promptEngineeringDetails },
  { gist: sectionAdvanced, details: [] },
  { gist: sessionDiscipline, details: sessionDisciplineDetails },
  { gist: mcpIntegrations, details: mcpIntegrationsDetails },
  { gist: automationDevops, details: automationDevopsDetails },
  { gist: sectionBeyond, details: [] },
  { gist: extendYourReach, details: extendYourReachDetails },
  { gist: creatorWorkflow, details: creatorWorkflowDetails },
  { gist: patternsCompound, details: patternsCompoundDetails },
];

/** Flat list of gist panels for backward compatibility */
export const panels: PanelData[] = rows.map((r) => r.gist);
