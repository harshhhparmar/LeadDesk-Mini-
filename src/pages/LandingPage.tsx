import { ArrowRight, CheckCircle2, TrendingUp, Users, Zap } from 'lucide-react';
import { LeadForm } from '../components/LeadForm';
import { Link } from 'react-router';

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl leading-none">L</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">LeadDesk Mini</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/admin" 
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Admin Login
            </Link>
            <a 
              href="#contact" 
              className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
            New CRM Features Released
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
            Turn more <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">visitors</span> into paying customers.
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            LeadDesk Mini gives your sales team the tools they need to track, manage, and close deals faster than ever before.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <a 
              href="#contact" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-sm text-gray-500 font-medium">No credit card required.</p>
          </div>
        </div>
        <div className="flex-1 w-full max-w-lg relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-purple-50 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000&h=800" 
            alt="Dashboard Preview" 
            className="rounded-3xl shadow-2xl border border-white/50 w-full object-cover aspect-[4/3]"
          />
        </div>
      </section>

      {/* Features / Why Choose Us */}
      <section className="bg-gray-50 py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to scale</h2>
            <p className="text-lg text-gray-600">Why thousands of growing businesses choose LeadDesk Mini to power their sales process.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-yellow-500" />,
                title: "Lightning Fast",
                description: "Built on modern infrastructure to ensure your team never waits for a page to load."
              },
              {
                icon: <Users className="w-6 h-6 text-blue-500" />,
                title: "Team Collaboration",
                description: "Share leads, add notes, and work together to close deals without leaving the platform."
              },
              {
                icon: <TrendingUp className="w-6 h-6 text-emerald-500" />,
                title: "Actionable Insights",
                description: "Real-time analytics and reporting to help you understand your pipeline health."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Ready to transform your sales?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              Get in touch with our team to learn how LeadDesk Mini can help you organize your leads and grow your business.
            </p>
            
            <div className="space-y-6">
              {[
                "Personalized onboarding session",
                "Migration from your existing CRM",
                "24/7 dedicated support team",
                "Custom integrations available"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Request a Demo</h3>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
