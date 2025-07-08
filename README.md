# ERP Dashboard

A professional, responsive ERP Dashboard built with vanilla HTML, CSS, and JavaScript using Chart.js for data visualization.

## Features

### 📊 Comprehensive Analytics
- **Sales Analytics**: Revenue trends, product performance, and sales insights
- **Purchase Analytics**: Purchase orders, vendor analysis, and cost management
- **Financial Analytics**: Profit & loss, cash flow, and expense management
- **Business Overview**: Key performance indicators and summary metrics

### 🎨 Professional Design
- Modern, clean interface with professional color scheme
- Responsive design that works on desktop, tablet, and mobile
- Interactive charts with tooltips and legends
- Smooth animations and transitions
- Professional typography using Inter font

### 📱 Responsive Layout
- Mobile-first design approach
- Adaptive grid layouts for different screen sizes
- Touch-friendly navigation and controls
- Optimized chart sizing for all devices

### 📈 Chart Types
- **Line Charts**: Revenue trends, cost analysis, cash flow
- **Bar Charts**: Monthly performance, vendor spending, profit/loss
- **Pie/Doughnut Charts**: Category breakdowns, expense distribution
- **Radar Charts**: Financial ratios and KPI comparisons

## Technology Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: ES6+ features and modular code
- **Chart.js**: Professional data visualization library
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: Inter font family for typography

## File Structure

```
ERP-Dashboard-v1/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality and Chart.js implementation
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. Clone or download the project files
2. Open `index.html` directly in your browser, or
3. Serve the files using a local web server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

4. Open your browser and navigate to `http://localhost:8000`

## Dashboard Sections

### Overview
- Key Performance Indicators (KPIs)
- Monthly performance overview
- Revenue vs expenses comparison

### Sales
- Revenue trends with timeframe selection
- Sales by product category
- Monthly sales performance
- Top performing products

### Purchases
- Purchase orders over time
- Vendor spending analysis
- Cost trends analysis
- Purchase categories breakdown

### Finances
- Profit & loss overview
- Cash flow analysis
- Expense breakdown
- Financial ratios radar chart

## Features

### Interactive Elements
- **Navigation Tabs**: Switch between different dashboard sections
- **Chart Controls**: Timeframe selection for revenue trends
- **Responsive Charts**: Automatic resizing on window resize
- **Loading Animation**: Professional loading spinner
- **Hover Effects**: Interactive chart tooltips and UI feedback

### Data Visualization
- **Mock Data**: Realistic sample data for demonstration
- **Currency Formatting**: Professional number formatting
- **Color Coding**: Consistent color scheme across all charts
- **Animations**: Smooth chart animations and transitions

## Customization

### Adding New Charts
1. Add HTML canvas element in the appropriate section
2. Create chart initialization function in `script.js`
3. Add mock data generation in the `generateMockData()` method
4. Call the initialization function in the appropriate section method

### Styling Customization
- Modify CSS custom properties in `:root` for color scheme changes
- Adjust spacing, typography, and layout in `styles.css`
- Update chart colors in the JavaScript chart configurations

### Data Integration
- Replace mock data generation with real API calls
- Update chart data structures to match your data format
- Add error handling for data loading failures

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance

- Optimized for fast loading and smooth interactions
- Lazy chart initialization (charts load only when sections are viewed)
- Efficient DOM manipulation and event handling
- Responsive image and asset loading

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues, feature requests, and pull requests to improve the dashboard.

---

**Note**: This dashboard uses mock data for demonstration purposes. In a production environment, you would integrate with your actual ERP system's API to fetch real-time data.
