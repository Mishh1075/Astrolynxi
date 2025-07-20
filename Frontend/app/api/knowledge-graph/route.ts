import { NextResponse } from "next/server"

// Mock GraphQL-like endpoint for knowledge graph data
export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const mockData = {
    nodes: [
      {
        id: "sat_1",
        label: "INSAT-3D",
        type: "satellite",
        properties: {
          launch_date: "2013-07-26",
          status: "active",
          orbit: "geostationary",
        },
      },
      {
        id: "mission_1",
        label: "Weather Monitoring",
        type: "mission",
        properties: {
          start_date: "2013-08-01",
          objective: "meteorological observations",
        },
      },
      {
        id: "sensor_1",
        label: "VHRR",
        type: "sensor",
        properties: {
          resolution: "1km",
          spectral_bands: 6,
        },
      },
      {
        id: "data_1",
        label: "Weather Data",
        type: "data",
        properties: {
          format: "HDF5",
          update_frequency: "hourly",
        },
      },
    ],
    edges: [
      { source: "sat_1", target: "mission_1", relationship: "supports" },
      { source: "sat_1", target: "sensor_1", relationship: "carries" },
      { source: "sensor_1", target: "data_1", relationship: "generates" },
      { source: "mission_1", target: "data_1", relationship: "produces" },
    ],
    metadata: {
      total_nodes: 4,
      total_edges: 4,
      last_updated: new Date().toISOString(),
    },
  }

  return NextResponse.json(mockData)
}

export async function POST(request: Request) {
  const { query } = await request.json()

  // Mock GraphQL query processing
  const response = {
    data: {
      satellites: [
        {
          name: "INSAT-3D",
          status: "active",
          data_available: true,
        },
      ],
    },
  }

  return NextResponse.json(response)
}
