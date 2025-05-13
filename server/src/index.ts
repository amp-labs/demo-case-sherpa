import express, { Request, Response } from "express";
import { caseSherpaAgent } from "./mastra/agents";

const PORT = process.env.PORT || 4001;
const app = express();

app.use(express.json());

const processSubscribe = async (req: Request, res: Response) => {
  try {
    const webhookData = req.body;
    
    if (webhookData && webhookData.result && webhookData.result.length > 0) {
      const caseData = webhookData.result[0].fields;
      
      console.log("caseData", caseData)
      const response = await caseSherpaAgent.generate([
        { role: "user", content: 
          `Could you please analyse the case data: \n\n ${JSON.stringify(caseData, null, 2)} 
          
          - After analyzing the case, update the case object in Salesforce using the updateRecordTool with the following fields in the record object:
            - id - the id of the case object
            - AI_Severity_c__c
            - AI_Summary_c__c` },
      ]);
      
      return res.status(200).json({ text: response?.text });
    } else {
      return res.status(400).json({ error: "Invalid webhook data format" });
    }
  } catch (error) {
    console.error("Error processing case:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

app.post("/process", async (req: Request, res: Response) => {
  try {
    await processSubscribe(req, res);
  } catch (error) {
    console.error("Error processing case:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
