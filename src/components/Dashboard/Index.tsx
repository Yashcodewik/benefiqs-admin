"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  RiUserLine,
  RiBankCardLine,
  RiFileTextLine,
  RiArrowUpLine,
  RiArrowDownLine,
} from "react-icons/ri";

const stats = [
  {
    label: "Total Users",
    value: "12,847",
    change: "+8.2%",
    up: true,
    icon: RiUserLine,
    color: "from-deep-blue to-blue-600",
    glow: "shadow-glow-blue",
    bg: "bg-deep-blue/10",
    iconColor: "text-deep-blue",
  },
  {
    label: "Active Subscriptions",
    value: "4,215",
    change: "+12.5%",
    up: true,
    icon: RiBankCardLine,
    color: "from-teal to-teal/60",
    glow: "shadow-glow-teal",
    bg: "bg-teal/10",
    iconColor: "text-teal",
  },
  {
    label: "CMS Articles",
    value: "138",
    change: "+3.1%",
    up: true,
    icon: RiFileTextLine,
    color: "from-amber to-amber/60",
    glow: "",
    bg: "bg-amber/10",
    iconColor: "text-amber",
  },
  {
    label: "Churn Rate",
    value: "2.4%",
    change: "-0.8%",
    up: false,
    icon: RiArrowDownLine,
    color: "from-danger to-danger/60",
    glow: "",
    bg: "bg-danger/10",
    iconColor: "text-danger",
  },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
const years = ["2024", "2025", "2026"];

const usersByMonthYear: Record<string, Record<string, number[]>> = {
  "2024": {
    Jan: [220, 260, 310, 360, 410, 465, 520],
    Feb: [300, 355, 390, 455, 520, 590, 640],
    Mar: [410, 480, 540, 620, 710, 780, 860],
    Apr: [520, 600, 690, 760, 840, 930, 1010],
    May: [640, 720, 790, 875, 960, 1080, 1180],
    Jun: [780, 860, 970, 1090, 1180, 1290, 1380],
    Jul: [920, 1040, 1130, 1240, 1380, 1490, 1600],
    Aug: [1080, 1190, 1310, 1450, 1580, 1710, 1840],
    Sep: [1260, 1390, 1510, 1660, 1800, 1960, 2100],
  },
  "2025": {
    Jan: [1460, 1580, 1720, 1850, 2020, 2180, 2320],
    Feb: [1640, 1810, 1940, 2110, 2260, 2430, 2600],
    Mar: [1880, 2020, 2210, 2380, 2570, 2760, 2940],
    Apr: [2140, 2320, 2480, 2680, 2860, 3070, 3260],
    May: [2420, 2610, 2820, 3040, 3230, 3460, 3690],
    Jun: [2780, 3010, 3240, 3490, 3710, 3920, 4180],
    Jul: [3160, 3410, 3650, 3920, 4170, 4460, 4720],
    Aug: [3620, 3880, 4170, 4420, 4710, 5020, 5360],
    Sep: [4180, 4490, 4790, 5140, 5480, 5820, 6210],
  },
  "2026": {
    Jan: [4820, 5120, 5460, 5830, 6170, 6540, 6920],
    Feb: [5480, 5840, 6210, 6620, 7010, 7420, 7810],
    Mar: [6260, 6670, 7060, 7490, 7920, 8360, 8840],
    Apr: [7120, 7560, 8040, 8520, 9030, 9560, 10040],
    May: [8240, 8720, 9260, 9810, 10380, 11120, 12847],
    Jun: [9020, 9620, 10180, 10760, 11340, 11980, 12620],
    Jul: [9680, 10340, 10920, 11560, 12110, 12730, 13480],
    Aug: [10420, 11160, 11880, 12520, 13240, 13960, 14720],
    Sep: [11240, 12080, 12810, 13560, 14320, 15170, 16040],
  },
};

const profilesByPeriod = {
  Week: [
    { label: "Mon", value: 42 },
    { label: "Tue", value: 56 },
    { label: "Wed", value: 48 },
    { label: "Thu", value: 67 },
    { label: "Fri", value: 74 },
    { label: "Sat", value: 61 },
    { label: "Sun", value: 82 },
  ],
  Month: [
    { label: "W1", value: 218 },
    { label: "W2", value: 276 },
    { label: "W3", value: 332 },
    { label: "W4", value: 391 },
  ],
  Year: [
    { label: "Jan", value: 880 },
    { label: "Feb", value: 960 },
    { label: "Mar", value: 1140 },
    { label: "Apr", value: 1290 },
    { label: "May", value: 1480 },
    { label: "Jun", value: 1360 },
    { label: "Jul", value: 1580 },
    { label: "Aug", value: 1710 },
    { label: "Sep", value: 1860 },
  ],
};

type ProfilePeriod = keyof typeof profilesByPeriod;

function formatCompact(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 1 : 0)}k`;
  }

  return value.toString();
}

function LineChart({ values }: { values: number[] }) {
  const width = 640;
  const height = 260;
  const paddingX = 48;
  const paddingY = 34;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const upper = Math.ceil(max / 1000) * 1000;
  const lower = Math.max(0, Math.floor(min / 1000) * 1000);
  const yTicks = [upper, Math.round((upper + lower) / 2), lower];
  const range = Math.max(max - min, 1);
  const points = values.map((value, index) => {
    const x = paddingX + (index * (width - paddingX * 2)) / (values.length - 1);
    const y = height - paddingY - ((value - min) / range) * (height - paddingY * 2);
    return { x, y, value };
  });
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = `${path} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;
  const latestPoint = points[points.length - 1];

  return (
    <div className="h-72 overflow-hidden rounded-2xl border border-border-color bg-dark-navy/50 px-2 pt-3">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
        <defs>
          <linearGradient id="usersLineFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#54cccc" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#54cccc" stopOpacity="0" />
          </linearGradient>
          <filter id="usersLineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#54cccc" floodOpacity="0.38" />
          </filter>
        </defs>
        {yTicks.map((tick) => {
          const y = height - paddingY - ((tick - min) / range) * (height - paddingY * 2);
          return (
            <g key={tick}>
              <line x1={paddingX} x2={width - paddingX} y1={y} y2={y} stroke="#1e2a40" strokeDasharray="5 8" />
              <text x={14} y={y + 4} fill="#8a9bbe" fontSize="11">
                {formatCompact(tick)}
              </text>
            </g>
          );
        })}
        <path d={areaPath} fill="url(#usersLineFill)" />
        <path d={path} fill="none" stroke="#54cccc" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#usersLineGlow)" />
        {points.map((point, index) => (
          <g key={index}>
            <line x1={point.x} x2={point.x} y1={height - paddingY} y2={height - paddingY + 4} stroke="#1e2a40" />
            <circle cx={point.x} cy={point.y} r={index === points.length - 1 ? "6" : "4"} fill="#080c14" stroke="#54cccc" strokeWidth="3" />
            <text x={point.x} y={height - 8} textAnchor="middle" fill="#8a9bbe" fontSize="11">
              {`W${index + 1}`}
            </text>
          </g>
        ))}
        <g>
          <rect x={latestPoint.x - 50} y={latestPoint.y - 36} width="96" height="24" rx="8" fill="#131929" stroke="#1e2a40" />
          <text x={latestPoint.x - 38} y={latestPoint.y - 20} fill="#ffffff" fontSize="12" fontWeight="700">
            {latestPoint.value.toLocaleString()}
          </text>
        </g>
      </svg>
    </div>
  );
}

