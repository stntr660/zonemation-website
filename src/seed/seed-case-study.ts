import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'

async function seed() {
  const payload = await getPayload({ config })

  // Create a placeholder cover image (1200x630 dark gradient)
  const coverImagePath = path.resolve(__dirname, '../../public/seed-cover.jpg')

  // Check if media already has a seed image
  const { docs: existingMedia } = await payload.find({
    collection: 'media',
    where: { alt: { equals: 'seed-case-study-cover' } },
    limit: 1,
  })

  let coverImageId: string | number

  if (existingMedia.length > 0) {
    coverImageId = existingMedia[0].id
  } else {
    // Create a 1x1 pixel PNG as placeholder
    const pngBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64',
    )
    const tmpPath = '/tmp/seed-cover.png'
    fs.writeFileSync(tmpPath, pngBuffer)

    const file = {
      data: pngBuffer,
      mimetype: 'image/png',
      name: 'seed-cover.png',
      size: pngBuffer.length,
    }

    const media = await payload.create({
      collection: 'media',
      data: {
        alt: 'seed-case-study-cover',
      },
      file,
    })
    coverImageId = media.id
  }

  // Check if demo case study already exists
  const { docs: existing } = await payload.find({
    collection: 'case-studies',
    where: { slug: { equals: 'transformation-digitale-banque-maroc' } },
    limit: 1,
  })

  if (existing.length > 0) {
    console.log('Demo case study already exists, updating...')
    await payload.update({
      collection: 'case-studies',
      id: existing[0].id,
      data: getCaseStudyData(coverImageId),
    })
    console.log(`Updated: /case-studies/transformation-digitale-banque-maroc`)
    process.exit(0)
    return
  }

  const cs = await payload.create({
    collection: 'case-studies',
    data: getCaseStudyData(coverImageId),
  })

  console.log(`Created case study: ${cs.title}`)
  console.log(`View at: /case-studies/${cs.slug}`)
  process.exit(0)
}

