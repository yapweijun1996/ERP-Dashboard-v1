// Executive Dashboard - C-Suite Optimized Charts and KPIs
class ExecutiveDashboard {
    constructor() {
        this.charts = {};
        this.kpis = {};
        this.alerts = [];
        this.executiveData = this.generateExecutiveData();
        this.presentationMode = false;
        this.init();
    }

    init() {
        this.setupExecutiveEventListeners();
        this.updateExecutiveDateTime();
        this.calculateExecutiveKPIs();
        this.checkBusinessAlerts();
        this.updateExecutiveKPIs();
        this.displayExecutiveAlerts();

        // Initialize with overview charts only
        setTimeout(() => {
            this.initializeRevenueProfitChart();
            this.initializeCashFlowChart();
        }, 1000);

        // Update every 5 minutes for real-time executive view
        setInterval(() => {
            this.updateExecutiveDateTime();
            this.refreshExecutiveData();
        }, 300000);
    }

    generateExecutiveData() {
        const currentYear = new Date().getFullYear();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        return {
            // Executive Financial Metrics
            revenue: {
                current: 12500000,      // $12.5M current month
                previous: 11800000,     // $11.8M previous month
                ytd: 142000000,         // $142M year-to-date
                target: 150000000,      // $150M annual target
                monthly: months.map(() => Math.floor(Math.random() * 5000000) + 8000000)
            },
            
            profit: {
                current: 2100000,       // $2.1M current month
                previous: 1950000,      // $1.95M previous month
                ytd: 24500000,          // $24.5M year-to-date
                target: 30000000,       // $30M annual target
                margin: 16.8,           // 16.8% profit margin
                monthly: months.map(() => Math.floor(Math.random() * 1000000) + 1500000)
            },
            
            cashFlow: {
                current: 8500000,       // $8.5M current
                previous: 7200000,      // $7.2M previous
                projected: 9200000,     // $9.2M projected next month
                runway: 18,             // 18 months runway
                monthly: months.map(() => Math.floor(Math.random() * 3000000) + 5000000)
            },
            
            operations: {
                efficiency: 94.2,       // 94.2% operational efficiency
                customerSat: 4.7,       // 4.7/5 customer satisfaction
                employeeRet: 92.5,      // 92.5% employee retention
                marketShare: 23.8       // 23.8% market share
            },
            
            // Risk Indicators
            risks: [
                { type: 'financial', level: 'low', description: 'Cash flow stable' },
                { type: 'operational', level: 'medium', description: 'Supply chain delays' },
                { type: 'market', level: 'low', description: 'Competitive position strong' }
            ],
            
            // Key Business Drivers
            drivers: {
                newCustomers: 1250,     // New customers this month
                customerChurn: 2.3,     // 2.3% churn rate
                avgDealSize: 45000,     // $45K average deal size
                salesCycle: 32          // 32 days average sales cycle
            }
        };
    }

    calculateExecutiveKPIs() {
        const data = this.executiveData;
        
        // Revenue Growth
        const revenueGrowth = ((data.revenue.current - data.revenue.previous) / data.revenue.previous * 100);
        this.kpis.revenueGrowth = {
            value: revenueGrowth,
            trend: revenueGrowth > 0 ? 'positive' : 'negative',
            status: revenueGrowth > 5 ? 'excellent' : revenueGrowth > 0 ? 'good' : 'concern'
        };
        
        // Profit Margin Trend
        const profitGrowth = ((data.profit.current - data.profit.previous) / data.profit.previous * 100);
        this.kpis.profitGrowth = {
            value: profitGrowth,
            trend: profitGrowth > 0 ? 'positive' : 'negative',
            status: profitGrowth > 3 ? 'excellent' : profitGrowth > 0 ? 'good' : 'concern'
        };
        
        // Cash Flow Health
        const cashFlowGrowth = ((data.cashFlow.current - data.cashFlow.previous) / data.cashFlow.previous * 100);
        this.kpis.cashFlowHealth = {
            value: cashFlowGrowth,
            trend: cashFlowGrowth > 0 ? 'positive' : 'negative',
            status: data.cashFlow.runway > 12 ? 'excellent' : data.cashFlow.runway > 6 ? 'good' : 'critical'
        };
        
        // Target Achievement
        const targetAchievement = (data.revenue.ytd / data.revenue.target * 100);
        this.kpis.targetProgress = {
            value: targetAchievement,
            trend: targetAchievement > 80 ? 'positive' : 'neutral',
            status: targetAchievement > 90 ? 'excellent' : targetAchievement > 75 ? 'good' : 'concern'
        };
    }

