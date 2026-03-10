import { useEffect } from 'react';

export default function ScrollColorObserver() {
  useEffect(() => {
    // 1. On crée une fonction qui initialise notre observateur
    let currentBgClass = '';

    const initObserver = () => {
      const sections = document.querySelectorAll('[data-bg]');
      const body = document.body;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const newBgClass = entry.target.getAttribute('data-bg');
            
            if (newBgClass && newBgClass !== currentBgClass) {
              // 1. On retire l'ancienne couleur (si elle existe)
              if (currentBgClass) {
                body.classList.remove(...currentBgClass.split(' '));
              }
              // 2. On ajoute la nouvelle couleur Tailwind
              body.classList.add(...newBgClass.split(' '));
              
              // 3. On met à jour la couleur actuelle en mémoire
              currentBgClass = newBgClass;
            }
          }
        });
      }, {
        rootMargin: "-40% 0px -40% 0px"
      });

      sections.forEach(section => observer.observe(section));
      return observer;
    };

    let currentObserver = initObserver();

    // 2. Écouteur spécial pour les View Transitions d'Astro
    // (Pour relancer le script si on change de page sans recharger le navigateur)
    const handlePageLoad = () => {
      currentObserver.disconnect();
      currentObserver = initObserver();
    };
    document.addEventListener('astro:page-load', handlePageLoad);

    // 3. Cleanup : Ce que React fait quand le composant est détruit
    return () => {
      currentObserver.disconnect();
      document.removeEventListener('astro:page-load', handlePageLoad);
    };
  }, []); // Le tableau vide [] signifie "Exécuter une seule fois au montage"

  // Ce composant est purement logique, il ne rend rien à l'écran
  return null; 
}