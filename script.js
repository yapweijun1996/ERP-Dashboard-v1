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

        // Refresh data every 5 minutes for demo purposes
        setInterval(() => this.refreshDashboardData(), 300000);
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

        // Refresh button
        document.getElementById('refreshBtn')?.addEventListener('click', () => {
            this.refreshDashboardData();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + R for refresh (prevent default browser refresh)
            if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
                e.preventDefault();
                this.refreshDashboardData();
            }

            // Number keys for section switching
            if (e.key >= '1' && e.key <= '4') {
                const sections = ['overview', 'sales', 'purchases', 'finances'];
                const sectionIndex = parseInt(e.key) - 1;
                if (sections[sectionIndex]) {
                    this.switchSection(sections[sectionIndex]);
                }
            }
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

        // Generate more realistic trending data
        const baseRevenue = 75000;
        const growthRate = 0.05; // 5% monthly growth trend
        const volatility = 0.15; // 15% random variation

        return {
            // Sales Data with realistic trends
            monthlyRevenue: months.map((month, index) => {
                const trend = baseRevenue * Math.pow(1 + growthRate, index);
                const variation = trend * (Math.random() - 0.5) * volatility;
                return Math.floor(trend + variation);
            }),
            quarterlyRevenue: quarters.map((quarter, index) => {
                const trend = 225000 * Math.pow(1 + growthRate * 3, index);
                const variation = trend * (Math.random() - 0.5) * volatility;
                return Math.floor(trend + variation);
            }),
            yearlyRevenue: years.map((year, index) => {
                const trend = 900000 * Math.pow(1 + growthRate * 12, index);
                const variation = trend * (Math.random() - 0.5) * volatility;
                return Math.floor(trend + variation);
            }),
            
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
        const avgRevenue = totalRevenue / 12;
        const profitMargin = ((netProfit / totalRevenue) * 100);

        // Update main KPI values
        document.getElementById('totalRevenue').textContent = this.formatCurrency(totalRevenue);
        document.getElementById('totalPurchases').textContent = this.formatCurrency(totalPurchases);
        document.getElementById('netProfit').textContent = this.formatCurrency(netProfit);
        document.getElementById('cashFlow').textContent = this.formatCurrency(cashFlow);

        // Update change percentages with more realistic data
        document.getElementById('revenueChange').textContent = '+12.5%';
        document.getElementById('purchasesChange').textContent = '+8.3%';
        document.getElementById('profitChange').textContent = '+18.7%';
        document.getElementById('cashFlowChange').textContent = '+15.2%';

        // Update progress bars
        this.updateProgressBar('revenueProgress', (totalRevenue / 1200000) * 100); // Target: $1.2M
        this.updateProgressBar('expensesProgress', (totalPurchases / 600000) * 100); // Budget: $600K
        this.updateProgressBar('profitProgress', (profitMargin / 25) * 100); // Target: 25% margin
        this.updateProgressBar('cashFlowProgress', (cashFlow / 200000) * 100); // Reserve: $200K

        // Update chart metrics
        this.updateChartMetrics(avgRevenue, profitMargin, netProfit);
    }

    updateProgressBar(elementId, percentage) {
        const progressBar = document.getElementById(elementId);
        if (progressBar) {
            const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
            setTimeout(() => {
                progressBar.style.width = `${clampedPercentage}%`;
            }, 500);
        }
    }

    updateChartMetrics(avgRevenue, profitMargin, netProfit) {
        // Update overview chart metrics
        const avgRevenueEl = document.getElementById('avgRevenue');
        const growthRateEl = document.getElementById('growthRate');
        const netMarginEl = document.getElementById('netMargin');
        const ebitdaEl = document.getElementById('ebitda');

        if (avgRevenueEl) avgRevenueEl.textContent = this.formatCurrency(avgRevenue);
        if (growthRateEl) growthRateEl.textContent = '+12.5%';
        if (netMarginEl) netMarginEl.textContent = `${profitMargin.toFixed(1)}%`;
        if (ebitdaEl) ebitdaEl.textContent = this.formatCurrency(netProfit * 1.15); // Approximate EBITDA
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    showChartError(chartId, message) {
        const canvas = document.getElementById(chartId);
        const container = canvas?.closest('.chart-container');
        if (container) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'chart-error';
            errorDiv.innerHTML = `
                <div class="error-content">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>Chart Loading Error</h4>
                    <p>${message}</p>
                    <button onclick="location.reload()" class="retry-btn">Retry</button>
                </div>
            `;
            canvas.style.display = 'none';
            container.appendChild(errorDiv);
        }
    }

    refreshDashboardData() {
        // Show loading state
        this.showLoadingState();

        // Simulate API call delay
        setTimeout(() => {
            try {
                // Generate new mock data
                this.mockData = this.generateMockData();

                // Update KPIs
                this.updateKPIs();

                // Update all active charts with new data
                Object.keys(this.charts).forEach(chartKey => {
                    const chart = this.charts[chartKey];
                    if (chart && chart.data) {
                        this.updateChartData(chartKey, chart);
                    }
                });

                // Hide loading state
                this.hideLoadingState();

                // Show refresh notification
                this.showNotification('Dashboard data refreshed successfully', 'success');
            } catch (error) {
                this.hideLoadingState();
                this.showNotification('Failed to refresh dashboard data', 'error');
                console.error('Error refreshing dashboard:', error);
            }
        }, 1000);
    }

    showLoadingState() {
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.disabled = true;
            refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Refreshing...</span>';
        }
    }

    hideLoadingState() {
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.disabled = false;
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i><span>Refresh</span>';
        }
    }

    updateChartData(chartKey, chart) {
        try {
            switch(chartKey) {
                case 'overview':
                    chart.data.datasets[0].data = this.mockData.monthlyRevenue;
                    chart.data.datasets[1].data = this.mockData.monthlyPurchases;
                    break;
                case 'revenueExpenses':
                    chart.data.datasets[0].data = this.mockData.monthlyRevenue.slice(0, 6);
                    chart.data.datasets[1].data = this.mockData.monthlyExpenses.slice(0, 6);
                    break;
                case 'revenueTrends':
                    chart.data.datasets[0].data = this.mockData.monthlyRevenue;
                    break;
                // Add more chart updates as needed
            }
            chart.update('none'); // Update without animation for smooth refresh
        } catch (error) {
            console.error(`Error updating chart ${chartKey}:`, error);
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification__close">&times;</button>
        `;

        document.body.appendChild(notification);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);

        // Close button handler
        notification.querySelector('.notification__close').addEventListener('click', () => {
            notification.remove();
        });
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
        // Initialize overview charts since overview section is active by default
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
        // Monthly Performance Overview - Executive Dashboard Style
        const overviewCtx = document.getElementById('overviewChart');
        if (overviewCtx && !this.charts.overview) {
            try {
                this.charts.overview = new Chart(overviewCtx, {
                    type: 'line',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [{
                            label: 'Revenue Performance',
                            data: this.mockData.monthlyRevenue,
                            borderColor: '#059669',
                            backgroundColor: 'rgba(5, 150, 105, 0.08)',
                            pointBackgroundColor: '#059669',
                            pointBorderColor: '#ffffff',
                            pointBorderWidth: 3,
                            pointRadius: 6,
                            pointHoverRadius: 8,
                            tension: 0.3,
                            fill: true,
                            borderWidth: 4
                        }, {
                            label: 'Operating Expenses',
                            data: this.mockData.monthlyPurchases,
                            borderColor: '#dc2626',
                            backgroundColor: 'rgba(220, 38, 38, 0.08)',
                            pointBackgroundColor: '#dc2626',
                            pointBorderColor: '#ffffff',
                            pointBorderWidth: 3,
                            pointRadius: 6,
                            pointHoverRadius: 8,
                            tension: 0.3,
                            fill: true,
                            borderWidth: 4
                        }]
                    },
                    options: {
                        ...this.getDefaultChartOptions(),
                        plugins: {
                            ...this.getDefaultChartOptions().plugins,
                            title: {
                                display: false
                            },
                            legend: {
                                ...this.getDefaultChartOptions().plugins.legend,
                                position: 'top',
                                align: 'start',
                                labels: {
                                    ...this.getDefaultChartOptions().plugins.legend.labels,
                                    generateLabels: function(chart) {
                                        const original = Chart.defaults.plugins.legend.labels.generateLabels;
                                        const labels = original.call(this, chart);

                                        labels.forEach((label, index) => {
                                            const dataset = chart.data.datasets[index];
                                            const total = dataset.data.reduce((sum, val) => sum + val, 0);
                                            const avg = total / dataset.data.length;
                                            label.text += ` (Avg: ${new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                                notation: 'compact',
                                                maximumFractionDigits: 1
                                            }).format(avg)})`;
                                        });

                                        return labels;
                                    }
                                }
                            }
                        }
                    }
                });
            } catch (error) {
                console.error('Error initializing overview chart:', error);
            }
        }

        // Revenue vs Expenses - Executive Summary
        const revenueExpensesCtx = document.getElementById('revenueExpensesChart');
        if (revenueExpensesCtx && !this.charts.revenueExpenses) {
            try {
                this.charts.revenueExpenses = new Chart(revenueExpensesCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [{
                            label: 'Revenue',
                            data: this.mockData.monthlyRevenue.slice(0, 6),
                            backgroundColor: '#059669',
                            borderRadius: 8,
                            borderSkipped: false,
                            borderWidth: 0
                        }, {
                            label: 'Expenses',
                            data: this.mockData.monthlyExpenses.slice(0, 6),
                            backgroundColor: '#dc2626',
                            borderRadius: 8,
                            borderSkipped: false,
                            borderWidth: 0
                        }, {
                            label: 'Net Profit',
                            data: this.mockData.monthlyRevenue.slice(0, 6).map((rev, i) =>
                                rev - this.mockData.monthlyExpenses.slice(0, 6)[i]
                            ),
                            backgroundColor: '#1d4ed8',
                            borderRadius: 8,
                            borderSkipped: false,
                            borderWidth: 0
                        }]
                    },
                    options: {
                        ...this.getDefaultChartOptions(),
                        plugins: {
                            ...this.getDefaultChartOptions().plugins,
                            legend: {
                                ...this.getDefaultChartOptions().plugins.legend,
                                labels: {
                                    ...this.getDefaultChartOptions().plugins.legend.labels,
                                    generateLabels: function(chart) {
                                        const original = Chart.defaults.plugins.legend.labels.generateLabels;
                                        const labels = original.call(this, chart);

                                        labels.forEach((label, index) => {
                                            const dataset = chart.data.datasets[index];
                                            const total = dataset.data.reduce((sum, val) => sum + val, 0);
                                            label.text += ` (${new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                                notation: 'compact',
                                                maximumFractionDigits: 1
                                            }).format(total)})`;
                                        });

                                        return labels;
                                    }
                                }
                            }
                        },
                        scales: {
                            ...this.getDefaultChartOptions().scales,
                            y: {
                                ...this.getDefaultChartOptions().scales.y,
                                stacked: false
                            },
                            x: {
                                ...this.getDefaultChartOptions().scales.x,
                                stacked: false
                            }
                        }
                    }
                });
            } catch (error) {
                console.error('Error initializing revenue expenses chart:', error);
            }
        }
    }

    getDefaultChartOptions() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'start',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 25,
                        font: {
                            size: 16,
                            weight: '600',
                            family: 'Inter'
                        },
                        color: '#1e293b',
                        boxWidth: 12,
                        boxHeight: 12
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(15, 23, 42, 0.96)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#475569',
                    borderWidth: 2,
                    cornerRadius: 12,
                    displayColors: true,
                    titleFont: {
                        size: 16,
                        weight: '700',
                        family: 'Inter'
                    },
                    bodyFont: {
                        size: 14,
                        weight: '600',
                        family: 'Inter'
                    },
                    padding: 16,
                    caretSize: 8,
                    caretPadding: 12,
                    callbacks: {
                        title: function(context) {
                            return context[0].label || '';
                        },
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(context.parsed.y);
                            }
                            return label;
                        },
                        afterLabel: function(context) {
                            // Add percentage change if available
                            const dataset = context.dataset;
                            if (dataset.percentageChange && dataset.percentageChange[context.dataIndex]) {
                                const change = dataset.percentageChange[context.dataIndex];
                                const arrow = change >= 0 ? '↗' : '↘';
                                const color = change >= 0 ? '#10b981' : '#ef4444';
                                return `${arrow} ${Math.abs(change).toFixed(1)}% vs last period`;
                            }
                            return '';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#e2e8f0',
                        lineWidth: 1,
                        drawBorder: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        color: '#475569',
                        font: {
                            size: 14,
                            weight: '600',
                            family: 'Inter'
                        },
                        padding: 12,
                        callback: function(value) {
                            return new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                notation: 'compact',
                                maximumFractionDigits: 1
                            }).format(value);
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        color: '#475569',
                        font: {
                            size: 14,
                            weight: '600',
                            family: 'Inter'
                        },
                        padding: 8
                    }
                }
            },
            elements: {
                point: {
                    radius: 6,
                    hoverRadius: 8,
                    borderWidth: 3,
                    backgroundColor: '#ffffff'
                },
                line: {
                    borderWidth: 4,
                    tension: 0.3
                },
                bar: {
                    borderRadius: 6,
                    borderSkipped: false,
                    borderWidth: 0
                }
            },
            animation: {
                duration: 1200,
                easing: 'easeInOutCubic'
            },
            hover: {
                animationDuration: 300
            }
        };
    }

    initializeSalesCharts() {
        // Revenue Growth Trajectory Chart - Executive Dashboard
        const revenueTrendsCtx = document.getElementById('revenueTrendsChart');
        if (revenueTrendsCtx && !this.charts.revenueTrends) {
            try {
                this.charts.revenueTrends = new Chart(revenueTrendsCtx, {
                    type: 'line',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [{
                            label: 'Actual Revenue',
                            data: this.mockData.monthlyRevenue,
                            borderColor: '#1d4ed8',
                            backgroundColor: 'rgba(29, 78, 216, 0.1)',
                            tension: 0.3,
                            fill: true,
                            pointBackgroundColor: '#1d4ed8',
                            pointBorderColor: '#ffffff',
                            pointBorderWidth: 3,
                            pointRadius: 7,
                            pointHoverRadius: 9,
                            borderWidth: 4
                        }, {
                            label: 'Target Revenue',
                            data: this.mockData.monthlyRevenue.map(val => val * 1.15), // 15% higher target
                            borderColor: '#059669',
                            backgroundColor: 'transparent',
                            tension: 0.3,
                            fill: false,
                            pointBackgroundColor: '#059669',
                            pointBorderColor: '#ffffff',
                            pointBorderWidth: 3,
                            pointRadius: 5,
                            pointHoverRadius: 7,
                            borderWidth: 3,
                            borderDash: [10, 5]
                        }]
                    },
                    options: {
                        ...this.getDefaultChartOptions(),
                        plugins: {
                            ...this.getDefaultChartOptions().plugins,
                            legend: {
                                ...this.getDefaultChartOptions().plugins.legend,
                                labels: {
                                    ...this.getDefaultChartOptions().plugins.legend.labels,
                                    generateLabels: function(chart) {
                                        const original = Chart.defaults.plugins.legend.labels.generateLabels;
                                        const labels = original.call(this, chart);

                                        labels.forEach((label, index) => {
                                            const dataset = chart.data.datasets[index];
                                            const total = dataset.data.reduce((sum, val) => sum + val, 0);
                                            const avg = total / dataset.data.length;
                                            label.text += ` (Avg: ${new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                                notation: 'compact',
                                                maximumFractionDigits: 1
                                            }).format(avg)})`;
                                        });

                                        return labels;
                                    }
                                }
                            }
                        },
                        scales: {
                            ...this.getDefaultChartOptions().scales,
                            y: {
                                ...this.getDefaultChartOptions().scales.y,
                                ticks: {
                                    ...this.getDefaultChartOptions().scales.y.ticks,
                                    callback: function(value) {
                                        return new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                            notation: 'compact',
                                            maximumFractionDigits: 1
                                        }).format(value);
                                    }
                                }
                            }
                        }
                    }
                });
            } catch (error) {
                console.error('Error initializing revenue trends chart:', error);
                this.showChartError('revenueTrendsChart', 'Failed to load revenue trends chart');
            }
        }

        // Market Segment Distribution Chart - Executive Style
        const salesByCategoryCtx = document.getElementById('salesByCategoryChart');
        if (salesByCategoryCtx && !this.charts.salesByCategory) {
            try {
                this.charts.salesByCategory = new Chart(salesByCategoryCtx, {
                    type: 'doughnut',
                    data: {
                        labels: this.mockData.salesByCategory.labels,
                        datasets: [{
                            data: this.mockData.salesByCategory.data,
                            backgroundColor: [
                                '#1d4ed8', // Electronics - Primary Blue
                                '#059669', // Clothing - Success Green
                                '#dc2626', // Home & Garden - Danger Red
                                '#7c3aed', // Sports - Purple
                                '#0891b2', // Books - Cyan
                                '#ea580c'  // Automotive - Orange
                            ],
                            borderWidth: 4,
                            borderColor: '#ffffff',
                            hoverBorderWidth: 6,
                            hoverOffset: 8
                        }]
                    },
                    options: {
                        ...this.getDefaultChartOptions(),
                        cutout: '60%',
                        plugins: {
                            ...this.getDefaultChartOptions().plugins,
                            legend: {
                                ...this.getDefaultChartOptions().plugins.legend,
                                position: 'right',
                                labels: {
                                    ...this.getDefaultChartOptions().plugins.legend.labels,
                                    generateLabels: function(chart) {
                                        const original = Chart.defaults.plugins.legend.labels.generateLabels;
                                        const labels = original.call(this, chart);

                                        labels.forEach((label, index) => {
                                            const value = chart.data.datasets[0].data[index];
                                            label.text += ` (${value}%)`;
                                        });

                                        return labels;
                                    },
                                    padding: 20,
                                    usePointStyle: true,
                                    pointStyle: 'circle'
                                }
                            },
                            tooltip: {
                                ...this.getDefaultChartOptions().plugins.tooltip,
                                callbacks: {
                                    title: function(context) {
                                        return 'Market Segment Analysis';
                                    },
                                    label: function(context) {
                                        const label = context.label || '';
                                        const value = context.parsed;
                                        const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                                        const percentage = ((value / total) * 100).toFixed(1);
                                        return `${label}: ${value}% of total revenue`;
                                    },
                                    afterLabel: function(context) {
                                        const value = context.parsed;
                                        const estimatedRevenue = (value / 100) * 1000000; // Assuming $1M total
                                        return `Est. Revenue: ${new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                            notation: 'compact',
                                            maximumFractionDigits: 1
                                        }).format(estimatedRevenue)}`;
                                    }
                                }
                            }
                        }
                    }
                });
            } catch (error) {
                console.error('Error initializing sales by category chart:', error);
                this.showChartError('salesByCategoryChart', 'Failed to load sales category chart');
            }
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
