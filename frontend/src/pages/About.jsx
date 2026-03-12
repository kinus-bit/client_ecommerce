// pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Award, Globe, Heart, Target, Coffee, Rocket, ChevronRight } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Customers', color: 'blue' },
    { icon: Award, value: '10+', label: 'Years Experience', color: 'amber' },
    { icon: Globe, value: '30+', label: 'Countries Served', color: 'emerald' },
    { icon: Heart, value: '100%', label: 'Satisfaction Rate', color: 'rose' },
  ];

  const team = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'Started ShopEase from his garage in 2020. Believes online shopping should feel personal.',
      quote: "We're not just selling products, we're building relationships."
    },
    {
      name: 'Jane Smith',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1494790108777-583fd5c3d601?w=400',
      bio: '15 years in supply chain. Ensures your packages arrive faster than expected.',
      quote: "Every order is a promise we make to our customers."
    },
    {
      name: 'Mike Johnson',
      role: 'Product Manager',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      bio: 'Tech enthusiast who tests every product before it hits our catalog.',
      quote: "If I wouldn't buy it myself, it doesn't go on the site."
    },
    {
      name: 'Sarah Chen',
      role: 'Customer Experience',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      bio: 'Former hospitality manager bringing warmth to customer service.',
      quote: "I treat every customer like they're sitting across from me."
    }
  ];

  const values = [
    { 
      icon: Target, 
      title: 'Keep It Real', 
      description: 'No stock photos, no misleading descriptions. What you see is what you get.',
    },
    { 
      icon: Rocket, 
      title: 'Move Fast', 
      description: 'From order to delivery, we respect your time.',
    },
    { 
      icon: Heart, 
      title: 'Care Deeply', 
      description: 'Every customer interaction matters, big or small.',
    },
    { 
      icon: Coffee, 
      title: 'Stay Humble', 
      description: 'We learn from our mistakes and celebrate together.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      {/* Simple Hero Section - Clean and Honest */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-3xl"
          >
            <span className="text-amber-600 font-medium text-sm tracking-wide uppercase mb-3 block">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              We're just regular people trying to make online shopping less annoying
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              ShopEase started in 2020 because we were tired of complicated checkout processes, 
              hidden fees, and products that looked nothing like their photos. So we built 
              something better.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Simple Numbers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const colorClasses = {
                blue: 'text-blue-600 bg-blue-50',
                amber: 'text-amber-600 bg-amber-50',
                emerald: 'text-emerald-600 bg-emerald-50',
                rose: 'text-rose-600 bg-rose-50'
              };
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`inline-flex p-3 rounded-xl ${colorClasses[stat.color]} mb-3`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section - Real Talk */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                The honest truth about how we started
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  It was 2020, and our founder John was trying to buy a simple birthday gift 
                  for his sister. Three hours later, after dealing with five different websites, 
                  confusing shipping calculators, and a checkout process that asked for his 
                  mother's maiden name, he gave up.
                </p>
                <p>
                  That's when it clicked. Shopping online shouldn't feel like filing taxes. 
                  So John gathered a small team of friends who felt the same way, and we built 
                  ShopEase in a tiny San Francisco apartment.
                </p>
                <p className="font-medium text-gray-900">
                  Four years later, we're still guided by that same simple idea: make it easy, 
                  keep it real, and treat people right.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                  alt="Our team"
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <p className="text-white text-sm">
                    The original team in 2020. Still mostly the same, just more coffee now.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section - Simple Principles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              How we do things around here
            </h2>
            <p className="text-gray-600">
              No corporate jargon. Just four simple principles we actually follow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-sm">
                  <value.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Real People */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              The humans behind the screens
            </h2>
            <p className="text-gray-600">
              We're the ones packing your orders, answering your emails, and staying up late 
              to fix things when they break.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sm text-amber-600 mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-3">{member.bio}</p>
                  <p className="text-sm text-gray-500 italic border-t pt-3 mt-2">
                    "{member.quote}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Simple Invitation */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Want to see what we're about?
            </h2>
            <p className="text-gray-600 mb-6">
              No pressure. Just good products and real people.
            </p>
            <Link to="/products">
              <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
                Browse our products
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;