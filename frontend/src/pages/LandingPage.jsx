import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SparklesIcon, LightningBoltIcon, ChatAlt2Icon, CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/outline';

export default function LandingPage() {
  const features = [
    {
      icon: <ChatAlt2Icon className="w-8 h-8 text-indigo-500" />,      title: 'Natural Language',
      description: 'Add tasks using simple, everyday language. Our AI understands what you mean.'
    },
    {
      icon: <LightningBoltIcon className="w-8 h-8 text-indigo-500" />,
      title: 'Lightning Fast',
      description: 'Create and manage tasks in seconds with our intuitive interface.'
    },
    {
      icon: <CheckCircleIcon className="w-8 h-8 text-indigo-500" />,
      title: 'Smart Organization',
      description: 'Automatically categorize and prioritize your tasks for maximum productivity.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <SparklesIcon className="w-8 h-8 text-indigo-400" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              TaskFlow AI
            </span>
          </div>
          <Link 
            to="/home" 
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white font-medium hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
          >
            Launch App <ArrowRightIcon className="w-4 h-4 inline ml-1" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 py-16 md:py-24 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-6 px-4 py-2 bg-indigo-900/30 backdrop-blur-sm rounded-full border border-indigo-500/30 text-indigo-300 text-sm"
          >
            AI-Powered Task Management
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            The Smarter Way to
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              {' '}Manage Tasks
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Transform your productivity with AI that understands your tasks in natural language.
            No more complex forms, just type what you need to do.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
            <Link
              to="/home"
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white font-medium text-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
            >
              Get Started for Free
            </Link>
            <button className="px-8 py-4 border border-indigo-500/30 rounded-full font-medium text-lg hover:bg-indigo-500/10 transition-colors duration-300">
              Watch Demo
            </button>
          </div>
          
          {/* AI Prompt Example */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 max-w-2xl mx-auto text-left"
          >
            <div className="flex items-center mb-4">
              <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
              <div className="text-sm text-gray-400">AI is ready</div>
            </div>
            <p className="text-lg text-gray-200">
              Try saying: <span className="text-indigo-300">"Schedule a meeting with John tomorrow at 2pm about the project"</span>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-gray-900/50 to-gray-900 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            Supercharge Your Productivity
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-indigo-500/30 transition-colors"
              >
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your workflow?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of professionals who are already boosting their productivity with TaskFlow AI.
          </p>
          <Link
            to="/home"
            className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white font-medium text-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
          >
            Get Started for Free
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} TaskFlow AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
