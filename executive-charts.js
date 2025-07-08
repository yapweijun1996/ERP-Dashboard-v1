// Executive Chart Implementations - Advanced Business Intelligence Visualizations

// Wait for ExecutiveDashboard to be defined, then extend it
document.addEventListener('DOMContentLoaded', function() {
    if (typeof ExecutiveDashboard !== 'undefined') {
        // Extend ExecutiveDashboard with additional chart methods
        ExecutiveDashboard.prototype.initializePnLChart = function() {
    const ctx = document.getElementById('exec-pnl-chart');
    if (!ctx || this.charts.pnlChart) return;

    const data = this.executiveData;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
    this.charts.pnlChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'Revenue',
                data: data.revenue.monthly.slice(0, 6),
                backgroundColor: '#1a365d',
                borderRadius: 6,
                borderSkipped: false,
                order: 1
            }, {
                label: 'Gross Profit',
                data: data.revenue.monthly.slice(0, 6).map(rev => rev * 0.682), // 68.2% gross margin
                backgroundColor: '#38a169',
                borderRadius: 6,
                borderSkipped: false,
                order: 2
            }, {
                label: 'Net Profit',
                data: data.profit.monthly.slice(0, 6),
                backgroundColor: '#3182ce',
                borderRadius: 6,
                borderSkipped: false,
                order: 3
            }]
        },
        options: {
            ...this.getExecutiveChartOptions(),
            plugins: {
                ...this.getExecutiveChartOptions().plugins,
                tooltip: {
                    ...this.getExecutiveChartOptions().plugins.tooltip,
                    callbacks: {
                        afterBody: function(tooltipItems) {
                            const revenue = tooltipItems.find(item => item.dataset.label === 'Revenue');
                            const profit = tooltipItems.find(item => item.dataset.label === 'Net Profit');
                            if (revenue && profit) {
                                const margin = ((profit.parsed.y / revenue.parsed.y) * 100).toFixed(1);
                                return [`Net Margin: ${margin}%`];
                            }
                            return [];
                        }
                    }
                }
            }
        }
    });
};

ExecutiveDashboard.prototype.initializeRatiosChart = function() {
    const ctx = document.getElementById('exec-ratios-chart');
    if (!ctx || this.charts.ratiosChart) return;

    this.charts.ratiosChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Liquidity Ratio', 'Debt-to-Equity', 'ROE', 'ROA', 'Current Ratio', 'Quick Ratio'],
            datasets: [{
                label: 'Current Period',
                data: [2.4, 0.35, 24.7, 18.2, 2.1, 1.8],
                borderColor: '#1a365d',
                backgroundColor: 'rgba(26, 54, 93, 0.2)',
                borderWidth: 3,
                pointBackgroundColor: '#1a365d',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 3,
                pointRadius: 6
            }, {
                label: 'Industry Average',
                data: [2.0, 0.45, 20.0, 15.0, 1.8, 1.5],
                borderColor: '#718096',
                backgroundColor: 'rgba(113, 128, 150, 0.1)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointBackgroundColor: '#718096',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4
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
                        padding: 24,
                        font: {
                            size: this.presentationMode ? 16 : 14,
                            weight: '500'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 32, 44, 0.95)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 16,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.r.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 3,
                    grid: {
                        color: '#f1f5f9'
                    },
                    pointLabels: {
                        color: '#4a5568',
                        font: {
                            size: this.presentationMode ? 14 : 12,
                            weight: '500'
                        }
                    },
                    ticks: {
                        color: '#718096',
                        backdropColor: 'transparent',
                        font: {
                            size: this.presentationMode ? 12 : 10
                        }
                    }
                }
            }
        }
    });
};

ExecutiveDashboard.prototype.initializeCustomerChart = function() {
    const ctx = document.getElementById('exec-customer-chart');
    if (!ctx || this.charts.customerChart) return;

    this.charts.customerChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'New Customers',
                data: [1100, 1250, 1180, 1320, 1290, 1250, 1380, 1420, 1350, 1480, 1520, 1250],
                borderColor: '#38a169',
                backgroundColor: 'rgba(56, 161, 105, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                yAxisID: 'y'
            }, {
                label: 'Customer Satisfaction',
                data: [4.5, 4.6, 4.4, 4.7, 4.8, 4.6, 4.9, 4.8, 4.7, 4.9, 4.8, 4.7],
                borderColor: '#3182ce',
                backgroundColor: 'rgba(49, 130, 206, 0.1)',
                borderWidth: 3,
                fill: false,
                tension: 0.4,
                yAxisID: 'y1'
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
                        padding: 24,
                        font: {
                            size: this.presentationMode ? 16 : 14,
                            weight: '500'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 32, 44, 0.95)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 16
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    beginAtZero: true,
                    grid: {
                        color: '#f1f5f9'
                    },
                    ticks: {
                        color: '#4a5568',
                        font: {
                            size: this.presentationMode ? 14 : 12
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    min: 4.0,
                    max: 5.0,
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: '#4a5568',
                        font: {
                            size: this.presentationMode ? 14 : 12
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
                            size: this.presentationMode ? 14 : 12
                        }
                    }
                }
            }
        }
    });
};

