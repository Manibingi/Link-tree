import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import axios from "axios";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    last6MonthsData: [],
    trafficByDevice: [],
    trafficByLinks: [],
    siteClicks: [],
    totalClicks: 0,
    shopClicks: 0,
    ctaClicks: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/links/analytics",
          {
            headers: { Authorization: `${localStorage.getItem("token")}` },
          }
        );
        setAnalyticsData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className={styles.analyticsContainer}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Spark</h2>
        <ul>
          <li>Links</li>
          <li>Appearance</li>
          <li className={styles.active}>Analytics</li>
          <li>Settings</li>
        </ul>
      </aside>
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h3>Hi, Jenny Wilson!</h3>
          <p>Congratulations! You got a great response today.</p>
        </header>
        <section className={styles.overviewCards}>
          <div className={styles.card}>
            <h4>Clicks on Links</h4>
            <p>{analyticsData.analyticsOverview.links}</p>
          </div>
          <div className={styles.card}>
            <h4>Click on Shop</h4>
            <p>{analyticsData.analyticsOverview.shop}</p>
          </div>
          <div className={styles.card}>
            <h4>CTA</h4>
            <p>{analyticsData.analyticsOverview.cta}</p>
          </div>
        </section>
        <section className={styles.chartsSection}>
          <div className={styles.chartContainer}>
            <h4>Last 6 Months Clicks</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={analyticsData.last6MonthsData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#16a34a"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.chartContainer}>
            <h4>Traffic by Device</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={analyticsData.trafficByDevice}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.chartContainer}>
            <h4>Sites</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={analyticsData.siteClicks}
                  dataKey="value"
                  nameKey="name"
                  fill="#16a34a"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.chartContainer}>
            <h4>Traffic by Links</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={analyticsData.trafficByLinks}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clicks" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Analytics;
