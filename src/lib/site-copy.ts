/**
 * French copy only — single source for visible strings and meta.
 */
export const siteCopy = {
  seo: {
    siteName: "Ethann Wantiez — Portfolio",
    appName: "Ethann Wantiez · Portfolio web",
    appShortName: "EW Portfolio",
    personName: "Ethann Wantiez",
    jobTitle: "Développeur web freelance & designer UI/UX",
    locale: "fr_FR",
    region: "FR",
  },
  meta: {
    title:
      "Ethann Wantiez | Développeur web freelance & UI/UX — sites performants",
    description:
      "Portfolio d’Ethann Wantiez : développement web (React, Next.js), design UI/UX, expériences créatives et optimisation Core Web Vitals. Basé en France, disponible en remote.",
    keywords: [
      "Ethann Wantiez",
      "développeur web freelance",
      "développeur Next.js",
      "UI/UX",
      "design d’interface",
      "site web performant",
      "Core Web Vitals",
      "développement front-end",
      "portfolio développeur",
    ] as const,
  },
  nav: {
    brand: "Portfolio",
    home: "Accueil",
    services: "Services",
    work: "Projets",
    contact: "Contact",
    ariaMain: "Navigation principale",
    ariaMobile: "Navigation mobile",
    ariaHome: "Aller à l’accueil",
    ariaOpenMenu: "Ouvrir le menu",
    ariaCloseMenu: "Fermer le menu",
  },
  hero: {
    badge: "Disponible pour de nouveaux projets",
    intro1: "Bonjour !",
    intro2: " Moi.. C'est Ethann",
    /** Sous le H1 : texte neutre + partie en vert (gradient-text) */
    roleLead: "Je suis",
    roleTitleHighlight: "Développeur web & IA freelance",
    subtitleBefore: "Je conçois ",
    subtitleHighlight: "des expériences qui convertissent",
    subtitleAfter:
      ". Du concept au code, chaque pixel est pensé pour servir votre objectif.",
    ctaWork: "Voir mes projets",
    ctaContact: "Me contacter",
    ariaWork: "Voir mes réalisations",
    ariaContact: "Prendre contact",
  },
  services: {
    label: "Ce que je fais",
    title: "Services & expertise",
    description:
      "Je combine sens du design et précision technique pour créer des expériences numériques mémorables.",
    web: {
      title: "Développement web",
      description:
        "Applications web performantes avec des frameworks modernes. Des SPA aux plateformes full stack, chaque ligne de code est optimisée pour la vitesse et l’évolutivité.",
    },
    ui: {
      title: "Design UI/UX",
      description:
        "Des interfaces intuitives et soignées. Des systèmes de design fondés sur la recherche utilisateur pour renforcer votre marque et satisfaire vos utilisateurs.",
    },
    creative: {
      title: "Développement créatif",
      description:
        "Expériences WebGL, animations immersives et récits interactifs qui repoussent les limites du possible sur le web.",
    },
    perf: {
      title: "Optimisation des performances",
      description:
        "Audits et refontes qui transforment les sites lents en expériences ultra-rapides. Maîtrise des Core Web Vitals.",
    },
  },
  work: {
    label: "Projets choisis",
    title: "Des projets qui parlent d’eux-mêmes",
    description:
      "Une sélection de réalisations où le design rencontre l’excellence technique.",
    cta: "Tous les projets",
    ariaCta: "Voir tous les projets",
    marquee: "Développement créatif",
    projects: {
      luminary: {
        title: "Luminary",
        category: "Application web",
        description:
          "Tableau de bord SaaS nouvelle génération avec analytique en temps réel et insights assistés par l’IA.",
      },
      vertex: {
        title: "Vertex",
        category: "Développement créatif",
        description:
          "Configurateur produit WebGL pour une marque automobile de luxe.",
      },
      nebula: {
        title: "Nebula",
        category: "E-commerce",
        description:
          "Plateforme e-commerce à fort taux de conversion, avec une UX portée par les micro-interactions.",
      },
      horizon: {
        title: "Horizon",
        category: "Site de marque",
        description:
          "Expérience de marque primée avec narration au scroll.",
      },
    },
  },
  contact: {
    label: "Contact",
    title: "Construisons quelque chose ensemble",
    description:
      "Un projet en tête ? Transformons votre vision en expérience numérique qui se démarque.",
    fieldName: "Nom",
    fieldEmail: "E-mail",
    fieldMessage: "Message",
    phName: "Votre nom…",
    phEmail: "Votre adresse e-mail…",
    phMessage: "Votre message…",
    submit: "Envoyer le message",
    ariaSubmit: "Envoyer le message",
    successTitle: "Message envoyé !",
    successBody:
      "Merci pour votre message. Je vous réponds sous 24 heures.",
    errName: "Le nom doit contenir au moins 2 caractères",
    errEmail: "Veuillez saisir une adresse e-mail valide",
    errMessage: "Le message doit contenir au moins 10 caractères",
  },
  footer: {
    rights: "© {{year}} Ethann Wantiez. Tous droits réservés.",
    ariaSocial: "Réseaux et liens",
    linkWebsite: "Site web",
    linkEmail: "E-mail",
    linkLinks: "Profil / liens",
    linkContactForm: "Aller au formulaire de contact",
  },
} as const;
