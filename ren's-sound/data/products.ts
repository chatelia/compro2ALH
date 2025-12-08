import { Product } from '../types';

export const products: Product[] = [
  // Sound System
  {
    id: 'ss-1',
    category: 'Sound System',
    name: 'Paket 1000 Watt',
    specs: ['2x Speaker Aktif 500W', '1x Mixer', '2x Mic Wireless', 'Kabel & Aksesoris', 'Crew & Setup'],
    price: 'Rp 850.000',
    image: 'https://picsum.photos/id/145/400/400'
  },
  {
    id: 'ss-2',
    category: 'Sound System',
    name: 'Paket 2000 Watt',
    specs: ['4x Speaker Aktif 500W', '1x Mixer', '3x Mic Wireless', 'Kabel & Aksesoris', 'Crew & Setup'],
    price: 'Rp 1.300.000',
    image: 'https://picsum.photos/id/158/400/400'
  },
  {
    id: 'ss-3',
    category: 'Sound System',
    name: 'Paket 3000 Watt',
    specs: ['6x Speaker Aktif 500W', '1x Mixer Professional', '4x Mic Wireless', 'Kabel & Aksesoris', 'Crew & Setup'],
    price: 'Rp 2.200.000',
    image: 'https://picsum.photos/id/453/400/400'
  },
  
  // Lighting (Based on PDF Menu 2-2)
  {
    id: 'lg-1',
    category: 'Lighting',
    name: 'Lighting Parled (Per Unit)',
    specs: ['Lampu ParLED RGB', 'Stand', 'Kabel Power'],
    price: 'Rp 125.000 / unit',
    image: 'https://picsum.photos/id/439/400/400'
  },
  {
    id: 'lg-2',
    category: 'Lighting',
    name: 'Lighting Parled Set',
    specs: ['8 Unit ParLED', 'Mixer Lighting', 'Operator', 'Stand & Cabling'],
    price: 'Rp 500.000 / set',
    image: 'https://picsum.photos/id/348/400/400'
  },

  // Music (Instruments based on PDF Menu 2-1)
  {
    id: 'ms-1',
    category: 'Music',
    name: 'Drum Acoustic',
    specs: ['Full set dengan hardware lengkap', 'Cymbal set', 'Throne'],
    price: 'Rp 500.000',
    image: 'https://picsum.photos/id/1082/400/400'
  },
  {
    id: 'ms-2',
    category: 'Music',
    name: 'Drum Electric',
    specs: ['Include modul & stand', 'Output Jack', 'Headphone monitoring support'],
    price: 'Rp 250.000',
    image: 'https://picsum.photos/id/84/400/400'
  }
];