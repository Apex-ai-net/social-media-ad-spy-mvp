import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { action, entities, query } = await request.json();
    
    switch (action) {
      case 'create_entities':
        return await handleCreateEntities(entities);
      case 'search_nodes':
        return await handleSearchNodes(query);
      case 'read_graph':
        return await handleReadGraph();
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Memory MCP error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handleCreateEntities(entities: any[]) {
  try {
    console.log('Storing ad intelligence entities:', entities.map(e => e.name));
    
    // Simulate storage delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const timestamp = new Date().toISOString();
    const storedEntities = entities.map(entity => ({
      ...entity,
      id: generateAdIntelligenceId(),
      createdAt: timestamp,
      updatedAt: timestamp,
      type: 'ad_intelligence'
    }));
    
    return NextResponse.json({ 
      success: true, 
      stored: storedEntities.length,
      entities: storedEntities,
      message: 'Ad intelligence stored successfully'
    });
  } catch (error) {
    throw new Error(`Entity creation failed: ${error}`);
  }
}

async function handleSearchNodes(query: string) {
  try {
    console.log('Searching ad intelligence for:', query);
    
    // Mock search results for ad intelligence
    const mockResults = [
      {
        id: 'ad_intel_001',
        name: 'AdCampaign_Nike_Performance',
        entityType: 'Advertisement Intelligence',
        observations: [
          'Competitor Score: 94/100',
          'Total Active Ads: 28',
          'Estimated Daily Spend: $8,500',
          'Video focus: 71% video content',
          'Strong athletic lifestyle messaging',
          'Heavy Instagram presence',
          'Running 60+ day campaigns'
        ],
        relevanceScore: 0.95,
        lastUpdated: '2025-07-31T10:30:00Z'
      },
      {
        id: 'ad_intel_002', 
        name: 'AdCampaign_Adidas_Originals',
        entityType: 'Advertisement Intelligence',
        observations: [
          'Competitor Score: 89/100',
          'Total Active Ads: 22',
          'Estimated Daily Spend: $6,200',
          'Strong carousel usage: 45%',
          'Retro/vintage creative themes',
          'Celebrity endorsement focus',
          'High social proof messaging'
        ],
        relevanceScore: 0.87,
        lastUpdated: '2025-07-31T09:15:00Z'
      },
      {
        id: 'ad_intel_003',
        name: 'AdCampaign_Lululemon_Mindful',
        entityType: 'Advertisement Intelligence',
        observations: [
          'Competitor Score: 91/100',
          'Total Active Ads: 19',
          'Estimated Daily Spend: $4,800',
          'Wellness/mindfulness messaging',
          'High-quality lifestyle photography',
          'Community-focused content',
          'Premium pricing strategy'
        ],
        relevanceScore: 0.82,
        lastUpdated: '2025-07-31T08:45:00Z'
      }
    ];
    
    const filteredResults = mockResults.filter(r => 
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.observations.some(obs => obs.toLowerCase().includes(query.toLowerCase()))
    );
    
    return NextResponse.json({ 
      success: true, 
      results: filteredResults,
      query: query,
      totalFound: filteredResults.length
    });
  } catch (error) {
    throw new Error(`Search failed: ${error}`);
  }
}

async function handleReadGraph() {
  try {
    console.log('Reading ad intelligence knowledge graph...');
    
    const mockGraph = {
      entities: [
        {
          id: 'ad_intel_001',
          name: 'AdCampaign_Nike_Performance',
          entityType: 'Advertisement Intelligence',
          observations: [
            'Competitor Score: 94/100',
            'Total Active Ads: 28',
            'Estimated Daily Spend: $8,500',
            'Estimated Monthly Spend: $255,000',
            'Video Ads: 20 (71%)',
            'Image Ads: 5 (18%)', 
            'Carousel Ads: 3 (11%)',
            'Heavy video focus: 71% of ads use video content',
            'Strong ad longevity: 8 ads running 30+ days',
            'Cross-platform strategy: Running ads on both Facebook and Instagram',
            'Using urgency messaging to drive immediate action'
          ],
          lastAnalyzed: '2025-07-31T10:30:00Z'
        },
        {
          id: 'ad_intel_002',
          name: 'AdCampaign_Gymshark_Fitness',
          entityType: 'Advertisement Intelligence',
          observations: [
            'Competitor Score: 91/100',
            'Total Active Ads: 24',
            'Estimated Daily Spend: $7,200',
            'Estimated Monthly Spend: $216,000',
            'Video Ads: 16 (67%)',
            'Image Ads: 6 (25%)',
            'Carousel Ads: 2 (8%)',
            'Heavy influencer collaboration content',
            'Strong workout transformation themes',
            'High-energy motivational messaging',
            'Community-building focus'
          ],
          lastAnalyzed: '2025-07-31T09:45:00Z'
        }
      ],
      relations: [
        {
          from: 'AdCampaign_Nike_Performance',
          to: 'AdStrategy_Athletic_Lifestyle',
          relationType: 'employs'
        },
        {
          from: 'AdCampaign_Gymshark_Fitness',
          to: 'AdStrategy_Influencer_Marketing',
          relationType: 'employs'
        },
        {
          from: 'AdCampaign_Nike_Performance',
          to: 'AdCampaign_Gymshark_Fitness',
          relationType: 'competes_with'
        }
      ],
      insights: [
        {
          type: 'trend',
          description: 'Video content dominance in fitness/athletic brands (69% average)',
          confidence: 0.92
        },
        {
          type: 'opportunity',
          description: 'Carousel ads underutilized in athletic sector (avg 12% vs 35% industry)',
          confidence: 0.85
        },
        {
          type: 'pattern',
          description: 'Successful campaigns run 30+ days with gradual creative refresh',
          confidence: 0.88
        }
      ],
      statistics: {
        totalCampaigns: 2,
        totalAds: 52,
        avgCompetitorScore: 92.5,
        lastUpdated: new Date().toISOString()
      }
    };
    
    return NextResponse.json({ 
      success: true, 
      graph: mockGraph,
      message: 'Knowledge graph retrieved successfully'
    });
  } catch (error) {
    throw new Error(`Graph read failed: ${error}`);
  }
}

function generateAdIntelligenceId(): string {
  return 'ad_intel_' + Math.random().toString(36).substr(2, 9);
}