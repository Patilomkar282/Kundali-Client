import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell,
  ResponsiveContainer 
} from 'recharts';
import { FaTrophy, FaCode, FaClock, FaMedal } from 'react-icons/fa';
import '../css/ProgressDashboard.css';

const ProgressDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('weekly');
  const [metrics, setMetrics] = useState({
    totalProblems: 0,
    codingHours: 0,
    badges: 0,
    certifications: 0
  });
  const [activityData, setActivityData] = useState([]);
  const [platformDistribution, setPlatformDistribution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, [timeFilter]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`your-api-endpoint/dashboard-data?timeframe=${timeFilter}`);
      const data = await response.json();
      
      setMetrics(data.metrics);
      setActivityData(data.activityData);
      setPlatformDistribution(data.platformDistribution);
    } catch (error) {
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const MetricCard = ({ icon, title, value, change }) => (
    <motion.div 
      className="metric-card"
      whileHover={{ scale: 1.02 }}
    >
      <div className="metric-icon">{icon}</div>
      <div className="metric-content">
        <h3>{title}</h3>
        <p className="metric-value">{value}</p>
        <p className={`metric-change ${change >= 0 ? 'positive' : 'negative'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last {timeFilter}
        </p>
      </div>
    </motion.div>
  );

  const exportData = async () => {
    try {
      const response = await fetch('your-api-endpoint/export-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ timeFilter })
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `progress-report-${timeFilter}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      setError('Failed to export data');
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Progress Dashboard</h2>
        <div className="dashboard-controls">
          <select 
            value={timeFilter} 
            onChange={(e) => setTimeFilter(e.target.value)}
            className="time-filter"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <motion.button
            className="export-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportData}
          >
            Export Report
          </motion.button>
        </div>
      </div>

      <div className="metrics-grid">
        <MetricCard 
          icon={<FaCode />}
          title="Total Problems Solved"
          value={metrics.totalProblems}
          change={15}
        />
        <MetricCard 
          icon={<FaClock />}
          title="Coding Hours"
          value={metrics.codingHours}
          change={8}
        />
        <MetricCard 
          icon={<FaTrophy />}
          title="Badges Earned"
          value={metrics.badges}
          change={5}
        />
        <MetricCard 
          icon={<FaMedal />}
          title="Certifications"
          value={metrics.certifications}
          change={0}
        />
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Coding Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="problems" 
                stroke="#8884d8" 
                name="Problems Solved"
              />
              <Line 
                type="monotone" 
                dataKey="hours" 
                stroke="#82ca9d" 
                name="Hours Coded"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Platform Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={platformDistribution}
                dataKey="value"
                nameKey="platform"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {platformDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container full-width">
          <h3>Weekly Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="problems" fill="#8884d8" name="Problems Solved" />
              <Bar dataKey="hours" fill="#82ca9d" name="Hours Coded" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="timeline-container">
        <h3>Recent Activity</h3>
        <div className="timeline">
          {activityData.slice(-5).map((activity, index) => (
            <motion.div 
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="timeline-date">{activity.date}</div>
              <div className="timeline-content">
                <h4>{activity.title}</h4>
                <p>{activity.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;