    checkBusinessAlerts() {
        this.alerts = [];
        const data = this.executiveData;
        
        // Revenue Alert
        if (this.kpis.revenueGrowth.value < 0) {
            this.alerts.push({
                type: 'critical',
                title: 'Revenue Decline',
                message: `Revenue decreased by ${Math.abs(this.kpis.revenueGrowth.value).toFixed(1)}% from last month`,
                action: 'Review sales pipeline and market conditions'
            });
        }
        
        // Cash Flow Alert
        if (data.cashFlow.runway < 12) {
            this.alerts.push({
                type: 'warning',
                title: 'Cash Flow Attention',
                message: `Current runway: ${data.cashFlow.runway} months`,
                action: 'Consider cash flow optimization strategies'
            });
        }
        
        // Target Achievement Alert
        if (this.kpis.targetProgress.value < 75) {
            this.alerts.push({
                type: 'warning',
                title: 'Target Achievement Risk',
                message: `Currently at ${this.kpis.targetProgress.value.toFixed(1)}% of annual target`,
                action: 'Accelerate sales and marketing initiatives'
            });
        }
        
        // Operational Excellence
        if (data.operations.efficiency < 90) {
            this.alerts.push({
                type: 'warning',
                title: 'Operational Efficiency',
                message: `Efficiency at ${data.operations.efficiency}%, below target`,
                action: 'Review operational processes and bottlenecks'
            });
        }
    }

    updateExecutiveKPIs() {
        const data = this.executiveData;
        
        // Update Revenue KPI
        document.getElementById('exec-revenue-value').textContent = this.formatCurrency(data.revenue.current);
        document.getElementById('exec-revenue-change').textContent = 
            `${this.kpis.revenueGrowth.value > 0 ? '+' : ''}${this.kpis.revenueGrowth.value.toFixed(1)}%`;
        document.getElementById('exec-revenue-change').className = 
            `exec-kpi-change ${this.kpis.revenueGrowth.trend}`;
        document.getElementById('exec-revenue-trend').textContent = 
            `vs. ${this.formatCurrency(data.revenue.previous)} last month`;
        
        // Update Profit KPI
        document.getElementById('exec-profit-value').textContent = this.formatCurrency(data.profit.current);
        document.getElementById('exec-profit-change').textContent = 
            `${this.kpis.profitGrowth.value > 0 ? '+' : ''}${this.kpis.profitGrowth.value.toFixed(1)}%`;
        document.getElementById('exec-profit-change').className = 
            `exec-kpi-change ${this.kpis.profitGrowth.trend}`;
        document.getElementById('exec-profit-trend').textContent = 
            `${data.profit.margin}% margin`;
        
        // Update Cash Flow KPI
        document.getElementById('exec-cashflow-value').textContent = this.formatCurrency(data.cashFlow.current);
        document.getElementById('exec-cashflow-change').textContent = 
            `${this.kpis.cashFlowHealth.value > 0 ? '+' : ''}${this.kpis.cashFlowHealth.value.toFixed(1)}%`;
        document.getElementById('exec-cashflow-change').className = 
            `exec-kpi-change ${this.kpis.cashFlowHealth.trend}`;
        document.getElementById('exec-cashflow-trend').textContent = 
            `${data.cashFlow.runway} months runway`;
        
        // Update Target Progress KPI
        document.getElementById('exec-target-value').textContent = 
            `${this.kpis.targetProgress.value.toFixed(1)}%`;
        document.getElementById('exec-target-change').textContent = 
            `${this.formatCurrency(data.revenue.ytd)} YTD`;
        document.getElementById('exec-target-change').className = 
            `exec-kpi-change ${this.kpis.targetProgress.trend}`;
        document.getElementById('exec-target-trend').textContent = 
            `Target: ${this.formatCurrency(data.revenue.target)}`;
    }

