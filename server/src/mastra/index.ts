import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";
import { caseSherpaAgent } from "./agents";

// Create and export the Mastra instance
export const mastra = new Mastra({
  agents: {
    caseSherpaAgent, 
  },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
}); 