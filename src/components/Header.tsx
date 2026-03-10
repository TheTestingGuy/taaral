import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // On déclenche l'animation un peu plus tôt (50px au lieu de 80px) pour plus de fluidité
      setIsScrolled(window.scrollY > 50);
    };

    // Le paramètre passive: true aide le navigateur à fluidifier le scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      id="main-header"
      className={`w-full px-6 fixed top-0 left-0 z-50 transition-all duration-[800ms] ease-in-out text-white ${isScrolled
        ? 'py-4 bg-[#351419]/95 backdrop-blur-md shadow-lg'
        : 'py-8 md:py-12 bg-transparent'
        }`}
    >
      <div className="flex justify-between items-start w-full max-w-[1920px] mx-auto">

        {/* Colonne Gauche */}
        <div className="w-1/3 pt-2 md:pt-4">
          <a href="/projects" className="text-[10px] md:text-xs tracking-widest uppercase hover:opacity-70 transition-opacity font-medium">Projects</a>
        </div>

        {/* Colonne Centre (Le Logo n'est plus en absolute) */}
        <div className="w-1/3 text-center flex justify-center">
          <a href="/" className="group flex flex-col items-center">
            <h1
              className={`font-logo text-accent leading-none tracking-tight group-hover:opacity-80 transition-all duration-[800ms] ease-in-out ${isScrolled
                  ? 'text-3xl md:text-5xl'
                  : 'text-6xl md:text-8xl lg:text-[9rem]'
                }`}
            >
              Taaral
            </h1>

            <span
              className={`font-display italic font-light transition-all duration-[800ms] ease-in-out overflow-hidden ${isScrolled
                  ? 'opacity-0 h-0 text-[0px] mt-0' // Il disparaît en douceur et se replie
                  : 'opacity-100 h-[1em] text-3xl md:text-5xl lg:text-7xl mt-2' // Il est visible
                }`}
            >
              intérieur
            </span>
          </a>
        </div>

        {/* Colonne Droite */}
        <div className="w-1/3 text-right flex gap-4 md:gap-8 justify-end pt-2 md:pt-4">
          <a href="/#about" className="text-[10px] md:text-xs tracking-widest uppercase hover:opacity-70 transition-opacity font-medium">About</a>
          <a href="/#contact" className="text-[10px] md:text-xs tracking-widest uppercase hover:opacity-70 transition-opacity font-medium">Contact</a>
        </div>

      </div>
    </header>
  );
}