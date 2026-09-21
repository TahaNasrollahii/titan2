import { Game } from '@/types';

export const games: Game[] = [
  {
    id: 'fortnite',
    slug: 'fortnite',
    title: 'فورتنایت',
    titleEn: 'Fortnite',
    description: 'بازی بتل رویال محبوب با میلیون‌ها بازیکن فعال. در میدان نبرد فرود بیایید، سلاح جمع کنید و آخرین نفر باقی‌مانده باشید.',
    genre: 'بتل رویال',
    coverImage: '/images/games/fortnite.jpg',
    logoImage: '/images/games/fortnite-logo.png',
    tournamentCount: 5,
    productCount: 12,
    playerCount: 45200,
    accentColor: '#00D4FF',
    accentGradient: 'linear-gradient(135deg, #00D4FF, #7B2FFF)',
  },
  {
    id: 'valorant',
    slug: 'valorant',
    title: 'ولورنت',
    titleEn: 'Valorant',
    description: 'شوتر تاکتیکی ۵ در مقابل ۵ با شخصیت‌های منحصربفرد. استراتژی، هدف‌گیری و کار تیمی کلید پیروزی هستند.',
    genre: 'شوتر تاکتیکی',
    coverImage: '/images/games/valorant.jpg',
    logoImage: '/images/games/valorant-logo.png',
    tournamentCount: 4,
    productCount: 8,
    playerCount: 38700,
    accentColor: '#FF4655',
    accentGradient: 'linear-gradient(135deg, #FF4655, #BD3944)',
  },
  {
    id: 'apex-legends',
    slug: 'apex-legends',
    title: 'ایپکس لجندز',
    titleEn: 'Apex Legends',
    description: 'شوتر بتل رویال تیمی با لجندهای منحصربفرد. هر لجند قابلیت‌های خاص خود را دارد.',
    genre: 'بتل رویال',
    coverImage: '/images/games/apex.jpg',
    logoImage: '/images/games/apex-logo.png',
    tournamentCount: 2,
    productCount: 5,
    playerCount: 17300,
    accentColor: '#EF4444',
    accentGradient: 'linear-gradient(135deg, #EF4444, #DC2626)',
  },
  {
    id: 'premium',
    slug: 'premium',
    title: 'اکانت‌های پریمیوم',
    titleEn: 'Premium',
    description: 'خرید اکانت‌های اسپاتیفای، تلگرام و...',
    genre: 'سرویس‌ها',
    coverImage: '/images/games/premium.png',
    logoImage: '',
    tournamentCount: 0,
    productCount: 15,
    playerCount: 12500,
    accentColor: '#1DB954',
    accentGradient: 'linear-gradient(135deg, #1DB954, #0088cc)',
  }
];

export function getGameById(id: string): Game | undefined {
  return games.find(g => g.id === id);
}

export function getGameBySlug(slug: string): Game | undefined {
  return games.find(g => g.slug === slug);
}
