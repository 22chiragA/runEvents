import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import WarpSpeedBackground from '../components/layout/WarpSpeedBackground';
import { HeroScrollDemo } from '../components/ui/HeroScrollDemo';
import { ArrowRight, Trophy, Users, Calendar } from 'lucide-react';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[600px] flex items-center justify-center">
        <WarpSpeedBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl text-shadow-md">
              <span className="block">Find Your Next</span>
              <span className="block text-primary-400 mt-2">Running Challenge</span>
            </h1>
            <p className="mt-4 max-w-md mx-auto text-base text-gray-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl leading-relaxed">
              Discover local marathons, register for events, and manage your running journey all in one place. Join a community of passionate runners today.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              {!isAuthenticated && (
                <Link
                  to="/signup"
                  className="px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg transition-all shadow-md hover:shadow-lg"
                >
                  Sign Up Now
                </Link>
              )}
              <Link
                to="/dashboard"
                className="px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg transition-all shadow-sm"
              >
                View Events
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 📜 Scroll Showcase Section */}
      <div className="bg-gray-50 border-y border-gray-100">
        <HeroScrollDemo />
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-primary-100 p-3 rounded-full mb-4 text-primary-600">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Find Events</h3>
              <p className="text-gray-600">Browse a curated list of upcoming running events ranging from 5K to full marathons.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-primary-100 p-3 rounded-full mb-4 text-primary-600">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Track Registrations</h3>
              <p className="text-gray-600">Manage all your event registrations in one beautiful, easy-to-use dashboard.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-primary-100 p-3 rounded-full mb-4 text-primary-600">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Join the Community</h3>
              <p className="text-gray-600">See participant lists, connect with other runners, and share your passion.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
