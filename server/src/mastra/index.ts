import { Mastra } from "@mastra/core";
import { createLogger } from "@mastra/core";
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