import { mastra } from "./mastra";

async function testCaseSherpa() {
  // Get the workflow
  const workflow = mastra.getWorkflow("caseSherpaWorkflow");
  const run = workflow.createRun();

  // Sample cases with different priorities
  const testCases = [
    {
      Id: "CASE-001",
      Subject: "Production server down",
      Description: "Our main production server has crashed and all customers are affected. Need immediate assistance.",
    },
    {
      Id: "CASE-002",
      Subject: "Feature enhancement request",
      Description: "Client requested new reporting dashboard features for better data visualization.",
    },
    {
      Id: "CASE-003",
      Subject: "Documentation update",
      Description: "Update API documentation to include recent minor changes in endpoint parameters.",
    }
  ];

  // Process each test case
  for (const testCase of testCases) {
    console.log(`\nStarting workflow with case:`, testCase);
    const result = await run.start({ triggerData: testCase });
    
    // Log the results
    console.log(`\nWorkflow results for case ${testCase.Id}:`);
    console.log(JSON.stringify(result.results, null, 2));
  }
}

// Run the test
testCaseSherpa().catch(console.error); 