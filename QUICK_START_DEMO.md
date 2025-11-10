# 🚀 Quick Start - Frontend Demo Only

Get the Fraud Detection Portal UI running in **under 2 minutes**!

## Prerequisites

✅ **Node.js 18+** installed ([Download here](https://nodejs.org/))

Check your version:
```bash
node -v
```

## 🎯 Start the Demo (Choose One Method)

### Method 1: One-Command Start (Easiest)

```bash
cd /Users/sushmasingh/workspace-2025/sense-portal/fraud-detection-portal/frontend
./start-demo.sh
```

### Method 2: Manual Start

```bash
cd /Users/sushmasingh/workspace-2025/sense-portal/fraud-detection-portal/frontend
npm install
npm run dev
```

## 🌐 Access the Application

Open your browser and go to:

```
http://localhost:3000
```

You should see the Fraud Detection Portal dashboard!

## 🎨 What's Included in the Demo?

### Pre-loaded Demo Data:
- ✅ **3 Rulesets** (Retail, Credit, Debit)
- ✅ **5+ Fraud Detection Rules**
- ✅ **10 Data Fields** with definitions
- ✅ **Real-time Dashboard** with charts
- ✅ **Performance Metrics**
- ✅ **User Management** interface
- ✅ **Maker-Checker Workflow**

### All Pages Work:
1. **Dashboard** - Real-time fraud statistics
2. **Rule Management** - Create and manage rules
3. **Data Dictionary** - Field definitions
4. **Features** - Engineered features
5. **Models** - ML models
6. **Approvals** - Maker-checker queue
7. **Efficacy Monitor** - Performance tracking
8. **Admin** - Users and audit logs

## 📱 Quick Navigation

Once the app loads:

1. **Explore the Dashboard** - See fraud statistics and charts
2. **Click "Rule Management"** in sidebar - View rulesets
3. **Select a ruleset** - See all rules inside
4. **Click "Add Rule"** - Try the rule builder
5. **Check "Efficacy Monitor"** - View performance metrics

## 🎮 Demo Features to Try

### Create a Fraud Detection Rule:
1. Go to **Rule Management** (sidebar)
2. Click on any ruleset (or create new)
3. Click **"Add Rule"** button
4. Build a condition: `transaction_amount > 10000`
5. Set action: **Block**
6. See live preview on right side
7. Click **"Save Rule"**

### View Performance Dashboard:
1. Click **"Dashboard"** in sidebar
2. See real-time fraud statistics
3. Hover over charts for details
4. Check system health indicators

### Explore Data Dictionary:
1. Go to **Data Dictionary**
2. See all available data fields
3. Filter by domain (Retail/Credit/Debit)
4. Click edit icon to see field details

## 🔧 Troubleshooting

### "Command not found: node"
➡️ Install Node.js from https://nodejs.org/

### "Port 3000 already in use"
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# OR change port in vite.config.ts
server: { port: 3001 }
```

### Dependencies won't install
```bash
# Clear and reinstall
npm cache clean --force
rm -rf node_modules
npm install
```

### Application shows blank page
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Try refreshing the page (Cmd/Ctrl + R)

## ⚡ Performance Tips

- **Initial load**: Takes ~2-3 seconds first time
- **Subsequent loads**: Much faster (<1 second)
- **Hot reload**: Any code changes reload instantly

## 🎯 Key Highlights

✨ **Modern UI** - Material-UI components
✨ **Fully Accessible** - WCAG 2.1 AA compliant
✨ **Responsive** - Works on mobile, tablet, desktop
✨ **Interactive Charts** - Recharts visualizations
✨ **Form Validation** - Real-time validation with Formik
✨ **Type Safe** - Full TypeScript support

## 📊 Demo Data Details

### Sample Rulesets:
```
1. High Risk Transaction Rules (RETAIL)
   - Large Amount Transaction (Block > $10,000)
   - Rapid Transaction Velocity (Review if >5 in 10min)
   - New Account High Amount (Review)

2. Credit Card Fraud Detection (CREDIT)
   - Credit Limit Breach (Block)
   - High Utilization Alert (Flag >90%)

3. Debit Card Security Rules (DEBIT)
   - [Demo rules available]
```

### Sample Metrics:
- Total Transactions: 1,250,000
- Fraud Detected: 325 cases
- False Positive Rate: 2.4%
- Overall Accuracy: 99.57%

## ⌨️ Keyboard Navigation

The entire app is keyboard accessible:
- `Tab` - Move forward
- `Shift+Tab` - Move backward
- `Enter` - Activate buttons
- `Esc` - Close dialogs
- `Arrow keys` - Navigate tables

## 📱 Mobile View

The app is fully responsive. Try it on:
- Desktop browser
- Tablet (iPad)
- Mobile phone

Resize your browser window to see responsive design!

## 🛑 Stopping the Demo

Press `Ctrl + C` in the terminal where the server is running.

## 📚 More Information

For detailed documentation:
- `frontend/README.md` - Frontend overview
- `frontend/DEMO_INSTRUCTIONS.md` - Detailed guide
- `COMPREHENSIVE_SUMMARY.md` - Complete project reference

## 🎉 That's It!

You now have a fully functional fraud detection portal running with demo data.

**No backend needed!** All data is mocked in the frontend for demonstration purposes.

---

## 💡 Quick Reference

| What | Command/URL |
|------|-------------|
| Start Demo | `./start-demo.sh` |
| Access App | `http://localhost:3000` |
| Stop Demo | `Ctrl + C` |
| Restart | `npm run dev` |
| Check Errors | Open DevTools (F12) |

---

**Questions?** Check `frontend/DEMO_INSTRUCTIONS.md` for troubleshooting!

**Enjoy exploring the Fraud Detection Portal!** 🏦✨
