import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, Search, Tag } from "lucide-react";
import { useCartStore } from "../../stores/cart.store";

const BottomNav = () => {
  const location = useLocation();
  const cartItems = useCartStore((state) => state.items);
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Shop", path: "/shop", icon: Search },
    { name: "Deals", path: "/deals", icon: Tag },
    { name: "Cart", path: "/cart", icon: ShoppingBag, badge: totalCartItems },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    // pb-[env(safe-area-inset-bottom)] for iOS devices with a notch to avoid content being hidden behind the home indicator
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#1a1a24]/95 backdrop-blur-xl border-t border-white/10 z-1000 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`relative flex flex-col items-center justify-center w-full h-full transition-all duration-300 ${
                active ? "text-orange-500" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <div className="relative">
                <Icon 
                  className={`w-6 h-6 transition-transform duration-300 ${active ? "scale-110 fill-orange-500/10" : ""}`} 
                />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {item.badge > 99 ? "99+" : item.badge}
                </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${active ? "text-orange-500" : ""}`}>
                {item.name}
              </span>
              
              {/* Active Indicator Dot */}
              {active && (
                <div
                  layoutId="bottomNavIndicator"
                  className="absolute top-0 w-8 h-0.5 bg-orange-500 rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;