function getCaseStudyData(coverImageId: string | number) {
  return {
    title: 'Transformer l\'infrastructure digitale d\'une banque leader au Maroc',
    slug: 'transformation-digitale-banque-maroc',
    excerpt:
      'Comment Zonemation a accompagne l\'une des plus grandes institutions financieres du Maroc dans la refonte complete de son architecture digitale, passant d\'un systeme legacy monolithique a une plateforme cloud-native capable de servir 4 millions de clients.',
    coverImage: coverImageId,
    clientDisplay: 'anonymous' as const,
    clientAnonymous: 'Une banque leader au Maroc',
    clientIndustryContext:
      'Institution financiere marocaine de premier plan, plus de 500 agences, 4 millions de clients particuliers et entreprises, presence dans 5 pays africains.',
    headlineMetrics: [
      {
        value: '+340%',
        label: 'Transactions digitales',
        context: 'vs. moyenne sectorielle de +45%',
      },
      {
        value: '-67%',
        label: 'Temps de deploiement',
        context: 'De 6 semaines a 2 semaines',
      },
      {
        value: '99.97%',
        label: 'Disponibilite systeme',
        context: 'SLA garanti 24/7',
      },
      {
        value: '12M MAD',
        label: 'Economies annuelles',
        context: 'Cout infrastructure reduit de 40%',
      },
    ],
    situationHeading: 'Situation',
    situation: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Le secteur bancaire marocain connait une acceleration sans precedent de sa transformation digitale. Porte par les directives de Bank Al-Maghrib et par une clientele de plus en plus connectee, les etablissements financiers doivent repenser fondamentalement leur infrastructure technologique.',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Notre client, l\'une des cinq plus grandes banques du Royaume, servait plus de 4 millions de clients a travers un reseau de 500 agences. Malgre sa position de leader, la banque s\'appuyait encore largement sur une architecture monolithique deployee il y a plus de 15 ans.',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'L\'emergence de neo-banques et de fintechs au Maroc, combinee aux attentes croissantes des clients en matiere d\'experience digitale, rendait la modernisation non plus optionnelle mais existentielle.',
              },
            ],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    challengeHeading: 'Challenge',
    challenge: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'La banque faisait face a un triple defi strategique :',
              },
            ],
          },
          {
            type: 'list',
            children: [
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Dette technique massive : Le core banking system, construit sur une architecture J2EE monolithique, limitait la capacite a deployer de nouvelles fonctionnalites. Chaque mise a jour necessitait 6 semaines de tests et de validation.',
                    format: 0,
                  },
                ],
                value: 1,
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Scalabilite insuffisante : Lors des pics de fin de mois et pendant le Ramadan, le systeme atteignait regulierement ses limites, provoquant des temps de reponse degrades et des interruptions de service.',
                    format: 0,
                  },
                ],
                value: 2,
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Conformite reglementaire : Les nouvelles exigences de Bank Al-Maghrib en matiere de reporting temps reel et de lutte anti-blanchiment necessitaient des capacites de traitement de donnees que l\'architecture existante ne pouvait offrir.',
                    format: 0,
                  },
                ],
                value: 3,
              },
            ],
            listType: 'bullet',
            tag: 'ul',
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Le tout devait etre realise sans interruption de service pour les 4 millions de clients, dans un delai de 18 mois, et avec un budget contraint par la conjoncture economique post-Covid.',
              },
            ],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    approachHeading: 'Notre approche',
    approach: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Zonemation a deploye une equipe de 8 consultants et architectes sur une periode de 18 mois, structuree en trois phases distinctes :',
              },
            ],
          },
          {
            type: 'heading',
            children: [{ type: 'text', text: 'Phase 1 : Diagnostic et architecture cible (3 mois)' }],
            tag: 'h3',
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Audit exhaustif des 47 applications critiques, cartographie des dependances, et definition d\'une architecture cible basee sur les microservices et le cloud hybride. Nous avons identifie 12 domaines metier pouvant etre decomposes en services autonomes.',
              },
            ],
          },
          {
            type: 'heading',
            children: [{ type: 'text', text: 'Phase 2 : Migration progressive (10 mois)' }],
            tag: 'h3',
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Approche "strangler fig" pour migrer progressivement les composants du monolithe vers des microservices containerises (Kubernetes). Chaque domaine a ete migre independamment avec un pattern de double-ecriture garantissant zero perte de donnees.',
              },
            ],
          },
          {
            type: 'heading',
            children: [{ type: 'text', text: 'Phase 3 : Optimisation et transfert (5 mois)' }],
            tag: 'h3',
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Mise en place du monitoring avance (observabilite complete), optimisation des pipelines CI/CD, et formation de 25 ingenieurs internes pour garantir l\'autonomie operationnelle de la banque.',
              },
            ],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    resultsHeading: 'Resultats',
    results: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'La transformation a depasse les objectifs initiaux sur tous les indicateurs cles, positionnant la banque comme reference du secteur en matiere d\'infrastructure digitale.',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Au-dela des metriques, la banque a fondamentalement change sa facon de developper et deployer des services. Le time-to-market pour une nouvelle fonctionnalite est passe de 6 semaines a 2 semaines en moyenne, permettant a l\'institution de reagir aux evolutions du marche avec une agilite inedite.',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Le projet a ete cite par Bank Al-Maghrib comme exemple de best practice dans son rapport annuel sur la digitalisation du secteur financier marocain.',
              },
            ],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    detailedMetrics: [
      { category: 'Performance', value: '+340%', label: 'Transactions digitales par jour', description: 'De 120K a 528K transactions/jour' },
      { category: 'Performance', value: '99.97%', label: 'Disponibilite systeme', description: 'Contre 97.2% avant migration' },
      { category: 'Performance', value: '<200ms', label: 'Temps de reponse API', description: 'P95, contre 1.2s precedemment' },
      { category: 'Operations', value: '-67%', label: 'Cycle de deploiement', description: 'De 6 semaines a 2 semaines' },
      { category: 'Operations', value: '85%', label: 'Automatisation CI/CD', description: 'Pipeline entierement automatise' },
      { category: 'Operations', value: '25', label: 'Ingenieurs formes', description: 'Autonomie operationnelle complete' },
      { category: 'Finance', value: '12M MAD', label: 'Economies annuelles', description: 'Reduction infrastructure de 40%' },
      { category: 'Finance', value: '18 mois', label: 'ROI positif', description: 'Retour sur investissement atteint' },
    ],
    testimonial: {
      quote:
        'Zonemation n\'a pas simplement modernise notre infrastructure. Ils ont transforme notre culture technologique. Nos equipes pensent et travaillent differemment. C\'est la que reside la vraie valeur de cette transformation.',
      author: 'Directeur General Adjoint',
      role: 'En charge de la Transformation Digitale',
      company: 'Banque partenaire',
    },
    accessLevel: 'full' as const,
    downloadablePdf: true,
    status: 'published' as const,
    featured: true,
    publishedDate: '2025-11-15',
    readTime: 8,
    seo: {
      metaTitle: 'Transformation digitale bancaire au Maroc - Zonemation Case Study',
      metaDescription:
        'Comment Zonemation a accompagne une banque leader au Maroc dans sa transformation digitale : +340% transactions, 99.97% disponibilite, 12M MAD d\'economies.',
    },
  }
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
