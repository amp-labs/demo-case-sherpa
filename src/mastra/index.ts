import { Mastra } from "@mastra/core";
import { createLogger } from "@mastra/core/logger";
import { caseSherpaWorkflow } from "./workflows/case-triage";
import { caseSherpaAgent } from "./agents";
// Create and export the Mastra instance
export const mastra = new Mastra({
  workflows: {
    caseSherpaWorkflow,
  },
  agents: {
    caseSherpaAgent,
  },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
}); 