ExecutiveDashboard.prototype.initializeOperationsChart = function() {
    const ctx = document.getElementById('exec-operations-chart');
    if (!ctx || this.charts.operationsChart) return;

    this.charts.operationsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Excellent (90-100%)', 'Good (80-89%)', 'Needs Improvement (<80%)'],
            datasets: [{
                data: [78, 18, 4], // Percentage of operations in each category
                backgroundColor: ['#38a169', '#d69e2e', '#e53e3e'],
                borderColor: '#ffffff',
                borderWidth: 3,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: this.presentationMode ? 16 : 14,
                            weight: '500'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 32, 44, 0.95)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 16,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}% of operations`;
                        }
                    }
                }
            },
            cutout: '60%'
        }
    });
};

ExecutiveDashboard.prototype.initializeMarketChart = function() {
    const ctx = document.getElementById('exec-market-chart');
    if (!ctx || this.charts.marketChart) return;

    this.charts.marketChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Our Company',
                data: [{x: 23.8, y: 15.2}], // Market share vs Growth rate
                backgroundColor: '#1a365d',
                borderColor: '#1a365d',
                pointRadius: 12,
                pointHoverRadius: 15
            }, {
                label: 'Competitor A',
                data: [{x: 28.5, y: 8.7}],
                backgroundColor: '#e53e3e',
                borderColor: '#e53e3e',
                pointRadius: 10,
                pointHoverRadius: 12
            }, {
                label: 'Competitor B',
                data: [{x: 19.2, y: 12.3}],
                backgroundColor: '#d69e2e',
                borderColor: '#d69e2e',
                pointRadius: 10,
                pointHoverRadius: 12
            }, {
                label: 'Competitor C',
                data: [{x: 15.8, y: 6.9}],
                backgroundColor: '#718096',
                borderColor: '#718096',
                pointRadius: 8,
                pointHoverRadius: 10
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
                        padding: 24,
                        font: {
                            size: this.presentationMode ? 16 : 14,
                            weight: '500'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 32, 44, 0.95)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 16,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.x}% market share, ${context.parsed.y}% growth`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Market Share (%)',
                        color: '#4a5568',
                        font: {
                            size: this.presentationMode ? 16 : 14,
                            weight: '600'
                        }
                    },
                    grid: {
                        color: '#f1f5f9'
                    },
                    ticks: {
                        color: '#4a5568',
                        font: {
                            size: this.presentationMode ? 14 : 12
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Growth Rate (%)',
                        color: '#4a5568',
                        font: {
                            size: this.presentationMode ? 16 : 14,
                            weight: '600'
                        }
                    },
                    grid: {
                        color: '#f1f5f9'
                    },
                    ticks: {
                        color: '#4a5568',
                        font: {
                            size: this.presentationMode ? 14 : 12
                        }
                    }
                }
            }
        }
    });
};

ExecutiveDashboard.prototype.initializeGrowthChart = function() {
    const ctx = document.getElementById('exec-growth-chart');
    if (!ctx || this.charts.growthChart) return;

    this.charts.growthChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Enterprise', 'Mid-Market', 'SMB', 'International', 'New Products'],
            datasets: [{
                label: 'Current Revenue ($M)',
                data: [45.2, 32.8, 28.5, 18.7, 12.3],
                backgroundColor: '#1a365d',
                borderRadius: 6,
                borderSkipped: false
            }, {
                label: 'Growth Potential ($M)',
                data: [15.8, 12.4, 8.9, 25.6, 18.2],
                backgroundColor: '#38a169',
                borderRadius: 6,
                borderSkipped: false
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
                        padding: 24,
                        font: {
                            size: this.presentationMode ? 16 : 14,
                            weight: '500'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 32, 44, 0.95)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 16,
                    callbacks: {
                        afterBody: function(tooltipItems) {
                            const current = tooltipItems.find(item => item.dataset.label.includes('Current'));
                            const potential = tooltipItems.find(item => item.dataset.label.includes('Potential'));
                            if (current && potential) {
                                const total = current.parsed.y + potential.parsed.y;
                                const growth = ((potential.parsed.y / current.parsed.y) * 100).toFixed(1);
                                return [`Total Opportunity: $${total.toFixed(1)}M`, `Growth Potential: ${growth}%`];
                            }
                            return [];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    stacked: false,
                    grid: {
                        color: '#f1f5f9'
                    },
                    ticks: {
                        color: '#4a5568',
                        font: {
                            size: this.presentationMode ? 14 : 12
                        },
                        callback: function(value) {
                            return '$' + value + 'M';
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
                            size: this.presentationMode ? 14 : 12
                        }
                    }
                }
            }
        }
    });
};

    } // End of ExecutiveDashboard check
}); // End of DOMContentLoaded
