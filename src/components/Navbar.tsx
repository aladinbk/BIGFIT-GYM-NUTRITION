import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogIn, ShoppingCart, LogOut } from 'lucide-react';
import { Logo } from './Logo';
import { User as FirebaseUser, signOut } from 'firebase/auth';
import { auth } from '../firebase';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  user: FirebaseUser | null;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, user }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navLinks = [
    { name: 'Programmes', href: '#programmes' },
    { name: 'Nutrition', href: '#nutrition' },
    { name: 'Tarifs', href: '#tarifs' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-secondary/80 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button className="p-2 text-white/70 hover:text-primary transition-colors relative group">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-accent text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-white/80">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <User className="w-4 h-4" />
                </div>
                <span className="max-w-[100px] truncate">{user.displayName || user.email}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-white/40 hover:text-red-500 transition-colors"
                title="Déconnexion"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={() => onOpenAuth('login')}
                className="btn-outline !px-4 !py-2 text-sm"
              >
                <LogIn className="w-4 h-4" />
                Connexion
              </button>
              <button 
                onClick={() => onOpenAuth('signup')}
                className="btn-primary !px-6 !py-2 text-sm"
              >
                S'inscrire
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-secondary border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-4 text-base font-medium text-white/70 hover:text-primary hover:bg-white/5 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-xl">
                      <User className="w-5 h-5 text-primary" />
                      <span className="font-bold">{user.displayName || user.email}</span>
                    </div>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="btn-outline w-full flex items-center justify-center gap-2 text-red-500 border-red-500/20"
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </button>
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        onOpenAuth('login');
                        setIsMobileMenuOpen(false);
                      }}
                      className="btn-outline w-full"
                    >
                      Connexion
                    </button>
                    <button 
                      onClick={() => {
                        onOpenAuth('signup');
                        setIsMobileMenuOpen(false);
                      }}
                      className="btn-primary w-full"
                    >
                      S'inscrire
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