    displayExecutiveAlerts() {
        const alertContainer = document.getElementById('exec-alerts');
        if (!alertContainer) return;
        
        alertContainer.innerHTML = '';
        
        this.alerts.forEach(alert => {
            const alertElement = document.createElement('div');
            alertElement.className = `exec-alert ${alert.type}`;
            alertElement.innerHTML = `
                <div class="exec-alert-icon">
                    <i class="fas ${alert.type === 'critical' ? 'fa-exclamation-triangle' : 
                                   alert.type === 'warning' ? 'fa-exclamation-circle' : 
                                   'fa-info-circle'}"></i>
                </div>
                <div class="exec-alert-content">
                    <h4>${alert.title}</h4>
                    <p>${alert.message}</p>
                    <small><strong>Recommended Action:</strong> ${alert.action}</small>
                </div>
            `;
            alertContainer.appendChild(alertElement);
        });
    }

    getExecutiveChartOptions() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 24,
                        font: {
                            size: this.presentationMode ? 16 : 14,
                            weight: '500'
                        },
                        color: '#1a202c'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 32, 44, 0.95)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    titleFont: {
                        size: this.presentationMode ? 16 : 14,
                        weight: '600'
                    },
                    bodyFont: {
                        size: this.presentationMode ? 14 : 12,
                        weight: '500'
                    },
                    padding: 16,
                    callbacks: {
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
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f1f5f9',
                        lineWidth: 1
                    },
                    ticks: {
                        color: '#4a5568',
                        font: {
                            size: this.presentationMode ? 14 : 12,
                            weight: '500'
                        },
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
                    ticks: {
                        color: '#4a5568',
                        font: {
                            size: this.presentationMode ? 14 : 12,
                            weight: '500'
                        }
                    }
                }
            },
            elements: {
                point: {
                    radius: this.presentationMode ? 6 : 4,
                    hoverRadius: this.presentationMode ? 8 : 6,
                    borderWidth: 2
                },
                line: {
                    borderWidth: this.presentationMode ? 4 : 3,
                    tension: 0.4
                },
                bar: {
                    borderRadius: 4,
                    borderSkipped: false
                }
            }
        };
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    formatPercentage(value, decimals = 1) {
        return `${value.toFixed(decimals)}%`;
    }

    setupExecutiveEventListeners() {
        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const section = e.target.closest('.nav-tab').dataset.section;
                this.switchExecutiveSection(section);
            });
        });

        // Presentation mode toggle
        document.getElementById('exec-presentation-toggle')?.addEventListener('click', () => {
            this.togglePresentationMode();
        });

        // Export functionality
        document.getElementById('exec-export-btn')?.addEventListener('click', () => {
            this.exportExecutiveSummary();
        });

        // Refresh data
        document.getElementById('exec-refresh-btn')?.addEventListener('click', () => {
            this.refreshExecutiveData();
        });

        // Timeframe selector
        document.getElementById('exec-timeframe')?.addEventListener('change', (e) => {
            this.updateTimeframe(e.target.value);
        });

        // KPI card interactions for drill-down
        document.querySelectorAll('.exec-kpi-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.handleKPIDrillDown(e.currentTarget);
            });
        });
    }

    switchExecutiveSection(sectionName) {
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

    initializeSectionCharts(section) {
        switch(section) {
            case 'executive-overview':
                if (!this.charts.revenueProfitChart) this.initializeRevenueProfitChart();
                if (!this.charts.cashFlowChart) this.initializeCashFlowChart();
                break;
            case 'financial-performance':
                if (!this.charts.pnlChart && typeof this.initializePnLChart === 'function') {
                    this.initializePnLChart();
                }
                if (!this.charts.ratiosChart && typeof this.initializeRatiosChart === 'function') {
                    this.initializeRatiosChart();
                }
                break;
            case 'operational-metrics':
                if (!this.charts.customerChart && typeof this.initializeCustomerChart === 'function') {
                    this.initializeCustomerChart();
                }
                if (!this.charts.operationsChart && typeof this.initializeOperationsChart === 'function') {
                    this.initializeOperationsChart();
                }
                break;
            case 'strategic-insights':
                if (!this.charts.marketChart && typeof this.initializeMarketChart === 'function') {
                    this.initializeMarketChart();
                }
                if (!this.charts.growthChart && typeof this.initializeGrowthChart === 'function') {
                    this.initializeGrowthChart();
                }
                break;
        }
    }

    handleKPIDrillDown(cardElement) {
        // Add visual feedback
        cardElement.style.transform = 'scale(0.98)';
        setTimeout(() => {
            cardElement.style.transform = '';
        }, 150);

        // Determine which KPI was clicked and show detailed view
        const title = cardElement.querySelector('.exec-kpi-title').textContent;
        this.showKPIDetails(title);
    }

    showKPIDetails(kpiTitle) {
        // Create modal or detailed view for KPI drill-down
        const modal = document.createElement('div');
        modal.className = 'exec-kpi-modal';
        modal.innerHTML = `
            <div class="exec-kpi-modal-content">
                <div class="exec-kpi-modal-header">
                    <h3>${kpiTitle} - Detailed Analysis</h3>
                    <button class="exec-kpi-modal-close">&times;</button>
                </div>
                <div class="exec-kpi-modal-body">
                    ${this.generateKPIDetails(kpiTitle)}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        modal.querySelector('.exec-kpi-modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    generateKPIDetails(kpiTitle) {
        const data = this.executiveData;

        switch(kpiTitle) {
            case 'Monthly Revenue':
                return `
                    <div class="exec-kpi-detail-grid">
                        <div class="exec-kpi-detail-item">
                            <h4>Current Month</h4>
                            <p class="exec-kpi-detail-value">${this.formatCurrency(data.revenue.current)}</p>
                        </div>
                        <div class="exec-kpi-detail-item">
                            <h4>Previous Month</h4>
                            <p class="exec-kpi-detail-value">${this.formatCurrency(data.revenue.previous)}</p>
                        </div>
                        <div class="exec-kpi-detail-item">
                            <h4>Year-to-Date</h4>
                            <p class="exec-kpi-detail-value">${this.formatCurrency(data.revenue.ytd)}</p>
                        </div>
                        <div class="exec-kpi-detail-item">
                            <h4>Annual Target</h4>
                            <p class="exec-kpi-detail-value">${this.formatCurrency(data.revenue.target)}</p>
                        </div>
                    </div>
                    <div class="exec-kpi-insights">
                        <h4>Key Insights:</h4>
                        <ul>
                            <li>Revenue growth of ${this.kpis.revenueGrowth.value.toFixed(1)}% month-over-month</li>
                            <li>Currently at ${this.kpis.targetProgress.value.toFixed(1)}% of annual target</li>
                            <li>Strong performance in enterprise segment driving growth</li>
                        </ul>
                    </div>
                `;
            case 'Net Profit':
                return `
                    <div class="exec-kpi-detail-grid">
                        <div class="exec-kpi-detail-item">
                            <h4>Current Profit</h4>
                            <p class="exec-kpi-detail-value">${this.formatCurrency(data.profit.current)}</p>
                        </div>
                        <div class="exec-kpi-detail-item">
                            <h4>Profit Margin</h4>
                            <p class="exec-kpi-detail-value">${data.profit.margin}%</p>
                        </div>
                        <div class="exec-kpi-detail-item">
                            <h4>YTD Profit</h4>
                            <p class="exec-kpi-detail-value">${this.formatCurrency(data.profit.ytd)}</p>
                        </div>
                        <div class="exec-kpi-detail-item">
                            <h4>Target Profit</h4>
                            <p class="exec-kpi-detail-value">${this.formatCurrency(data.profit.target)}</p>
                        </div>
                    </div>
                    <div class="exec-kpi-insights">
                        <h4>Key Insights:</h4>
                        <ul>
                            <li>Profit margin improved by 1.2% from operational efficiency gains</li>
                            <li>Cost optimization initiatives showing positive results</li>
                            <li>On track to exceed annual profit target by 8%</li>
                        </ul>
                    </div>
                `;
            default:
                return '<p>Detailed analysis not available for this metric.</p>';
        }
    }

    togglePresentationMode() {
        this.presentationMode = !this.presentationMode;
        document.body.classList.toggle('exec-presentation-mode', this.presentationMode);
        
        // Reinitialize charts with new sizing
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.destroy();
            }
        });
        this.charts = {};
        this.initializeExecutiveCharts();
    }

    refreshExecutiveData() {
        this.executiveData = this.generateExecutiveData();
        this.calculateExecutiveKPIs();
        this.checkBusinessAlerts();
        this.updateExecutiveKPIs();
        this.displayExecutiveAlerts();
        
        // Refresh charts
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.update) {
                chart.update();
            }
        });
    }

    updateExecutiveDateTime() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };

        document.getElementById('exec-current-time')?.textContent =
            now.toLocaleDateString('en-US', options);
        document.getElementById('exec-last-updated')?.textContent =
            now.toLocaleString('en-US', options);
    }

    initializeExecutiveCharts() {
        // Initialize core charts first
        this.initializeRevenueProfitChart();
        this.initializeCashFlowChart();

        // Initialize extended charts if methods are available
        if (typeof this.initializePnLChart === 'function') {
            this.initializePnLChart();
        }
        if (typeof this.initializeRatiosChart === 'function') {
            this.initializeRatiosChart();
        }
        if (typeof this.initializeCustomerChart === 'function') {
            this.initializeCustomerChart();
        }
        if (typeof this.initializeOperationsChart === 'function') {
            this.initializeOperationsChart();
        }
        if (typeof this.initializeMarketChart === 'function') {
            this.initializeMarketChart();
        }
        if (typeof this.initializeGrowthChart === 'function') {
            this.initializeGrowthChart();
        }
    }

    initializeRevenueProfitChart() {
        const ctx = document.getElementById('exec-revenue-profit-chart');
        if (!ctx || this.charts.revenueProfitChart) return;

        try {
            this.charts.revenueProfitChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Revenue',
                    data: this.executiveData.revenue.monthly,
                    borderColor: '#1a365d',
                    backgroundColor: 'rgba(26, 54, 93, 0.1)',
                    borderWidth: 4,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#1a365d',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 3,
                    pointRadius: 6
                }, {
                    label: 'Profit',
                    data: this.executiveData.profit.monthly,
                    borderColor: '#38a169',
                    backgroundColor: 'rgba(56, 161, 105, 0.1)',
                    borderWidth: 4,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#38a169',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 3,
                    pointRadius: 6
                }]
            },
            options: {
                ...this.getExecutiveChartOptions(),
                plugins: {
                    ...this.getExecutiveChartOptions().plugins,
                    title: {
                        display: false
                    }
                }
            }
        });
        } catch (error) {
            console.error('Error initializing revenue profit chart:', error);
        }
    }

    initializeCashFlowChart() {
        const ctx = document.getElementById('exec-cashflow-chart');
        if (!ctx || this.charts.cashFlowChart) return;

        try {
            this.charts.cashFlowChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Cash Flow',
                    data: this.executiveData.cashFlow.monthly,
                    backgroundColor: this.executiveData.cashFlow.monthly.map(value =>
                        value > 7000000 ? '#38a169' : value > 5000000 ? '#d69e2e' : '#e53e3e'
                    ),
                    borderColor: '#1a365d',
                    borderWidth: 2,
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                ...this.getExecutiveChartOptions(),
                plugins: {
                    ...this.getExecutiveChartOptions().plugins,
                    legend: {
                        display: false
                    }
                }
            }
        });
        } catch (error) {
            console.error('Error initializing cash flow chart:', error);
        }
    }

    exportExecutiveSummary() {
        // Create executive summary export
        const summaryData = {
            timestamp: new Date().toISOString(),
            kpis: this.kpis,
            alerts: this.alerts,
            financialData: this.executiveData
        };

        const dataStr = JSON.stringify(summaryData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `executive-summary-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        URL.revokeObjectURL(url);
    }
}
