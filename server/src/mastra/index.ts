import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";
import { caseSherpaAgent } from "./agents";

export const mastra = new Mastra({
  agents: {
    caseSherpaAgent, 
  },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
}); 