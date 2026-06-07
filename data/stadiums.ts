export type LocalizedText = { de: string; fr: string; en: string };
export type LocalizedList = { de: string[]; fr: string[]; en: string[] };

export type Stadium = {
  id: string;
  name: string;
  tournamentName: string;
  city: string;
  country: string;
  opened: number;
  capacity: number;
  image: string;
  description: LocalizedText;
  facts: LocalizedList;
};

export const stadiums: Stadium[] = [
  {
    id: 'azteca', name: 'Estadio Azteca', tournamentName: 'Mexico City Stadium', city: 'Mexico City', country: 'Mexico', opened: 1966, capacity: 83000, image: '/stadiums/azteca.svg',
    description: { de: 'Legendäres Stadion und Schauplatz historischer WM-Momente. 2026 eröffnet hier das Turnier.', fr: 'Stade légendaire et théâtre de moments historiques de Coupe du Monde. Le tournoi 2026 débute ici.', en: 'Legendary stadium and venue of historic World Cup moments. The 2026 tournament opens here.' },
    facts: { de: ['Einziges Stadion mit WM-Spielen 1970, 1986 und 2026','Ikonische Fußballkathedrale','Eröffnungsspiel 2026'], fr: ['Seul stade avec des matchs de Coupe du Monde en 1970, 1986 et 2026','Cathédrale emblématique du football','Match d’ouverture 2026'], en: ['Only stadium to host World Cup matches in 1970, 1986 and 2026','Iconic football cathedral','Opening match of 2026'] }
  },
  {
    id: 'guadalajara', name: 'Estadio Akron', tournamentName: 'Guadalajara Stadium', city: 'Guadalajara', country: 'Mexico', opened: 2010, capacity: 48000, image: '/stadiums/guadalajara.svg',
    description: { de: 'Modernes Stadion in Guadalajara, bekannt für markante Architektur und starke Fußballtradition.', fr: 'Stade moderne à Guadalajara, connu pour son architecture distinctive et sa forte tradition footballistique.', en: 'Modern stadium in Guadalajara, known for its distinctive architecture and strong football tradition.' },
    facts: { de: ['Austragungsort in einer wichtigen Fußballstadt Mexikos','Markante Dachform und moderne Struktur','Heimat von Chivas Guadalajara'], fr: ['Site hôte dans une grande ville de football du Mexique','Toiture distinctive et structure moderne','Stade du club Chivas Guadalajara'], en: ['Host venue in one of Mexico’s major football cities','Distinctive roof and modern structure','Home of Chivas Guadalajara'] }
  },
  {
    id: 'monterrey', name: 'Estadio BBVA', tournamentName: 'Monterrey Stadium', city: 'Monterrey', country: 'Mexico', opened: 2015, capacity: 53500, image: '/stadiums/monterrey.svg',
    description: { de: 'Spektakuläres Stadion mit Blick auf die Berge von Monterrey und intensiver Atmosphäre.', fr: 'Stade spectaculaire avec vue sur les montagnes de Monterrey et une atmosphère intense.', en: 'Spectacular stadium with views of Monterrey’s mountains and an intense atmosphere.' },
    facts: { de: ['Blick auf den Cerro de la Silla','Eine der modernsten Arenen Mexikos','Bekannt für Nähe zum Spielfeld'], fr: ['Vue sur le Cerro de la Silla','L’une des arènes les plus modernes du Mexique','Réputé pour sa proximité avec le terrain'], en: ['Views of Cerro de la Silla','One of Mexico’s most modern arenas','Known for its close-to-the-pitch design'] }
  },
  {
    id: 'bmo', name: 'BMO Field', tournamentName: 'Toronto Stadium', city: 'Toronto', country: 'Canada', opened: 2007, capacity: 45500, image: '/stadiums/bmo.svg',
    description: { de: 'Kanadas urbanes Fußballstadion in Toronto, für das Turnier erweitert und modernisiert.', fr: 'Stade urbain de football à Toronto, agrandi et modernisé pour le tournoi.', en: 'Canada’s urban football stadium in Toronto, expanded and modernized for the tournament.' },
    facts: { de: ['Kanadas Auftaktspiel','Direkt am Exhibition Place','Erweiterte Kapazität für die WM'], fr: ['Match d’ouverture du Canada','Situé à Exhibition Place','Capacité augmentée pour la Coupe du Monde'], en: ['Canada’s opening match','Located at Exhibition Place','Expanded capacity for the World Cup'] }
  },
  {
    id: 'vancouver', name: 'BC Place', tournamentName: 'Vancouver Stadium', city: 'Vancouver', country: 'Canada', opened: 1983, capacity: 54500, image: '/stadiums/vancouver.svg',
    description: { de: 'Großes Stadion mit ikonischem Dach im Herzen von Vancouver und Erfahrung mit internationalen Sportevents.', fr: 'Grand stade au toit emblématique au cœur de Vancouver, habitué aux grands événements sportifs internationaux.', en: 'Large stadium with an iconic roof in central Vancouver and a strong record of international sports events.' },
    facts: { de: ['Austragungsort großer internationaler Events','Markantes, beleuchtetes Dach','Zentrale Lage in Vancouver'], fr: ['A accueilli de grands événements internationaux','Toit emblématique illuminé','Emplacement central à Vancouver'], en: ['Host of major international events','Distinctive illuminated roof','Central Vancouver location'] }
  },
  {
    id: 'atlanta', name: 'Mercedes-Benz Stadium', tournamentName: 'Atlanta Stadium', city: 'Atlanta', country: 'USA', opened: 2017, capacity: 71000, image: '/stadiums/atlanta.svg',
    description: { de: 'Futuristische Arena in Atlanta mit spektakulärem Dach und riesigem Halo-Videoboard.', fr: 'Arène futuriste à Atlanta avec un toit spectaculaire et un immense écran circulaire.', en: 'Futuristic Atlanta arena with a spectacular roof and a massive halo video board.' },
    facts: { de: ['Bekannt für das Halo-Videoboard','Retractable roof','Austragungsort mehrerer K.o.-Spiele'], fr: ['Connue pour son écran circulaire géant','Toit rétractable','Accueille plusieurs matchs à élimination directe'], en: ['Known for its halo video board','Retractable roof','Hosts several knockout matches'] }
  },
  {
    id: 'boston', name: 'Gillette Stadium', tournamentName: 'Boston Stadium', city: 'Foxborough', country: 'USA', opened: 2002, capacity: 65878, image: '/stadiums/boston.svg',
    description: { de: 'Großes Stadion in der Region Boston mit Erfahrung bei Football-, Fußball- und Großevents.', fr: 'Grand stade de la région de Boston, habitué au football américain, au football et aux grands événements.', en: 'Large stadium in the Boston region with experience hosting football, soccer and major events.' },
    facts: { de: ['Stadion der New England Patriots','Erfahrung mit internationalen Fußballspielen','Teil eines großen Entertainment-Komplexes'], fr: ['Stade des New England Patriots','Expérience avec des matchs internationaux de football','Intégré à un grand complexe de divertissement'], en: ['Home of the New England Patriots','Experience hosting international soccer','Part of a major entertainment complex'] }
  },
  {
    id: 'att', name: 'AT&T Stadium', tournamentName: 'Dallas Stadium', city: 'Arlington', country: 'USA', opened: 2009, capacity: 94000, image: '/stadiums/att.svg',
    description: { de: 'Spektakuläres Dachstadion mit enormer Kapazität, Premium-Event-Feeling und großem Videowürfel.', fr: 'Stade spectaculaire avec toit rétractable, grande capacité et expérience événementielle premium.', en: 'Spectacular roofed stadium with huge capacity, premium event atmosphere and a giant video screen.' },
    facts: { de: ['Größte nominelle WM-Kapazität','Retractable roof','Mehrere K.o.-Spiele'], fr: ['Plus grande capacité nominale du tournoi','Toit rétractable','Plusieurs matchs à élimination directe'], en: ['Largest nominal World Cup capacity','Retractable roof','Several knockout matches'] }
  },
  {
    id: 'houston', name: 'NRG Stadium', tournamentName: 'Houston Stadium', city: 'Houston', country: 'USA', opened: 2002, capacity: 72220, image: '/stadiums/houston.svg',
    description: { de: 'Vielseitige Arena in Houston mit verschließbarem Dach und viel Erfahrung bei Mega-Events.', fr: 'Arène polyvalente à Houston avec toit rétractable et grande expérience des méga-événements.', en: 'Versatile Houston arena with a retractable roof and extensive experience hosting mega-events.' },
    facts: { de: ['Teil des NRG Park','Retractable roof','Erfahrung mit Super Bowl und internationalen Spielen'], fr: ['Fait partie du NRG Park','Toit rétractable','Expérience avec le Super Bowl et des matchs internationaux'], en: ['Part of NRG Park','Retractable roof','Experience with Super Bowls and international matches'] }
  },
  {
    id: 'kansascity', name: 'Arrowhead Stadium', tournamentName: 'Kansas City Stadium', city: 'Kansas City', country: 'USA', opened: 1972, capacity: 76640, image: '/stadiums/kansascity.svg',
    description: { de: 'Kultstadion mit extremer Lautstärke und einer der intensivsten Fan-Atmosphären Nordamerikas.', fr: 'Stade culte réputé pour son bruit et l’une des atmosphères les plus intenses d’Amérique du Nord.', en: 'Iconic stadium famous for its noise and one of North America’s most intense fan atmospheres.' },
    facts: { de: ['Eines der lautesten Stadien der Welt','Heimat der Kansas City Chiefs','Austragungsort eines Viertelfinals'], fr: ['L’un des stades les plus bruyants du monde','Stade des Kansas City Chiefs','Accueille un quart de finale'], en: ['One of the loudest stadiums in the world','Home of the Kansas City Chiefs','Hosts a quarter-final'] }
  },
  {
    id: 'sofi', name: 'SoFi Stadium', tournamentName: 'Los Angeles Stadium', city: 'Inglewood', country: 'USA', opened: 2020, capacity: 70240, image: '/stadiums/sofi.svg',
    description: { de: 'Futuristische Arena in Los Angeles mit transluzentem Dach und High-End-Entertainment-Architektur.', fr: 'Arène futuriste à Los Angeles avec toit translucide et architecture de divertissement haut de gamme.', en: 'Futuristic Los Angeles arena with a translucent roof and high-end entertainment architecture.' },
    facts: { de: ['USA-Eröffnungsspiel','Premium-Design','Spektakuläre Dachstruktur'], fr: ['Match d’ouverture des États-Unis','Design premium','Structure de toit spectaculaire'], en: ['United States opening match','Premium design','Spectacular roof structure'] }
  },
  {
    id: 'miami', name: 'Hard Rock Stadium', tournamentName: 'Miami Stadium', city: 'Miami Gardens', country: 'USA', opened: 1987, capacity: 67518, image: '/stadiums/miami.svg',
    description: { de: 'Modernisierte Arena im Großraum Miami mit tropischem Flair und Erfahrung mit internationalen Top-Events.', fr: 'Arène modernisée dans la région de Miami, avec ambiance tropicale et expérience des grands événements.', en: 'Modernized arena in the Miami area with tropical flair and experience hosting major international events.' },
    facts: { de: ['Austragungsort des Spiels um Platz 3','Mehrfacher Super-Bowl-Standort','Bekannt für Fan-Komfort'], fr: ['Accueille le match pour la troisième place','Site de plusieurs Super Bowls','Connu pour son confort spectateur'], en: ['Hosts the third-place match','Multiple-time Super Bowl venue','Known for fan comfort'] }
  },
  {
    id: 'metlife', name: 'MetLife Stadium', tournamentName: 'New York New Jersey Stadium', city: 'East Rutherford', country: 'USA', opened: 2010, capacity: 82500, image: '/stadiums/metlife.svg',
    description: { de: 'Gigantische Arena im Großraum New York/New Jersey und Austragungsort des WM-Finals 2026.', fr: 'Immense arène dans la région de New York/New Jersey et site de la finale de la Coupe du Monde 2026.', en: 'Giant arena in the New York/New Jersey area and host of the 2026 World Cup Final.' },
    facts: { de: ['Finale am 19. Juli 2026','Eine der größten Arenen des Turniers','Neue Naturrasenlösung für die WM'], fr: ['Finale le 19 juillet 2026','L’une des plus grandes arènes du tournoi','Nouvelle pelouse naturelle pour la Coupe du Monde'], en: ['Final on July 19, 2026','One of the tournament’s largest arenas','New natural grass solution for the World Cup'] }
  },
  {
    id: 'philadelphia', name: 'Lincoln Financial Field', tournamentName: 'Philadelphia Stadium', city: 'Philadelphia', country: 'USA', opened: 2003, capacity: 69596, image: '/stadiums/philadelphia.svg',
    description: { de: 'Stadion mit starkem Sporterbe in Philadelphia und Erfahrung mit bedeutenden internationalen Fußballspielen.', fr: 'Stade au fort héritage sportif à Philadelphie, habitué aux grands matchs internationaux de football.', en: 'Philadelphia stadium with strong sports heritage and experience hosting major international soccer matches.' },
    facts: { de: ['Eröffnet mit Manchester United gegen Barcelona','Heimat der Philadelphia Eagles','Mehrere Gruppenspiele und ein K.o.-Spiel'], fr: ['Inauguré avec Manchester United contre Barcelone','Stade des Philadelphia Eagles','Plusieurs matchs de groupe et un match à élimination directe'], en: ['Opened with Manchester United vs Barcelona','Home of the Philadelphia Eagles','Several group matches and a knockout match'] }
  },
  {
    id: 'sanfrancisco', name: 'Levi’s Stadium', tournamentName: 'San Francisco Bay Area Stadium', city: 'Santa Clara', country: 'USA', opened: 2014, capacity: 70909, image: '/stadiums/sanfrancisco.svg',
    description: { de: 'Hightech-Stadion in der Bay Area mit moderner Infrastruktur und großer Event-Erfahrung.', fr: 'Stade high-tech dans la Bay Area avec infrastructure moderne et grande expérience événementielle.', en: 'High-tech Bay Area stadium with modern infrastructure and major event experience.' },
    facts: { de: ['Heimat der San Francisco 49ers','Auch Super-Bowl-Standort 2026','Moderne Outdoor-Arena'], fr: ['Stade des San Francisco 49ers','Également site du Super Bowl 2026','Arène extérieure moderne'], en: ['Home of the San Francisco 49ers','Also a 2026 Super Bowl venue','Modern outdoor arena'] }
  },
  {
    id: 'lumen', name: 'Lumen Field', tournamentName: 'Seattle Stadium', city: 'Seattle', country: 'USA', opened: 2002, capacity: 69000, image: '/stadiums/lumen.svg',
    description: { de: 'Bekannt für extreme Atmosphäre und laute Fans, mit starkem Fußball-Erbe in Seattle.', fr: 'Connu pour son ambiance intense et ses supporters bruyants, avec un fort héritage footballistique à Seattle.', en: 'Known for an intense atmosphere and loud fans, with a strong soccer heritage in Seattle.' },
    facts: { de: ['Lautes Stadion','MLS-Fankultur','Zentrale Lage'], fr: ['Stade très bruyant','Culture de supporters MLS','Emplacement central'], en: ['Loud stadium','MLS fan culture','Central location'] }
  }
];

export const stadiumById = (id: string) => stadiums.find((s) => s.id === id) ?? stadiums[0];
