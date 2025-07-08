// Executive Business Intelligence Dashboard
class ExecutiveBIDashboard {
    constructor() {
        this.charts = {};
        this.data = this.generateExecutiveData();
        this.presentationMode = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDateTime();
        this.initializeCharts();
        this.updateKPIs();
        this.setupAlerts();
        
        // Update time every minute
        setInterval(() => this.updateDateTime(), 60000);
        
        // Refresh data every 5 minutes
        setInterval(() => this.refreshData(), 300000);
    }

    setupEventListeners() {
        // Navigation tabs
        document.querySelectorAll('.exec-nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const section = e.target.closest('.exec-nav-tab').dataset.section;
                this.switchSection(section);
            });
        });

        // Presentation mode toggle
        document.getElementById('execPresentationMode')?.addEventListener('click', () => {
            this.togglePresentationMode();
        });

        // Refresh button
        document.getElementById('execRefresh')?.addEventListener('click', () => {
            this.refreshData();
        });

        // Alert close buttons
        document.querySelectorAll('.exec-alert-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.exec-alert').style.display = 'none';
                this.updateAlertCount();
            });
        });

        // Time range selector
        document.getElementById('execTimeRange')?.addEventListener('change', (e) => {
            this.updateTimeRange(e.target.value);
        });
    }

    generateExecutiveData() {
        return {
            // Financial KPIs
            totalRevenue: 12500000,
            netMargin: 18.7,
            cashFlow: 8200000,
            marketShare: 23.8,
            
            // Performance Metrics
            revenueGrowth: 12.5,
            marginImprovement: 2.3,
            cashFlowChange: -5.8,
            marketShareGrowth: 1.2,
            
            // Targets
            revenueTarget: 150000000,
            marginTarget: 20,
            cashFlowMinimum: 5000000,
            marketShareGoal: 25,
            
            // Time series data
            monthlyRevenue: [
                { month: 'Jan', revenue: 10200000, profit: 1900000, forecast: 10500000 },
                { month: 'Feb', revenue: 10800000, profit: 2100000, forecast: 11000000 },
                { month: 'Mar', revenue: 11200000, profit: 2200000, forecast: 11300000 },
                { month: 'Apr', revenue: 11800000, profit: 2350000, forecast: 11800000 },
                { month: 'May', revenue: 12100000, profit: 2400000, forecast: 12200000 },
                { month: 'Jun', revenue: 12500000, profit: 2500000, forecast: 12600000 },
                { month: 'Jul', revenue: 12800000, profit: 2600000, forecast: 13000000 },
                { month: 'Aug', revenue: 13200000, profit: 2700000, forecast: 13400000 },
                { month: 'Sep', revenue: 13500000, profit: 2800000, forecast: 13800000 },
                { month: 'Oct', revenue: 13800000, profit: 2900000, forecast: 14200000 },
                { month: 'Nov', revenue: 14200000, profit: 3000000, forecast: 14600000 },
                { month: 'Dec', revenue: 14500000, profit: 3100000, forecast: 15000000 }
            ],
            
            // KPI Scorecard
            kpiScorecard: {
                labels: ['Revenue Growth', 'Profit Margin', 'Market Share', 'Customer Satisfaction', 'Operational Efficiency', 'Innovation Index'],
                current: [87, 93, 95, 89, 91, 85],
                target: [90, 95, 100, 95, 95, 90],
                benchmark: [80, 85, 85, 85, 85, 80]
            }
        };
    }

    updateDateTime() {
        const now = new Date();
        const timeString = now.toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        
        const timeElement = document.getElementById('execCurrentTime');
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }

    updateKPIs() {
        // Update main KPI values
        const revenueEl = document.getElementById('execTotalRevenue');
        const marginEl = document.getElementById('execNetMargin');
        const cashFlowEl = document.getElementById('execCashFlow');
        const marketShareEl = document.getElementById('execMarketShare');

        if (revenueEl) revenueEl.textContent = this.formatCurrency(this.data.totalRevenue);
        if (marginEl) marginEl.textContent = `${this.data.netMargin}%`;
        if (cashFlowEl) cashFlowEl.textContent = this.formatCurrency(this.data.cashFlow);
        if (marketShareEl) marketShareEl.textContent = `${this.data.marketShare}%`;

        // Update progress bars with animation
        this.animateProgressBar('.exec-kpi-card:nth-child(1) .exec-progress-fill', 
            (this.data.totalRevenue / this.data.revenueTarget) * 100);
        this.animateProgressBar('.exec-kpi-card:nth-child(2) .exec-progress-fill', 
            (this.data.netMargin / this.data.marginTarget) * 100);
        this.animateProgressBar('.exec-kpi-card:nth-child(3) .exec-progress-fill', 
            (this.data.cashFlow / this.data.cashFlowMinimum) * 100);
        this.animateProgressBar('.exec-kpi-card:nth-child(4) .exec-progress-fill', 
            (this.data.marketShare / this.data.marketShareGoal) * 100);
    }

    animateProgressBar(selector, percentage) {
        const progressBar = document.querySelector(selector);
        if (progressBar) {
            setTimeout(() => {
                progressBar.style.width = `${Math.min(percentage, 100)}%`;
            }, 500);
        }
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
            maximumFractionDigits: 1
        }).format(amount);
    }

    initializeCharts() {
        this.initializeRevenueProfitChart();
        this.initializeKPIScorecardChart();
    }

    initializeRevenueProfitChart() {
        const ctx = document.getElementById('execRevenueProfitChart');
        if (!ctx) return;

        this.charts.revenueProfit = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.data.monthlyRevenue.map(d => d.month),
                datasets: [{
                    label: 'Actual Revenue',
                    data: this.data.monthlyRevenue.map(d => d.revenue),
                    borderColor: '#1e40af',
                    backgroundColor: 'rgba(30, 64, 175, 0.1)',
                    borderWidth: 4,
                    pointRadius: 6,
                    pointBackgroundColor: '#1e40af',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 3,
                    tension: 0.3,
                    fill: true
                }, {
                    label: 'Forecast',
                    data: this.data.monthlyRevenue.map(d => d.forecast),
                    borderColor: '#059669',
                    backgroundColor: 'transparent',
                    borderWidth: 3,
                    pointRadius: 4,
                    pointBackgroundColor: '#059669',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    tension: 0.3,
                    borderDash: [10, 5]
                }, {
                    label: 'Profit',
                    data: this.data.monthlyRevenue.map(d => d.profit),
                    borderColor: '#dc2626',
                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: '#dc2626',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    tension: 0.3,
                    fill: true,
                    yAxisID: 'y1'
                }]
            },
            options: this.getExecutiveChartOptions()
        });
    }

    initializeKPIScorecardChart() {
        const ctx = document.getElementById('execKPIScorecardChart');
        if (!ctx) return;

        this.charts.kpiScorecard = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: this.data.kpiScorecard.labels,
                datasets: [{
                    label: 'Current Performance',
                    data: this.data.kpiScorecard.current,
                    borderColor: '#1e40af',
                    backgroundColor: 'rgba(30, 64, 175, 0.2)',
                    borderWidth: 3,
                    pointRadius: 6,
                    pointBackgroundColor: '#1e40af',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 3
                }, {
                    label: 'Target',
                    data: this.data.kpiScorecard.target,
                    borderColor: '#059669',
                    backgroundColor: 'rgba(5, 150, 105, 0.1)',
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: '#059669',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    borderDash: [5, 5]
                }, {
                    label: 'Industry Benchmark',
                    data: this.data.kpiScorecard.benchmark,
                    borderColor: '#64748b',
                    backgroundColor: 'rgba(100, 116, 139, 0.1)',
                    borderWidth: 2,
                    pointRadius: 3,
                    pointBackgroundColor: '#64748b',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    borderDash: [2, 2]
                }]
            },
            options: this.getExecutiveRadarOptions()
        });
    }

    getExecutiveChartOptions() {
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
                        color: '#0f172a'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#475569',
                    borderWidth: 2,
                    cornerRadius: 12,
                    titleFont: {
                        size: 16,
                        weight: '700'
                    },
                    bodyFont: {
                        size: 14,
                        weight: '600'
                    },
                    padding: 16,
                    callbacks: {
                        label: (context) => {
                            const label = context.dataset.label || '';
                            const value = this.formatCurrency(context.parsed.y);
                            return `${label}: ${value}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#e2e8f0',
                        lineWidth: 1
                    },
                    ticks: {
                        color: '#475569',
                        font: {
                            size: 14,
                            weight: '600'
                        },
                        callback: (value) => this.formatCurrency(value)
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                    },
                    ticks: {
                        color: '#475569',
                        font: {
                            size: 14,
                            weight: '600'
                        },
                        callback: (value) => this.formatCurrency(value)
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#475569',
                        font: {
                            size: 14,
                            weight: '600'
                        }
                    }
                }
            }
        };
    }

    getExecutiveRadarOptions() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 14,
                            weight: '600'
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: '#e2e8f0'
                    },
                    pointLabels: {
                        color: '#334155',
                        font: {
                            size: 13,
                            weight: '600'
                        }
                    },
                    ticks: {
                        color: '#64748b',
                        backdropColor: 'transparent',
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    }
                }
            }
        };
    }

    switchSection(sectionName) {
        // Update active tab
        document.querySelectorAll('.exec-nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update active section
        document.querySelectorAll('.exec-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');
    }

    setupAlerts() {
        this.updateAlertCount();
    }

    updateAlertCount() {
        const visibleAlerts = document.querySelectorAll('.exec-alert:not([style*="display: none"])').length;
        const alertCountEl = document.querySelector('.alert-count');
        if (alertCountEl) {
            alertCountEl.textContent = visibleAlerts;
            alertCountEl.style.display = visibleAlerts > 0 ? 'block' : 'none';
        }
    }

    togglePresentationMode() {
        this.presentationMode = !this.presentationMode;
        document.body.classList.toggle('presentation-mode', this.presentationMode);
        
        const btn = document.getElementById('execPresentationMode');
        if (btn) {
            btn.innerHTML = this.presentationMode 
                ? '<i class="fas fa-compress"></i> Exit Presentation'
                : '<i class="fas fa-expand"></i> Presentation Mode';
        }
    }

    refreshData() {
        // Simulate data refresh
        this.data = this.generateExecutiveData();
        this.updateKPIs();
        
        // Update charts
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.update('none');
        });
        
        // Show refresh notification
        this.showNotification('Dashboard data refreshed successfully', 'success');
    }

    updateTimeRange(range) {
        // Update charts based on time range
        console.log('Time range updated to:', range);
    }

    showNotification(message, type = 'info') {
        // Create and show notification
        const notification = document.createElement('div');
        notification.className = `exec-notification exec-notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize Executive Dashboard
document.addEventListener('DOMContentLoaded', function() {
    window.executiveBIDashboard = new ExecutiveBIDashboard();
});
