import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: process.env.NODE_ENV === 'development' ? 'local' : 'cloud',
  },
  cloud: {
    project: 'taaral/taaral',
  },

  collections: {
    projects: collection({
      label: 'Projets',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titre du projet' } }),
        location: fields.text({ label: 'Localisation (ex: Paris, France)' }),
        image: fields.image({
          label: 'Image principale',
          directory: 'src/assets/images/projects',
          publicPath: '../../assets/images/projects/',
        }),
        gallery: fields.array(
          fields.image({
            label: 'Photo additionnelle',
            directory: 'src/assets/images/projects',
            publicPath: '../../assets/images/projects/',
          }),
          {
            label: 'Galerie de photos du projet',
            itemLabel: props => props.value ? 'Image ajoutée' : 'Nouvelle image',
          }
        ),
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

  singletons: {
    hero: singleton({
      label: 'Section Hero (Accueil)',
      path: 'src/content/hero/data',
      format: { data: 'json' },
      schema: {
        headline: fields.text({
          label: 'Texte Principal',
          multiline: true,
          defaultValue: 'We are on a mission to challenge the status quo... to an interior experience that speaks to the soul.'
        }),
        backgroundImage: fields.image({
          label: 'Image de Fond',
          directory: 'src/assets/images/hero',
          publicPath: '../../assets/images/hero/',
        }),
        backgroundVideo: fields.file({
          label: 'Vidéo de Fond (Optionnelle - Remplace l\'image)',
          description: 'Uploadez un fichier .mp4. S\'il est présent, il remplacera l\'image de fond.',
          // On le met dans public/ car Astro n'a pas besoin de le compiler
          directory: 'public/videos/hero',
          publicPath: '/videos/hero/',
        }),
      },
    }),

    "projects-page": singleton({
      label: 'Page principal des projets',
      path: 'src/content/projects-page/data',
      format: { data: 'json' },
      schema: {
        headline: fields.text({
          label: 'Texte Principal',
          multiline: true,
          defaultValue: 'We are on a mission to challenge the status quo... to an interior experience that speaks to the soul.'
        }),
        backgroundImage: fields.image({
          label: 'Image de Fond',
          directory: 'src/assets/images/projects-page',
          publicPath: '../../assets/images/projects-page/',
        }),
        backgroundVideo: fields.file({
          label: 'Vidéo de Fond (Optionnelle - Remplace l\'image)',
          description: 'Uploadez un fichier .mp4. S\'il est présent, il remplacera l\'image de fond.',
          // On le met dans public/ car Astro n'a pas besoin de le compiler
          directory: 'public/videos/projects-page',
          publicPath: '/videos/projects-page/',
        }),
      },
    }),


    about: singleton({
      label: 'Section À Propos',
      path: 'src/content/about/data',
      format: { contentField: 'content' },
      schema: {
        // La colonne de gauche
        image: fields.image({
          label: 'Photo Portrait / Agence',
          directory: 'src/assets/images/about',
          publicPath: '../../assets/images/about/',
        }),
        caption: fields.text({ label: 'Légende photo', defaultValue: 'Est. 2014 — Paris, France' }),

        // La colonne de droite
        surtitle: fields.text({ label: 'Surtitre', defaultValue: 'About Us' }),
        headline: fields.text({
          label: 'Grand Titre',
          multiline: true,
          description: 'Fais un saut de ligne (Entrée) pour créer le retour à la ligne du titre.'
        }),
        content: fields.markdoc({
          label: 'Texte de présentation',
          description: 'Rédige les paragraphes de présentation ici.',
        }),

        // Le bloc signature en bas
        architectRole: fields.text({ label: 'Rôle (ex: Lead Architect)', defaultValue: 'Lead Architect' }),
        architectName: fields.text({ label: 'Nom de l\'architecte', defaultValue: 'Isabella Rossi' }),
      },
    }),

    // LA SECTION FORMULES / SERVICES
    formulas: singleton({
      label: 'Section Formules (Accueil)',
      path: 'src/content/formulas/data',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Titre de la section', defaultValue: 'Nos Prestations' }),
        subtitle: fields.text({ label: 'Sous-titre', defaultValue: 'Décoration & architecture d\'intérieur' }),

        // NOUVEAU : Un tableau de Catégories (Particuliers, Professionnels)
        categories: fields.array(
          fields.object({
            name: fields.text({ label: 'Nom de la cible (ex: Particuliers, Professionnels)' }),

            // Les formules de cette catégorie
            packages: fields.array(
              fields.object({
                name: fields.text({ label: 'Nom de la formule' }),
                price: fields.text({ label: 'Prix (ex: À partir de 380€)' }),
                features: fields.array(
                  fields.text({ label: 'Inclusion' }),
                  { label: 'Ce qui est inclus', itemLabel: props => props.value || 'Nouvel élément' }
                ),
              }),
              { label: 'Les Formules', itemLabel: props => props.fields.name.value || 'Nouvelle formule' }
            ),

            // Les options supplémentaires
            optionsTitle: fields.text({ label: 'Titre des options', defaultValue: 'Options supplémentaires' }),
            options: fields.array(
              fields.object({
                name: fields.text({ label: 'Nom de l\'option' }),
                price: fields.text({ label: 'Prix (ex: 450€)' }),
              }),
              { label: 'Options à la carte', itemLabel: props => props.fields.name.value || 'Nouvelle option' }
            ),
          }),
          { label: 'Catégories de clients', itemLabel: props => props.fields.name.value || 'Nouvelle catégorie' }
        ),

        // Mention légale pour les prix
        disclaimer: fields.text({
          label: 'Mention légale (bas de page)',
          multiline: true,
          defaultValue: "Tous les tarifs sont donnés à titre indicatif. Ils peuvent varier selon la surface (m2) du projet..."
        }),
      },
    }),

    legal: singleton({
      label: 'Mentions Légales',
      path: 'src/content/legal/data',
      format: { contentField: 'content' }, // Enregistre en .md
      schema: {
        surtitle: fields.text({ label: 'Surtitre', defaultValue: 'Informations légales' }),
        title: fields.text({ label: 'Titre Principal', defaultValue: 'Mentions Légales' }),
        titleAccent: fields.text({ label: 'Titre Accent (Italique)', defaultValue: '& Confidentialité' }),

        content: fields.markdoc({
          label: 'Contenu des sections',
          description: 'Utilisez l\'option Titre 2 (H2) pour créer vos parties (ex: "1. Éditeur du site").',
        }),
      },
    }),

    // LE FOOTER
    footer: singleton({
      label: 'Pied de page (Footer)',
      path: 'src/content/footer/data',
      format: { data: 'json' }, // JSON car on n'a pas besoin de Markdown ici
      schema: {
        description: fields.text({
          label: 'Petite phrase de description',
          multiline: true,
          defaultValue: 'Designing spaces that breathe culture, sophistication, and timeless elegance.'
        }),
        socials: fields.array(
          fields.object({
            label: fields.text({ label: 'Nom du réseau (ex: Instagram)' }),
            url: fields.text({ label: 'Lien (ex: https://instagram.com/...)' })
          }),
          {
            label: 'Réseaux Sociaux',
            itemLabel: props => props.fields.label.value || 'Nouveau lien',
          }
        ),
      },
    }),
  },
});