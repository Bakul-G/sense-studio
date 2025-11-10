# Fraud Detection Portal - Demo UI Instructions

This guide will help you run the frontend demo with sample data, without needing the backend services.

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## Quick Start

### 1. Navigate to the frontend directory

```bash
cd fraud-detection-portal/frontend
```

### 2. Install dependencies

```bash
npm install
```

This will install all required packages including:
- React 18
- Material-UI components
- Redux Toolkit
- React Router
- Formik for forms
- Recharts for visualizations

### 3. Start the development server

```bash
npm run dev
```

The application will start and be available at:
**http://localhost:3000**

You should see output like:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### 4. Access the application

Open your browser and navigate to:
```
http://localhost:3000
```

## Demo Features

### Available Pages

1. **Dashboard** (`/dashboard`)
   - Real-time fraud statistics with demo data
   - Trend charts showing fraud detection over time
   - Recent alerts feed
   - System health indicators

2. **Rule Management** (`/rulesets`)
   - List of fraud detection rulesets
   - View ruleset details with all rules
   - Create/edit rules with visual condition builder
   - Deploy rulesets to different environments

3. **Data Dictionary** (`/data-dictionary`)
   - Manage data field definitions
   - Define data types and validation rules
   - Domain-specific field organization

4. **Features** (`/features`)
   - View engineered features
   - Feature dependencies

5. **Models** (`/models`)
   - ML model management interface
   - Model performance metrics

6. **Approvals** (`/approvals`)
   - Maker-checker workflow
   - Pending change requests

7. **Efficacy Monitor** (`/efficacy`)
   - Ruleset performance monitoring
   - Analytics dashboard

8. **Administration** (`/admin/users`, `/admin/audit-logs`)
   - User management
   - Audit trail viewer

### Demo Data

The application includes realistic demo data for:
- **3 Rulesets** across different banking domains (Retail, Credit, Debit)
- **5+ Rules** with various conditions and actions
- **10 Data Fields** with different data types
- **Performance Metrics** with realistic fraud detection stats

### Navigation

- Use the **sidebar menu** to navigate between different sections
- Click on the **user avatar** in the top right for profile options
- All demo functionality is fully interactive

## Demo Credentials

For the login page (though authentication is bypassed in demo mode):
- Username: `admin`
- Password: `admin123`

## Features to Explore

### 1. Dashboard
- View real-time fraud statistics
- Interactive charts (hover for details)
- System health metrics

### 2. Create a Rule
1. Go to "Rule Management"
2. Click "New Ruleset" or select existing ruleset
3. Click "Add Rule"
4. Build conditions using the visual editor
5. Configure actions (Block, Review, Flag, etc.)
6. See live preview of your rule

### 3. View Performance Metrics
1. Go to "Efficacy Monitor"
2. View overall metrics
3. Drill down into specific rulesets
4. Analyze true/false positives

### 4. Maker-Checker Workflow
1. Go to "Approvals"
2. View pending change requests
3. Simulate approval/rejection

## Troubleshooting

### Port already in use
If port 3000 is already taken:
```bash
# Edit vite.config.ts and change the port:
server: {
  port: 3001  // Change to any available port
}
```

### Dependencies installation fails
```bash
# Clear npm cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
# Rebuild the project
npm run build
```

### Browser console errors
- Open Developer Tools (F12)
- Check the Console tab for any errors
- Most errors will be related to missing API calls (expected in demo mode)

## Building for Production

To create a production build:

```bash
npm run build
```

This creates optimized files in the `dist` directory.

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable React components
│   ├── pages/           # Page-level components
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   ├── rules/       # Rule management pages
│   │   ├── dataDictionary/
│   │   ├── features/
│   │   ├── models/
│   │   ├── makerChecker/
│   │   ├── efficacy/
│   │   └── admin/
│   ├── layouts/         # Layout components
│   ├── store/           # Redux state management
│   ├── types/           # TypeScript types
│   ├── constants/       # Constants and configs
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
├── package.json         # Dependencies
└── vite.config.ts       # Build configuration
```

## Accessibility Features

The demo UI includes full WCAG 2.1 AA compliance:
- **Keyboard Navigation**: Tab through all interactive elements
- **Screen Reader Support**: All components have proper ARIA labels
- **Focus Indicators**: Clear visual focus states
- **Color Contrast**: Minimum 4.5:1 ratio for all text
- **Semantic HTML**: Proper heading hierarchy and landmarks

### Keyboard Shortcuts
- `Tab`: Navigate forward
- `Shift + Tab`: Navigate backward
- `Enter/Space`: Activate buttons/links
- `Esc`: Close dialogs/modals
- Arrow keys: Navigate in lists/tables

## Browser Support

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

The demo is optimized for performance:
- Code splitting for faster initial load
- Lazy loading of routes
- Optimized re-renders with React.memo
- Efficient state management with Redux Toolkit

## Next Steps

To connect to a real backend:
1. Update API endpoints in `src/constants/index.ts`
2. Implement API service layer in `src/services/`
3. Add proper authentication handling
4. Connect Redux slices to API calls

## Getting Help

For issues or questions:
- Check the main README.md
- Review the COMPREHENSIVE_SUMMARY.md
- Check browser console for errors
- Ensure Node.js version is 18.x or higher

## Demo Tips

1. **Start with the Dashboard** to get an overview
2. **Explore Rule Management** to see the core functionality
3. **Try creating a rule** to see the interactive builder
4. **Check Efficacy Monitor** for data visualization examples
5. **Use browser DevTools** to inspect component structure

## Clean Up

To stop the development server:
- Press `Ctrl + C` in the terminal

To remove all dependencies:
```bash
rm -rf node_modules
```

---

**Enjoy exploring the Fraud Detection Portal!** 🎉

The demo showcases a complete enterprise-grade banking application with modern React practices, Material-UI components, and comprehensive accessibility features.