function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((item) => item.value));

  return (
    <div className="relative h-72 overflow-hidden rounded-2xl border border-border-color bg-dark-navy/50 px-4 pb-4 pt-8">
      <div className="absolute inset-x-4 top-10 bottom-10 flex flex-col justify-between pointer-events-none">
        {[0, 1, 2].map((line) => (
          <span key={line} className="border-t border-dashed border-border-color" />
        ))}
      </div>
      <div className="relative h-full flex items-end gap-3">
      {data.map((item) => {
        const height = `${Math.max((item.value / max) * 100, 8)}%`;
        return (
          <div key={item.label} className="flex-1 h-full flex flex-col justify-end gap-2 min-w-0">
            <div className="relative flex-1 flex items-end">
              <div className="absolute inset-x-0 bottom-0 h-full rounded-t-xl bg-white/5" />
              <div className="relative w-full rounded-t-xl bg-gradient-to-t from-deep-blue to-teal shadow-glow-teal transition-all duration-300" style={{ height }}>
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-md bg-surface px-1.5 py-0.5 text-[10px] font-semibold text-white border border-border-color">
                  {item.value.toLocaleString()}
                </span>
              </div>
            </div>
            <p className="text-center text-[11px] text-text-muted truncate">{item.label}</p>
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default function DashboardComponent() {
  const [selectedMonth, setSelectedMonth] = useState("May");
  const [selectedYear, setSelectedYear] = useState("2026");
  const [profilePeriod, setProfilePeriod] = useState<ProfilePeriod>("Month");

  const userChartValues = usersByMonthYear[selectedYear][selectedMonth];
  const profileChartData = profilesByPeriod[profilePeriod];
  const userTotal = userChartValues[userChartValues.length - 1];
  const profileTotal = useMemo(
    () => profileChartData.reduce((sum, item) => sum + item.value, 0),
    [profileChartData]
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`bg-surface border border-border-color rounded-2xl p-5 shadow-card hover:border-deep-blue/40 transition-all duration-300 group`}
            >
              <div className="flex items-start justify-between">
                <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`text-xl ${stat.iconColor}`} />
                </div>
                <span
                  className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
                    stat.up
                      ? "bg-teal/10 text-teal"
                      : "bg-danger/10 text-danger"
                  }`}
                >
                  {stat.up ? <RiArrowUpLine /> : <RiArrowDownLine />}
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-text-muted text-sm mt-1">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="bg-gradient-to-b from-surface to-dark-navy border border-border-color rounded-2xl shadow-card overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4 border-b border-border-color">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-white font-semibold text-sm">Total Users</h3>
                <span className="flex items-center gap-1 rounded-lg bg-teal/10 px-2 py-1 text-[11px] font-semibold text-teal">
                  <RiArrowUpLine />
                  +8.2%
                </span>
              </div>
              <p className="text-2xl font-bold text-white mt-2">{userTotal.toLocaleString()}</p>
              <p className="text-text-muted text-xs mt-1">Users in {selectedMonth} {selectedYear}</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={selectedMonth}
                onChange={(event) => setSelectedMonth(event.target.value)}
                className="bg-dark-navy border border-border-color rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal transition-all"
              >
                {months.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(event) => setSelectedYear(event.target.value)}
                className="bg-dark-navy border border-border-color rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal transition-all"
              >
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="p-5">
            <LineChart values={userChartValues} />
          </div>
        </div>

        <div className="bg-gradient-to-b from-surface to-dark-navy border border-border-color rounded-2xl shadow-card overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4 border-b border-border-color">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-white font-semibold text-sm">Total Profiles</h3>
                <span className="flex items-center gap-1 rounded-lg bg-deep-blue/20 px-2 py-1 text-[11px] font-semibold text-teal">
                  <RiArrowUpLine />
                  +12.5%
                </span>
              </div>
              <p className="text-2xl font-bold text-white mt-2">{profileTotal.toLocaleString()}</p>
              <p className="text-text-muted text-xs mt-1">Profiles this {profilePeriod.toLowerCase()}</p>
            </div>
            <div className="flex items-center gap-1 bg-dark-navy border border-border-color rounded-xl p-1">
              {(["Week", "Month", "Year"] as ProfilePeriod[]).map((period) => (
                <button
                  key={period}
                  type="button"
                  onClick={() => setProfilePeriod(period)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    profilePeriod === period
                      ? "bg-deep-blue text-white shadow-glow-blue"
                      : "text-text-muted hover:text-white hover:bg-white/5"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="p-5">
            <BarChart data={profileChartData} />
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Link href="/users" className="bg-surface border border-border-color rounded-2xl p-5 hover:border-deep-blue/50 hover:shadow-glow-blue transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-deep-blue/10 flex items-center justify-center">
              <RiUserLine className="text-deep-blue text-xl" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold group-hover:text-teal transition-colors">Manage Users</p>
              <p className="text-text-muted text-xs">View and edit user accounts</p>
            </div>
          </div>
        </Link>
        <Link href="/subscriptions/create" className="bg-surface border border-border-color rounded-2xl p-5 hover:border-teal/50 hover:shadow-glow-teal transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center">
              <RiBankCardLine className="text-teal text-xl" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold group-hover:text-teal transition-colors">Create Plan</p>
              <p className="text-text-muted text-xs">Add new subscription plan</p>
            </div>
          </div>
        </Link>
        <Link href="/cms" className="bg-surface border border-border-color rounded-2xl p-5 hover:border-amber/50 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center">
              <RiFileTextLine className="text-amber text-xl" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold group-hover:text-amber transition-colors">Publish Content</p>
              <p className="text-text-muted text-xs">Write and manage articles</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
