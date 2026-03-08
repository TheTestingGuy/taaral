import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    // 🪄 C'est ici que la magie opère
    kind: process.env.NODE_ENV === 'development' ? 'local' : 'cloud',
  },
  cloud: {
    // On remplira ça juste après !
    project: 'ton-compte/ton-projet', 
  },
  collections: {
    projects: collection({
      label: 'Projets',
      slugField: 'title',
      path: 'src/content/projects/*', // Le chemin vers nos dossiers de projets
      format: { contentField: 'content' }, // Indique qu'on utilise du Markdown
      schema: {
        title: fields.slug({ name: { label: 'Titre du projet' } }),
        location: fields.text({ label: 'Localisation (ex: Paris, France)' }),
        image: fields.image({
          label: 'Image principale',
          // 1. On sauvegarde physiquement l'image dans le dossier assets d'Astro
          directory: 'src/assets/images/projects', 
          // 2. On écrit un chemin relatif dans le Markdown pour qu'Astro la trouve
          publicPath: '../../assets/images/projects/', 
        }),
        order: fields.integer({ 
          label: 'Ordre d\'affichage', 
          defaultValue: 1,
          description: '1 sera affiché en premier, 2 en deuxième, etc.'
        }),
        content: fields.markdoc({ 
          label: 'Description du projet',
          description: 'Écris le texte qui apparaîtra sur la page de détail du projet.'
        }),
      },
    }),
  },
});