import { AmpersandProvider, InstallIntegration } from "@amp-labs/react";

import '@amp-labs/react/styles';

const options = {
  projectId: process.env.VITE_AMPERSAND_PROJECT_ID as string, // Your Ampersand project ID.
  apiKey: process.env.VITE_AMPERSAND_API_KEY as string, // Your Ampersand API key.
};

function App() {


  const myIntegrationName = "salesforceSubscribe";
  const userId = "demoUserId";
  const userFullName = "Demo User";
  const teamId = "case-sherpa";
  const teamName = "Case Sherpa";
  return (
    <AmpersandProvider options={options}>
      <div
        style={{
          margin: "5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <div style={{ display: "flex", marginTop:40 }}>
          <InstallIntegration
            integration={myIntegrationName}
            consumerRef={userId}
            consumerName={userFullName}
            groupRef={teamId}
            groupName={teamName}
            onInstallSuccess={(installationId, configObject) =>
              console.log(
                `Successfully installed ${installationId} with configuration ${JSON.stringify(
                  configObject,
                  null,
                  2
                )}`
              )
            }
            onUpdateSuccess={(installationId, configObject) =>
              console.log(
                `Successfully updated ${installationId} with configuration ${JSON.stringify(
                  configObject,
                  null,
                  2
                )}`
              )
            }
          />
        </div>
      </div>
    </AmpersandProvider>
  );
}

export default App;
