import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dna, 
  Upload, 
  Shield, 
  Anchor, 
  Github, 
  Mail, 
  ExternalLink, 
  ArrowRight,
  Database,
  Globe,
  Lock,
  CheckCircle
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLaunchApp = () => {
    navigate('/app');
  };

  const handleStartUploading = () => {
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-4 relative">
            {/* Centered Logo */}
            <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Dna className="h-8 w-8 text-white" />
                </div>
                <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    PBR
                </h1>
                <p className="text-sm text-gray-600">Polymerase Blockchain Reaction</p>
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Dna className="h-8 w-8 text-white" />
                </div>
            </div>
            
            {/* Navigation moved to absolute right */}
            <nav className="hidden md:flex space-x-8 absolute right-0">
                <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">How It Works</a>
                <a href="#technologies" className="text-gray-700 hover:text-blue-600 transition-colors">Technologies</a>
                <a href="#mission" className="text-gray-700 hover:text-blue-600 transition-colors">Mission</a>
                <button 
                onClick={handleLaunchApp}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
                >
                Launch App
                </button>
            </nav>
            </div>
        </div>
      </header>

      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
              Verifiable
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                Genetic Claims
              </span>
              <span className="text-4xl lg:text-5xl">on Blockchain</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Revolutionizing scientific research with decentralized, interoperable genetic data structures. 
              Upload, verify, and anchor your genetic claims with ontological precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={handleStartUploading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
              >
                Start Uploading Claims
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-all flex items-center gap-2">
                View Documentation
                <ExternalLink className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute top-10 left-10 opacity-10">
          <Dna className="h-24 w-24 text-blue-600 animate-spin" style={{animationDuration: '20s'}} />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10">
          <Dna className="h-32 w-32 text-indigo-600 animate-spin" style={{animationDuration: '25s', animationDirection: 'reverse'}} />
        </div>
      </section>

      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to transform your genetic research into verifiable, interoperable blockchain assets
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl mb-6 mx-auto w-fit group-hover:shadow-xl transition-all">
                <Upload className="h-16 w-16 text-blue-600 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Upload Claims</h3>
              <p className="text-gray-600 leading-relaxed">
                Submit structured genetic claims as JSON files with comprehensive metadata including scope, tags, 
                validation periods, and connections to gene ontologies and scientific frameworks.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-6 rounded-2xl mb-6 mx-auto w-fit group-hover:shadow-xl transition-all">
                <Shield className="h-16 w-16 text-indigo-600 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Verify & Store</h3>
              <p className="text-gray-600 leading-relaxed">
                Your claims are validated for ontological structure compliance, securely stored on IPFS via Pinata, 
                ensuring immutable, decentralized access while maintaining privacy controls.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-2xl mb-6 mx-auto w-fit group-hover:shadow-xl transition-all">
                <Anchor className="h-16 w-16 text-purple-600 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Blockchain Anchor</h3>
              <p className="text-gray-600 leading-relaxed">
                Claims are registered on-chain via our GeneScope smart contract deployed on Sepolia, 
                creating an immutable, transparent record of your scientific contributions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="technologies" className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Built With Industry Leaders
            </h2>
            <p className="text-xl text-gray-600">
              Leveraging cutting-edge technologies and platforms to ensure reliability and innovation
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { name: 'React + TypeScript', desc: 'Modern Frontend' },
              { name: 'Vite', desc: 'Fast Build Tool' },
              { name: 'Solidity + Hardhat', desc: 'Smart Contracts' },
              { name: 'IPFS via Pinata', desc: 'Decentralized Storage' },
              { name: 'Ethereum Sepolia', desc: 'Testnet Deployment' },
              { name: 'Gene Ontologies', desc: 'Scientific Standards' },
              { name: 'ETHGlobal Prague', desc: 'Hackathon Winner' },
              { name: 'Web3 Infrastructure', desc: 'Blockchain Ready' }
            ].map((tech, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all text-center">
                <h4 className="font-bold text-gray-900 mb-2">{tech.name}</h4>
                <p className="text-sm text-gray-600">{tech.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all text-center">
              <Database className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ontological Structures</h3>
              <p className="text-gray-600">
                Built-in support for gene ontologies and scientific frameworks ensuring data interoperability and standardization.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all text-center">
              <Lock className="h-12 w-12 text-indigo-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy First</h3>
              <p className="text-gray-600">
                Advanced privacy controls with decentralized storage, giving researchers full control over their sensitive genetic data.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all text-center">
              <Globe className="h-12 w-12 text-purple-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Global Interoperability</h3>
              <p className="text-gray-600">
                Cross-platform compatibility enabling seamless integration with existing research infrastructure and tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="mission" className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">Our Mission</h2>
          <div className="max-w-4xl mx-auto space-y-6 text-lg lg:text-xl leading-relaxed">
            <p>
              <strong>Democratizing genetic research</strong> through blockchain technology, ensuring that scientific discoveries 
              are transparent, verifiable, and accessible to the global research community.
            </p>
            <p>
              <strong>Establishing ontological standards</strong> for genetic data that promote interoperability between research 
              institutions, enabling unprecedented collaboration and knowledge sharing.
            </p>
            <p>
              <strong>Protecting researcher privacy</strong> while maintaining scientific integrity through decentralized storage 
              and cryptographic verification of genetic claims and discoveries.
            </p>
            <p>
              <strong>Building the future of DeSci</strong> where genetic research is permanently recorded, publicly verifiable, 
              and contributes to a shared, immutable scientific knowledge base.
            </p>
          </div>
          
          <div className="mt-12 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center gap-4">
              <CheckCircle className="h-8 w-8 text-green-300" />
              <span className="text-lg font-semibold">Built at ETHGlobal Prague 2024</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <Dna className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Polymerase Blockchain Reaction</h3>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Revolutionizing genetic research through blockchain technology, ontological structures, 
                and decentralized scientific collaboration.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/your-repo" className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="mailto:team@pbr-project.com" className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors">
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Smart Contract</a></li>
                <li><a href="#" className="hover:text-white transition-colors">IPFS Gateway</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Team & Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Meet the Team</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Research Papers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Join Community</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Polymerase Blockchain Reaction. Built with ❤️ at ETHGlobal Prague.</p>
            <p className="mt-2">Empowering the future of decentralized science.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;