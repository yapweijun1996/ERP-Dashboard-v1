// ERP Dashboard JavaScript
class ERPDashboard {
    constructor() {
        this.charts = {};
        this.mockData = this.generateMockData();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDateTime();
        this.showLoadingSpinner();
        
        // Simulate loading time
        setTimeout(() => {
            this.hideLoadingSpinner();
            this.updateKPIs();
            this.initializeCharts();
        }, 1500);
        
        // Update date/time every minute
        setInterval(() => this.updateDateTime(), 60000);
    }

    setupEventListeners() {
        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const section = e.target.closest('.nav-tab').dataset.section;
                this.switchSection(section);
            });
        });

        // Chart controls
        document.getElementById('revenueTimeframe')?.addEventListener('change', (e) => {
            this.updateRevenueTrendsChart(e.target.value);
        });

        // Responsive chart resize
        window.addEventListener('resize', () => {
            Object.values(this.charts).forEach(chart => {
                if (chart) chart.resize();
            });
        });
    }

    generateMockData() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
        const years = ['2022', '2023', '2024'];
        
        return {
            // Sales Data
            monthlyRevenue: months.map(() => Math.floor(Math.random() * 100000) + 50000),
            quarterlyRevenue: quarters.map(() => Math.floor(Math.random() * 300000) + 150000),
            yearlyRevenue: years.map(() => Math.floor(Math.random() * 1000000) + 500000),
            
            salesByCategory: {
                labels: ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Automotive'],
                data: [35, 25, 15, 12, 8, 5]
            },
            
            topProducts: {
                labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
                data: [45000, 38000, 32000, 28000, 22000]
            },
            
            // Purchase Data
            monthlyPurchases: months.map(() => Math.floor(Math.random() * 60000) + 30000),
            
            vendorSpending: {
                labels: ['Vendor A', 'Vendor B', 'Vendor C', 'Vendor D', 'Vendor E'],
                data: [120000, 95000, 78000, 65000, 42000]
            },
            
            purchaseCategories: {
                labels: ['Raw Materials', 'Equipment', 'Services', 'Supplies', 'Software'],
                data: [40, 25, 15, 12, 8]
            },
            
            // Financial Data
            monthlyProfit: months.map(() => Math.floor(Math.random() * 40000) + 10000),
            monthlyExpenses: months.map(() => Math.floor(Math.random() * 30000) + 20000),
            
            cashFlow: months.map(() => Math.floor(Math.random() * 50000) + 25000),
            
            expenseBreakdown: {
                labels: ['Salaries', 'Rent', 'Utilities', 'Marketing', 'Equipment', 'Other'],
                data: [45, 20, 8, 12, 10, 5]
            },
            
            financialRatios: {
                labels: ['Current Ratio', 'Quick Ratio', 'Debt-to-Equity', 'ROI'],
                data: [2.1, 1.8, 0.4, 15.2]
            }
        };
    }

    updateDateTime() {
        const now = new Date();
        const dateOptions = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', dateOptions);
        document.getElementById('lastUpdated').textContent = now.toLocaleString();
    }

    showLoadingSpinner() {
        document.getElementById('loadingSpinner').classList.remove('hidden');
    }

    hideLoadingSpinner() {
        document.getElementById('loadingSpinner').classList.add('hidden');
    }

    updateKPIs() {
        const totalRevenue = this.mockData.monthlyRevenue.reduce((sum, val) => sum + val, 0);
        const totalPurchases = this.mockData.monthlyPurchases.reduce((sum, val) => sum + val, 0);
        const netProfit = totalRevenue - totalPurchases;
        const cashFlow = this.mockData.cashFlow.reduce((sum, val) => sum + val, 0);

        document.getElementById('totalRevenue').textContent = this.formatCurrency(totalRevenue);
        document.getElementById('totalPurchases').textContent = this.formatCurrency(totalPurchases);
        document.getElementById('netProfit').textContent = this.formatCurrency(netProfit);
        document.getElementById('cashFlow').textContent = this.formatCurrency(cashFlow);

        // Update change percentages (mock data)
        document.getElementById('revenueChange').textContent = '+12.5%';
        document.getElementById('purchasesChange').textContent = '+8.3%';
        document.getElementById('profitChange').textContent = '+18.7%';
        document.getElementById('cashFlowChange').textContent = '+15.2%';
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    switchSection(sectionName) {
        // Update active tab
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update active section
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');

        // Initialize charts for the active section if not already done
        this.initializeSectionCharts(sectionName);
    }

    initializeCharts() {
        this.initializeOverviewCharts();
    }

    initializeSectionCharts(section) {
        switch(section) {
            case 'overview':
                this.initializeOverviewCharts();
                break;
            case 'sales':
                this.initializeSalesCharts();
                break;
            case 'purchases':
                this.initializePurchaseCharts();
                break;
            case 'finances':
                this.initializeFinanceCharts();
                break;
        }
    }

    initializeOverviewCharts() {
        // Monthly Performance Overview
        const overviewCtx = document.getElementById('overviewChart');
        if (overviewCtx && !this.charts.overview) {
            this.charts.overview = new Chart(overviewCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Revenue',
                        data: this.mockData.monthlyRevenue,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true
                    }, {
                        label: 'Purchases',
                        data: this.mockData.monthlyPurchases,
                        borderColor: '#06b6d4',
                        backgroundColor: 'rgba(6, 182, 212, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: this.getDefaultChartOptions()
            });
        }

        // Revenue vs Expenses
        const revenueExpensesCtx = document.getElementById('revenueExpensesChart');
        if (revenueExpensesCtx && !this.charts.revenueExpenses) {
            this.charts.revenueExpenses = new Chart(revenueExpensesCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Revenue',
                        data: this.mockData.monthlyRevenue.slice(0, 6),
                        backgroundColor: '#10b981'
                    }, {
                        label: 'Expenses',
                        data: this.mockData.monthlyExpenses.slice(0, 6),
                        backgroundColor: '#ef4444'
                    }]
                },
                options: this.getDefaultChartOptions()
            });
        }
    }

    getDefaultChartOptions() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f1f5f9'
                    },
                    ticks: {
                        color: '#64748b'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#64748b'
                    }
                }
            }
        };
    }

    initializeSalesCharts() {
        // Revenue Trends Chart
        const revenueTrendsCtx = document.getElementById('revenueTrendsChart');
        if (revenueTrendsCtx && !this.charts.revenueTrends) {
            this.charts.revenueTrends = new Chart(revenueTrendsCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Revenue',
                        data: this.mockData.monthlyRevenue,
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#2563eb',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 5
                    }]
                },
                options: {
                    ...this.getDefaultChartOptions(),
                    scales: {
                        ...this.getDefaultChartOptions().scales,
                        y: {
                            ...this.getDefaultChartOptions().scales.y,
                            ticks: {
                                ...this.getDefaultChartOptions().scales.y.ticks,
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }

        // Sales by Category Chart
        const salesByCategoryCtx = document.getElementById('salesByCategoryChart');
        if (salesByCategoryCtx && !this.charts.salesByCategory) {
            this.charts.salesByCategory = new Chart(salesByCategoryCtx, {
                type: 'doughnut',
                data: {
                    labels: this.mockData.salesByCategory.labels,
                    datasets: [{
                        data: this.mockData.salesByCategory.data,
                        backgroundColor: [
                            '#2563eb',
                            '#10b981',
                            '#f59e0b',
                            '#ef4444',
                            '#8b5cf6',
                            '#06b6d4'
                        ],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    ...this.getDefaultChartOptions(),
                    plugins: {
                        ...this.getDefaultChartOptions().plugins,
                        tooltip: {
                            ...this.getDefaultChartOptions().plugins.tooltip,
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    }
                }
            });
        }

        // Monthly Sales Performance Chart
        const monthlySalesCtx = document.getElementById('monthlySalesChart');
        if (monthlySalesCtx && !this.charts.monthlySales) {
            this.charts.monthlySales = new Chart(monthlySalesCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Sales',
                        data: this.mockData.monthlyRevenue,
                        backgroundColor: '#10b981',
                        borderRadius: 4,
                        borderSkipped: false
                    }]
                },
                options: {
                    ...this.getDefaultChartOptions(),
                    scales: {
                        ...this.getDefaultChartOptions().scales,
                        y: {
                            ...this.getDefaultChartOptions().scales.y,
                            ticks: {
                                ...this.getDefaultChartOptions().scales.y.ticks,
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }

        // Top Products Chart
        const topProductsCtx = document.getElementById('topProductsChart');
        if (topProductsCtx && !this.charts.topProducts) {
            this.charts.topProducts = new Chart(topProductsCtx, {
                type: 'bar',
                data: {
                    labels: this.mockData.topProducts.labels,
                    datasets: [{
                        label: 'Revenue',
                        data: this.mockData.topProducts.data,
                        backgroundColor: '#f59e0b',
                        borderRadius: 4
                    }]
                },
                options: {
                    ...this.getDefaultChartOptions(),
                    indexAxis: 'y',
                    scales: {
                        x: {
                            beginAtZero: true,
                            grid: {
                                color: '#f1f5f9'
                            },
                            ticks: {
                                color: '#64748b',
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#64748b'
                            }
                        }
                    }
                }
            });
        }
    }

    initializePurchaseCharts() {
        // Purchase Orders Over Time Chart
        const purchaseOrdersCtx = document.getElementById('purchaseOrdersChart');
        if (purchaseOrdersCtx && !this.charts.purchaseOrders) {
            this.charts.purchaseOrders = new Chart(purchaseOrdersCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Purchase Orders',
                        data: this.mockData.monthlyPurchases,
                        borderColor: '#06b6d4',
                        backgroundColor: 'rgba(6, 182, 212, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#06b6d4',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 5
                    }]
                },
                options: {
                    ...this.getDefaultChartOptions(),
                    scales: {
                        ...this.getDefaultChartOptions().scales,
                        y: {
                            ...this.getDefaultChartOptions().scales.y,
                            ticks: {
                                ...this.getDefaultChartOptions().scales.y.ticks,
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }

        // Vendor Spending Analysis Chart
        const vendorSpendingCtx = document.getElementById('vendorSpendingChart');
        if (vendorSpendingCtx && !this.charts.vendorSpending) {
            this.charts.vendorSpending = new Chart(vendorSpendingCtx, {
                type: 'bar',
                data: {
                    labels: this.mockData.vendorSpending.labels,
                    datasets: [{
                        label: 'Spending',
                        data: this.mockData.vendorSpending.data,
                        backgroundColor: [
                            '#2563eb',
                            '#10b981',
                            '#f59e0b',
                            '#ef4444',
                            '#8b5cf6'
                        ],
                        borderRadius: 4,
                        borderSkipped: false
                    }]
                },
                options: {
                    ...this.getDefaultChartOptions(),
                    scales: {
                        ...this.getDefaultChartOptions().scales,
                        y: {
                            ...this.getDefaultChartOptions().scales.y,
                            ticks: {
                                ...this.getDefaultChartOptions().scales.y.ticks,
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }

        // Cost Trends Chart
        const costTrendsCtx = document.getElementById('costTrendsChart');
        if (costTrendsCtx && !this.charts.costTrends) {
            this.charts.costTrends = new Chart(costTrendsCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Material Costs',
                        data: this.mockData.monthlyPurchases.map(val => val * 0.6),
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        tension: 0.4,
                        fill: false
                    }, {
                        label: 'Labor Costs',
                        data: this.mockData.monthlyPurchases.map(val => val * 0.4),
                        borderColor: '#f59e0b',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        tension: 0.4,
                        fill: false
                    }]
                },
                options: {
                    ...this.getDefaultChartOptions(),
                    scales: {
                        ...this.getDefaultChartOptions().scales,
                        y: {
                            ...this.getDefaultChartOptions().scales.y,
                            ticks: {
                                ...this.getDefaultChartOptions().scales.y.ticks,
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }

        // Purchase Categories Chart
        const purchaseCategoriesCtx = document.getElementById('purchaseCategoriesChart');
        if (purchaseCategoriesCtx && !this.charts.purchaseCategories) {
            this.charts.purchaseCategories = new Chart(purchaseCategoriesCtx, {
                type: 'pie',
                data: {
                    labels: this.mockData.purchaseCategories.labels,
                    datasets: [{
                        data: this.mockData.purchaseCategories.data,
                        backgroundColor: [
                            '#2563eb',
                            '#10b981',
                            '#f59e0b',
                            '#ef4444',
                            '#8b5cf6'
                        ],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    ...this.getDefaultChartOptions(),
                    plugins: {
                        ...this.getDefaultChartOptions().plugins,
                        tooltip: {
                            ...this.getDefaultChartOptions().plugins.tooltip,
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    initializeFinanceCharts() {
        // Profit & Loss Overview Chart
        const profitLossCtx = document.getElementById('profitLossChart');
        if (profitLossCtx && !this.charts.profitLoss) {
            this.charts.profitLoss = new Chart(profitLossCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Revenue',
                        data: this.mockData.monthlyRevenue,
                        backgroundColor: '#10b981'
                    }, {
                        label: 'Expenses',
                        data: this.mockData.monthlyExpenses,
                        backgroundColor: '#ef4444'
                    }, {
                        label: 'Profit',
                        data: this.mockData.monthlyProfit,
                        backgroundColor: '#2563eb'
                    }]
                },
                options: {
                    ...this.getDefaultChartOptions(),
                    scales: {
                        ...this.getDefaultChartOptions().scales,
                        y: {
                            ...this.getDefaultChartOptions().scales.y,
                            ticks: {
                                ...this.getDefaultChartOptions().scales.y.ticks,
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }

        // Cash Flow Analysis Chart
        const cashFlowCtx = document.getElementById('cashFlowChart');
        if (cashFlowCtx && !this.charts.cashFlow) {
            this.charts.cashFlow = new Chart(cashFlowCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Cash Flow',
                        data: this.mockData.cashFlow,
                        borderColor: '#8b5cf6',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#8b5cf6',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 5
                    }]
                },
                options: {
                    ...this.getDefaultChartOptions(),
                    scales: {
                        ...this.getDefaultChartOptions().scales,
                        y: {
                            ...this.getDefaultChartOptions().scales.y,
                            ticks: {
                                ...this.getDefaultChartOptions().scales.y.ticks,
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }

        // Expense Breakdown Chart
        const expenseBreakdownCtx = document.getElementById('expenseBreakdownChart');
        if (expenseBreakdownCtx && !this.charts.expenseBreakdown) {
            this.charts.expenseBreakdown = new Chart(expenseBreakdownCtx, {
                type: 'doughnut',
                data: {
                    labels: this.mockData.expenseBreakdown.labels,
                    datasets: [{
                        data: this.mockData.expenseBreakdown.data,
                        backgroundColor: [
                            '#ef4444',
                            '#f59e0b',
                            '#10b981',
                            '#06b6d4',
                            '#8b5cf6',
                            '#64748b'
                        ],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    ...this.getDefaultChartOptions(),
                    plugins: {
                        ...this.getDefaultChartOptions().plugins,
                        tooltip: {
                            ...this.getDefaultChartOptions().plugins.tooltip,
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    }
                }
            });
        }

        // Financial Ratios Chart
        const financialRatiosCtx = document.getElementById('financialRatiosChart');
        if (financialRatiosCtx && !this.charts.financialRatios) {
            this.charts.financialRatios = new Chart(financialRatiosCtx, {
                type: 'radar',
                data: {
                    labels: this.mockData.financialRatios.labels,
                    datasets: [{
                        label: 'Current Period',
                        data: this.mockData.financialRatios.data,
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.2)',
                        pointBackgroundColor: '#2563eb',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                padding: 20
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#ffffff',
                            bodyColor: '#ffffff',
                            borderColor: '#e2e8f0',
                            borderWidth: 1,
                            cornerRadius: 8,
                            displayColors: true
                        }
                    },
                    scales: {
                        r: {
                            beginAtZero: true,
                            grid: {
                                color: '#f1f5f9'
                            },
                            pointLabels: {
                                color: '#64748b'
                            },
                            ticks: {
                                color: '#64748b',
                                backdropColor: 'transparent'
                            }
                        }
                    }
                }
            });
        }
    }

    updateRevenueTrendsChart(timeframe) {
        if (!this.charts.revenueTrends) return;

        let labels, data;
        switch(timeframe) {
            case 'quarterly':
                labels = ['Q1', 'Q2', 'Q3', 'Q4'];
                data = this.mockData.quarterlyRevenue;
                break;
            case 'yearly':
                labels = ['2022', '2023', '2024'];
                data = this.mockData.yearlyRevenue;
                break;
            default:
                labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                data = this.mockData.monthlyRevenue;
        }

        this.charts.revenueTrends.data.labels = labels;
        this.charts.revenueTrends.data.datasets[0].data = data;
        this.charts.revenueTrends.update();
    }
}

// Initialize the dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new ERPDashboard();
});
