'use client';

import { useState } from 'react';
import { Search, TrendingUp, Target, Video, Image, Layers, Play, ExternalLink, Calendar, DollarSign, Eye, Zap, AlertCircle, CheckCircle } from 'lucide-react';

interface AdAnalysis {
  brandName: string;
  totalAds: number;
  analysisDate: string;
  adBreakdown: {
    video: number;
    image: number;
    carousel: number;
  };
  topPerformingAds: AdCreative[];
  insights: string[];
  opportunities: string[];
  estimatedSpend: {
    daily: string;
    monthly: string;
  };
  competitorScore: number;
}

interface AdCreative {
  id: string;
  type: 'video' | 'image' | 'carousel';
  headline: string;
  bodyText: string;
  callToAction: string;
  creative: string;
  estimatedReach: string;
  runningDays: number;
  performanceScore: number;
  platform: 'facebook' | 'instagram' | 'both';
}

export default function AdSpyHomePage() {
  const [brandName, setBrandName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AdAnalysis | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!brandName.trim()) {
      setError('Please enter a brand name');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/analyze-ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brandName: brandName.trim() })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook': return '📘';
      case 'instagram': return '📷';
      case 'both': return '📱';
      default: return '📱';
    }
  };

  const getAdTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className=\"h-4 w-4\" />;
      case 'carousel': return <Layers className=\"h-4 w-4\" />;
      case 'image': return <Image className=\"h-4 w-4\" />;
      default: return <Image className=\"h-4 w-4\" />;
    }
  };

  return (
    <div className=\"min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50\">
      {/* Header */}
      <header className=\"bg-white shadow-sm border-b\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4\">
          <div className=\"flex items-center justify-between\">
            <div className=\"flex items-center space-x-3\">
              <div className=\"bg-purple-600 p-2 rounded-lg\">
                <Target className=\"h-6 w-6 text-white\" />
              </div>
              <div>
                <h1 className=\"text-xl font-bold text-gray-900\">Social Media Ad Spy</h1>
                <p className=\"text-sm text-gray-500\">by CommerceInk</p>
              </div>
            </div>
            <div className=\"text-sm text-gray-600\">
              Facebook & Instagram Intelligence
            </div>
          </div>
        </div>
      </header>

      <main className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8\">
        {!result ? (
          /* Landing Section */
          <div className=\"text-center mb-12\">
            <div className=\"mb-8\">
              <h2 className=\"text-4xl font-bold text-gray-900 mb-4\">
                See Every Ad Your Competitors Are Running
              </h2>
              <p className=\"text-xl text-gray-600 max-w-3xl mx-auto\">
                Get instant access to competitor Facebook & Instagram ads. 
                Discover their creative strategies, estimated spend, and winning campaigns in real-time.
              </p>
            </div>

            {/* Brand Input */}
            <div className=\"max-w-2xl mx-auto mb-8\">
              <div className=\"flex gap-4\">
                <div className=\"flex-1 relative\">
                  <Search className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5\" />
                  <input
                    type=\"text\"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder=\"Enter competitor brand name (e.g., Nike, Gymshark, Adidas)\"
                    className=\"w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent\"
                    disabled={loading}
                    onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                  />
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className=\"bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2\"
                >
                  {loading ? (
                    <>
                      <div className=\"animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full\"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Eye className=\"h-5 w-5\" />
                      Spy on Ads
                    </>
                  )}
                </button>
              </div>
              {error && (
                <p className=\"text-red-600 mt-3 text-sm\">{error}</p>
              )}
            </div>

            {/* Features */}
            <div className=\"grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto\">
              <div className=\"text-center\">
                <div className=\"bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4\">
                  <Video className=\"h-6 w-6 text-purple-600\" />
                </div>
                <h3 className=\"font-semibold text-gray-900 mb-2\">Creative Intelligence</h3>
                <p className=\"text-gray-600 text-sm\">Discover video, image, and carousel ads with performance estimates</p>
              </div>
              <div className=\"text-center\">
                <div className=\"bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4\">
                  <DollarSign className=\"h-6 w-6 text-green-600\" />
                </div>
                <h3 className=\"font-semibold text-gray-900 mb-2\">Spend Analysis</h3>
                <p className=\"text-gray-600 text-sm\">Estimate competitor ad spend and budget allocation</p>
              </div>
              <div className=\"text-center\">
                <div className=\"bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4\">
                  <TrendingUp className=\"h-6 w-6 text-blue-600\" />
                </div>
                <h3 className=\"font-semibold text-gray-900 mb-2\">Performance Insights</h3>
                <p className=\"text-gray-600 text-sm\">See which creative types and messages are working best</p>
              </div>
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className=\"space-y-8\">
            {/* Header Results */}
            <div className=\"bg-white rounded-xl shadow-lg p-8\">
              <div className=\"flex items-center justify-between mb-6\">
                <div>
                  <h2 className=\"text-2xl font-bold text-gray-900\">{result.brandName} Ad Intelligence</h2>
                  <p className=\"text-gray-500\">{result.totalAds} active ads found</p>
                </div>
                <button
                  onClick={() => setResult(null)}
                  className=\"bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium\"
                >
                  Analyze Another Brand
                </button>
              </div>

              {/* Competitor Score & Stats */}
              <div className=\"grid grid-cols-1 md:grid-cols-4 gap-6 mb-8\">
                <div className=\"text-center\">
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBg(result.competitorScore)} mb-2`}>
                    <div className=\"text-center\">
                      <div className={`text-2xl font-bold ${getScoreColor(result.competitorScore)}`}>
                        {result.competitorScore}
                      </div>
                      <div className=\"text-xs text-gray-600\">Score</div>
                    </div>
                  </div>
                  <h3 className=\"font-semibold text-gray-900\">Ad Strength</h3>
                </div>
                <div className=\"text-center\">
                  <div className=\"text-2xl font-bold text-purple-600 mb-2\">{result.totalAds}</div>
                  <h3 className=\"font-semibold text-gray-900\">Active Ads</h3>
                </div>
                <div className=\"text-center\">
                  <div className=\"text-2xl font-bold text-green-600 mb-2\">{result.estimatedSpend.daily}</div>
                  <h3 className=\"font-semibold text-gray-900\">Daily Spend</h3>
                </div>
                <div className=\"text-center\">
                  <div className=\"text-2xl font-bold text-blue-600 mb-2\">{result.estimatedSpend.monthly}</div>
                  <h3 className=\"font-semibold text-gray-900\">Monthly Spend</h3>
                </div>
              </div>

              {/* Ad Type Breakdown */}
              <div className=\"bg-gray-50 rounded-lg p-6\">
                <h4 className=\"font-semibold text-gray-900 mb-4\">Creative Breakdown</h4>
                <div className=\"grid grid-cols-3 gap-4\">
                  <div className=\"text-center\">
                    <div className=\"flex items-center justify-center mb-2\">
                      <Video className=\"h-5 w-5 text-red-600 mr-2\" />
                      <span className=\"font-semibold\">{result.adBreakdown.video}</span>
                    </div>
                    <p className=\"text-sm text-gray-600\">Video Ads</p>
                  </div>
                  <div className=\"text-center\">
                    <div className=\"flex items-center justify-center mb-2\">
                      <Image className=\"h-5 w-5 text-blue-600 mr-2\" />
                      <span className=\"font-semibold\">{result.adBreakdown.image}</span>
                    </div>
                    <p className=\"text-sm text-gray-600\">Image Ads</p>
                  </div>
                  <div className=\"text-center\">
                    <div className=\"flex items-center justify-center mb-2\">
                      <Layers className=\"h-5 w-5 text-green-600 mr-2\" />
                      <span className=\"font-semibold\">{result.adBreakdown.carousel}</span>
                    </div>
                    <p className=\"text-sm text-gray-600\">Carousel Ads</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Performing Ads */}
            <div className=\"bg-white rounded-xl shadow-lg p-6\">
              <h3 className=\"text-xl font-semibold text-gray-900 mb-6\">Top Performing Ads</h3>
              <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\">
                {result.topPerformingAds.map((ad) => (
                  <div key={ad.id} className=\"border rounded-lg p-4 hover:shadow-md transition-shadow\">
                    <div className=\"relative mb-4\">
                      <img 
                        src={ad.creative} 
                        alt={ad.headline}
                        className=\"w-full h-40 object-cover rounded-md\"
                      />
                      <div className=\"absolute top-2 right-2 flex gap-1\">
                        <span className=\"bg-white rounded px-2 py-1 text-xs font-medium flex items-center gap-1\">
                          {getAdTypeIcon(ad.type)}
                          {ad.type}
                        </span>
                      </div>
                      <div className=\"absolute bottom-2 left-2\">
                        <span className=\"bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded\">
                          {getPlatformIcon(ad.platform)} {ad.platform}
                        </span>
                      </div>
                    </div>
                    
                    <h4 className=\"font-semibold text-gray-900 mb-2 line-clamp-2\">{ad.headline}</h4>
                    <p className=\"text-sm text-gray-600 mb-3 line-clamp-3\">{ad.bodyText}</p>
                    
                    <div className=\"flex items-center justify-between mb-3\">
                      <span className=\"bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium\">
                        {ad.callToAction}
                      </span>
                      <span className={`text-sm font-semibold ${getScoreColor(ad.performanceScore)}`}>
                        {ad.performanceScore}/100
                      </span>
                    </div>
                    
                    <div className=\"grid grid-cols-2 gap-4 text-sm text-gray-600\">
                      <div className=\"flex items-center gap-1\">
                        <Eye className=\"h-4 w-4\" />
                        {ad.estimatedReach}
                      </div>
                      <div className=\"flex items-center gap-1\">
                        <Calendar className=\"h-4 w-4\" />
                        {ad.runningDays} days
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights and Opportunities */}
            <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-8\">
              {/* Key Insights */}
              <div className=\"bg-white rounded-xl shadow-lg p-6\">
                <h3 className=\"text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2\">
                  <CheckCircle className=\"h-5 w-5 text-green-600\" />
                  What's Working
                </h3>
                <div className=\"space-y-3\">
                  {result.insights.map((insight, index) => (
                    <div key={index} className=\"flex items-start gap-3 p-3 bg-green-50 rounded-lg\">
                      <CheckCircle className=\"h-5 w-5 text-green-600 mt-0.5 flex-shrink-0\" />
                      <p className=\"text-sm text-gray-700\">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opportunities */}
              <div className=\"bg-white rounded-xl shadow-lg p-6\">
                <h3 className=\"text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2\">
                  <AlertCircle className=\"h-5 w-5 text-orange-600\" />
                  Opportunities to Exploit
                </h3>
                <div className=\"space-y-3\">
                  {result.opportunities.map((opportunity, index) => (
                    <div key={index} className=\"flex items-start gap-3 p-3 bg-orange-50 rounded-lg\">
                      <AlertCircle className=\"h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0\" />
                      <p className=\"text-sm text-gray-700\">{opportunity}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className=\"bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-8 text-center text-white\">
              <h3 className=\"text-2xl font-bold mb-4\">Ready to Beat Your Competition?</h3>
              <p className=\"text-lg mb-6 opacity-90\">
                Get professional help from CommerceInk to create winning ad campaigns based on these insights.
              </p>
              <div className=\"flex flex-col sm:flex-row gap-4 justify-center\">
                <button className=\"bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors\">
                  Schedule Free Ad Strategy Session
                </button>
                <button className=\"border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors\">
                  Learn More About CommerceInk
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className=\"bg-gray-900 text-white py-12 mt-16\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center\">
          <div className=\"flex items-center justify-center space-x-3 mb-4\">
            <div className=\"bg-purple-600 p-2 rounded-lg\">
              <Target className=\"h-6 w-6 text-white\" />
            </div>
            <span className=\"text-xl font-bold\">Social Media Ad Spy</span>
          </div>
          <p className=\"text-gray-400 mb-4\">
            Professional Facebook & Instagram ad intelligence by CommerceInk.com
          </p>
          <p className=\"text-sm text-gray-500\">
            © 2024 CommerceInk. All rights reserved. Built with Next.js and MCPs.
          </p>
        </div>
      </footer>
    </div>
  );
}