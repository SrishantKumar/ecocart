# 🌿 EcoMart - Sustainable E-Commerce Platform

EcoMart is a modern e-commerce platform focused on sustainable shopping and reducing environmental impact through smart product choices and eco-friendly delivery options.

## 🚀 Features

### 🛍️ Sustainable Shopping
- Browse eco-friendly products with detailed environmental impact information
- View carbon footprint for each product
- Smart product recommendations for sustainable alternatives
- Real-time carbon impact tracking

### 🚚 Green Delivery
- Multiple delivery route options:
  - 🌱 Eco Route: Electric vehicles, lower carbon footprint
  - ⚡ Fast Route: Priority handling, balanced efficiency
  - 💰 Budget Route: Cost-effective, optimized logistics
- Real-time route visualization with MapLibre GL
- Dynamic pricing based on distance and route type
- Green delivery discount for eco-friendly choices

### 📊 Environmental Impact Tracking
- Personal carbon savings dashboard
- Day streak tracking for sustainable choices
- Eco swap statistics
- Visual impact representations
- Tips for increasing positive environmental impact

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Maps**: MapLibre GL & Maptiler opensource
- **State Management**: React Context
- **Animations**: Framer Motion
- **Icons**: Lucide Icons

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ecomart.git
cd ecomart
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_MAPTILER_API_KEY=your_maptiler_api_key
```

4. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ecomart/
├── app/                    # Next.js app router pages
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   ├── map/             # Map-related components
│   └── ui/              # UI components
├── contexts/             # React contexts
├── hooks/               # Custom hooks
├── lib/                 # Utility functions
└── public/              # Static assets
```

## 🌟 Key Components

### Product Management
- `ProductCard`: Displays product information with carbon impact
- `ProductSwap`: Suggests eco-friendly alternatives
- `CarbonBadge`: Visual indicator of product's carbon footprint

### Delivery System
- `RouteMap`: Interactive map showing delivery routes
- `CitySelect`: City selection with autocomplete
- Route calculation with environmental impact metrics

### Impact Tracking
- Carbon footprint calculation
- Progress tracking
- Environmental impact visualization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Environment Variables

Required environment variables:
- `NEXT_PUBLIC_MAPTILER_API_KEY`: MapTiler API key for maps functionality

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- MapTiler for providing mapping services
- Shadcn/ui for the beautiful component library
- Next.js team for the amazing framework
- All contributors who help make EcoMart better


