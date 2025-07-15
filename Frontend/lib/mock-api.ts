import type { KnowledgeGraphNode, SuggestedQuery } from "./types"

// Mock GraphQL endpoint simulation
export const mockGraphQLEndpoint = {
  async getKnowledgeGraph(): Promise<KnowledgeGraphNode[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return [
      { id: "1", label: "Chandrayaan-3", type: "mission", connections: ["2", "3"] },
      { id: "2", label: "VIKRAM Lander", type: "satellite", connections: ["1", "4"] },
      { id: "3", label: "PRAGYAN Rover", type: "satellite", connections: ["1", "5"] },
      { id: "4", label: "LHDAC", type: "sensor", connections: ["2"] },
      { id: "5", label: "LIBS", type: "sensor", connections: ["3"] },
      { id: "6", label: "CARTOSAT-3", type: "satellite", connections: ["7"] },
      { id: "7", label: "PAN Camera", type: "sensor", connections: ["6"] },
    ]
  },

  async getSuggestedQueries(): Promise<SuggestedQuery[]> {
    return [
      { id: "1", text: "Show me latest INSAT-3D weather data", category: "Weather" },
      { id: "2", text: "What are the active missions of ISRO?", category: "Missions" },
      { id: "3", text: "Find cyclone tracking data for Bay of Bengal", category: "Disaster" },
      { id: "4", text: "Show CARTOSAT imagery for urban planning", category: "Urban" },
      { id: "5", text: "Ocean color data from Oceansat-3", category: "Ocean" },
    ]
  },
}
