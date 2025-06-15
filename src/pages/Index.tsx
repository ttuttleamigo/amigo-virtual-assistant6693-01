
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Grow faster and work smarter.
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Start simply with Starter Suite, the all-in-one CRM for small business. Then scale endlessly with autonomous AI agents, unified data, and CRM apps together on one integrated platform.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Try for free
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors">
              Watch demos
            </button>
          </div>
        </div>

        {/* Feature Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Create a limitless workforce.
          </h2>
          <h3 className="text-3xl font-bold mb-6 text-blue-600">
            With Agentforce.
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Create a digital labor force that works alongside your human workforce. AI agents work 24/7, taking action and providing support to employees and customers. Free your people to be more productive, so they can focus on more important stuff.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Explore Agentforce
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors">
              Calculate your ROI
            </button>
          </div>
        </div>

        {/* Trust Section */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-8 text-gray-800">
            Agentforce is trusted by:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500 text-sm font-medium">Logo {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-24">
          <h2 className="text-4xl font-bold text-gray-800">
            Start simply. Scale endlessly.
          </h2>
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;
