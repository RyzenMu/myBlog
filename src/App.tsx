import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://vxexigrndbgzgbnbvhtr.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4ZXhpZ3JuZGJnemdibmJ2aHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjE5NjksImV4cCI6MjA1OTQ5Nzk2OX0.hTWvkU7IRnkSG-kVJVnq6cdLK2Gn8w3nSj_IQXno-Qk'; // Replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);

// TypeScript interfaces
interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

type Screen = 'home' | 'login' | 'signup';

// Sample blog posts data
const samplePosts: BlogPost[] = [
  {
    id: 1,
    title: "Welcome to MyBlog",
    content: "This is the first post on our amazing blog platform. Here you can share your thoughts, ideas, and stories with the world. We're excited to have you as part of our community!",
    author: "Admin",
    date: "Aug 17, 2025"
  },
  {
    id: 2,
    title: "Android Development Tips",
    content: "Learn the best practices for Android development with Kotlin and Jetpack Compose. From UI design to state management, we cover everything you need to know.",
    author: "Tech Writer",
    date: "Aug 16, 2025"
  },
  {
    id: 3,
    title: "The Future of Mobile Apps",
    content: "Exploring the latest trends in mobile app development, including AI integration, cross-platform solutions, and emerging technologies that will shape the future.",
    author: "Innovation Team",
    date: "Aug 15, 2025"
  }
];

// Header Component
interface HeaderProps {
  onNavigate: (screen: Screen) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center px-2">
        <h1 className="text-2xl font-bold">MyBlog</h1>
        <nav className="flex space-x-4">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-gray-300 px-2 py-1 text-base transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('login')}
            className="hover:text-gray-300 px-2 py-1 text-base transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => onNavigate('signup')}
            className="hover:text-gray-300 px-2 py-1 text-base transition-colors"
          >
            Signup
          </button>
          <button
            onClick={() => {/* Handle logout */}}
            className="hover:text-gray-300 px-2 py-1 text-base transition-colors"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

// Blog Post Card Component
interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer p-5">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
      <p className="text-sm text-gray-600 mb-3 line-clamp-3">{post.content}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500 font-medium">By {post.author}</span>
        <span className="text-xs text-gray-500">{post.date}</span>
      </div>
    </div>
  );
};

// Blog Content Component
const BlogContent: React.FC = () => {
  return (
    <div className="flex-1 p-4 space-y-4">
      <h2 className="text-3xl font-bold mb-6">Latest Blog Posts</h2>
      <div className="space-y-4">
        {samplePosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

// Home Screen Component
interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={onNavigate} />
      <BlogContent />
    </div>
  );
};

// Login Screen Component
interface LoginScreenProps {
  onNavigate: (screen: Screen) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    console.log('Login Data:', {
      email,
      password
    });
    onNavigate('home');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={onNavigate} />
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center mb-8">Login to MyBlog</h2>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gray-800 text-white py-3 px-4 rounded-md hover:bg-gray-700 transition-colors font-medium"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

// Signup Screen Component
interface SignupScreenProps {
  onNavigate: (screen: Screen) => void;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ onNavigate }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignup = () => {
    console.log('Signup Data:', {
      name,
      email,
      password
    });
    onNavigate('home');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={onNavigate} />
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center mb-8">Join MyBlog</h2>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          {/* Success Message */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              placeholder="Enter your full name"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              placeholder="Enter your email"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              placeholder="Enter your password"
              disabled={isLoading}
            />
          </div>

          <button
            onClick={handleSignup}
            disabled={isLoading}
            className="w-full bg-gray-800 text-white py-3 px-4 rounded-md hover:bg-gray-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const BlogApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  switch (currentScreen) {
    case 'login':
      return <LoginScreen onNavigate={handleNavigate} />;
    case 'signup':
      return <SignupScreen onNavigate={handleNavigate} />;
    case 'home':
    default:
      return <HomeScreen onNavigate={handleNavigate} />;
  }
};

export default function App() {
  return <BlogApp />;
}