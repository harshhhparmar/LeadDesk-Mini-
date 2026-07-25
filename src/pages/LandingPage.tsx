import { ArrowRight, CheckCircle2, TrendingUp, Users, Zap, Shield, Sparkles, BarChart3 } from 'lucide-react';
import { LeadForm } from '../components/LeadForm';
import { Link } from 'react-router';
import { motion } from 'motion/react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

import { Counter } from '../components/Counter';

export function LandingPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen relative z-10"
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <img src="/logo.svg" alt="LeadDesk Mini Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-105 transition-transform duration-300" />
            <span className="font-bold text-lg sm:text-xl tracking-tight text-gray-900 dark:text-white">LeadDesk Mini</span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-6">
            <Link 
              to="/login" 
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Log in
            </Link>
            <a 
              href="#contact" 
              className="text-xs sm:text-sm font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-95 whitespace-nowrap"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 w-full">
        <motion.div 
          className="flex-1 space-y-8 text-center lg:text-left z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50/50 dark:bg-indigo-500/10 border border-indigo-100/50 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-sm font-medium backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Introducing LeadDesk Mini</span>
          </motion.div>
          
          <motion.h1 variants={fadeIn} className="text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.1]">
            Close deals <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              faster than ever.
            </span>
          </motion.h1>
          
          <motion.p variants={fadeIn} className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
            A premium, lightning-fast CRM built for modern sales teams. Capture, organize, and convert leads with unparalleled efficiency.
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            <a 
              href="#contact" 
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gray-900/20 dark:shadow-white/10 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start your free trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">No credit card required.</p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="flex-1 w-full max-w-lg relative z-10 perspective-1000"
          initial={{ opacity: 0, rotateY: 15, rotateX: 10, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, rotateY: -5, rotateX: 5, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-[2.5rem] transform rotate-3 scale-105 -z-10 blur-xl"></div>
          <div className="glass rounded-[2rem] p-2 shadow-2xl border border-white/40 dark:border-white/10 transform transition-transform hover:scale-[1.02] duration-500">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=900" 
              alt="Dashboard Preview" 
              className="rounded-[1.5rem] border border-white/50 dark:border-gray-800/50 w-full object-cover aspect-[4/3] shadow-inner"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative z-10 border-y border-gray-200/50 dark:border-gray-800/50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <Counter value={99} suffix="%" label="Customer Satisfaction" />
            <Counter value={5} suffix="x" label="Faster Deal Closing" />
            <Counter value={24} suffix="/7" label="Premium Support" />
          </div>
        </div>
      </section>

      {/* Features Grid */}

      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Everything you need to scale</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light">Join thousands of high-performing teams using LeadDesk Mini to accelerate their sales cycle and close deals faster.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-indigo-500" />,
                title: "Lightning Fast",
                description: "Built on a modern serverless edge infrastructure ensuring instant page loads.",
                delay: 0.1
              },
              {
                icon: <Users className="w-6 h-6 text-purple-500" />,
                title: "Team Collaboration",
                description: "Share contexts, add notes, and collaborate effortlessly across your entire sales team.",
                delay: 0.2
              },
              {
                icon: <TrendingUp className="w-6 h-6 text-pink-500" />,
                title: "Actionable Insights",
                description: "Real-time analytics and predictive reporting to optimize your pipeline health.",
                delay: 0.3
              },
              {
                icon: <Shield className="w-6 h-6 text-emerald-500" />,
                title: "Enterprise Security",
                description: "Bank-grade encryption, granular roles, and strict compliance built-in by default.",
                delay: 0.4
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
                title: "Advanced Tracking",
                description: "Monitor every touchpoint from the first visit to the final closed-won deal.",
                delay: 0.5
              },
              {
                icon: <Sparkles className="w-6 h-6 text-amber-500" />,
                title: "AI-Powered",
                description: "Smart suggestions and automated data enrichment to save your reps hours every week.",
                delay: 0.6
              }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: feature.delay }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glass p-8 rounded-3xl group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100 dark:border-gray-700 relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 relative z-10">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light relative z-10">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row flex-wrap gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Ready to transform your sales?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-md font-light leading-relaxed">
              Get in touch with our product experts to learn how LeadDesk Mini can optimize your workflow.
            </p>
            
            <div className="space-y-6">
              {[
                "Personalized onboarding session",
                "Migration from your existing CRM",
                "24/7 dedicated support team",
                "Custom integrations available"
              ].map((benefit, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 w-full"
          >
            <div className="glass rounded-[2rem] p-8 lg:p-10 shadow-2xl border border-white/50 dark:border-white/10 relative overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"></div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 relative z-10">Request a Demo</h3>
              <div className="relative z-10">
                <LeadForm />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
