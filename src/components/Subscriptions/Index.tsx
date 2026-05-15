"use client";
import Link from "next/link";
import { useState } from "react";
import {
  RiAddLine,
  RiCheckLine,
  RiEditLine,
  RiDeleteBinLine,
  RiBankCardLine,
} from "react-icons/ri";

const plans = [
  {
    id: 1,
    name: "Benefiqs Free",
    billing: "Monthly",
    price: "₹0",
    subscribers: 8632,
    status: "Active",
    features: ["Unlimited Search", "Save up to 3 cards", "Access to top card picks"],
    color: "border-border-color",
    badge: "",
  },
  {
    id: 2,
    name: "Benefiqs Pro",
    billing: "Monthly",
    price: "₹999/month",
    subscribers: 2841,
    status: "Active",
    features: ["Unlimited Search", "Unlimited card saves", "Priority card recommendations", "AI-powered insights", "Priority support"],
    color: "border-deep-blue",
    badge: "Most Popular",
  },
  {
    id: 3,
    name: "Benefiqs Pro",
    billing: "Yearly",
    price: "₹7999/year",
    subscribers: 1374,
    status: "Active",
    features: ["Unlimited Search", "Unlimited card saves", "Priority card recommendations", "AI-powered insights", "Priority support", "2 months free"],
    color: "border-teal",
    badge: "Best Value",
  },
];

export default function SubscriptionsComponent() {
  const [activePlans] = useState(plans);

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-xl">Subscription Plans</h2>
          <p className="text-text-muted text-sm mt-0.5">{activePlans.length} active plans</p>
        </div>
        <Link
          href="/subscriptions/create"
          className="flex items-center gap-2 bg-deep-blue hover:bg-deep-blue/90 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-glow-blue w-fit"
        >
          <RiAddLine className="text-base" /> Create New Plan
        </Link>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Subscribers", value: "12,847", color: "text-white" },
          { label: "Paying Users", value: "4,215", color: "text-teal" },
          { label: "Monthly Revenue", value: "₹42.3L", color: "text-deep-blue" },
        ].map((s) => (
          <div key={s.label} className="bg-surface border border-border-color rounded-2xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-text-muted text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {activePlans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-surface border-2 ${plan.color} rounded-2xl p-5 shadow-card hover:scale-[1.01] transition-all duration-300 relative`}
          >
            {plan.badge && (
              <div className={`absolute -top-3 left-5 px-3 py-0.5 rounded-full text-xs font-bold ${
                plan.badge === "Most Popular"
                  ? "bg-deep-blue text-white shadow-glow-blue"
                  : "bg-teal text-dark-navy shadow-glow-teal"
              }`}>
                {plan.badge}
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-text-muted text-xs font-medium mb-1">{plan.billing}</p>
                <h3 className="text-white font-bold text-lg">{plan.name}</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-deep-blue/10 flex items-center justify-center">
                <RiBankCardLine className="text-deep-blue text-xl" />
              </div>
            </div>

            <p className="text-3xl font-bold text-white mb-4">{plan.price}</p>

            <div className="space-y-2 mb-5">
              {plan.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0">
                    <RiCheckLine className="text-teal text-[10px]" />
                  </div>
                  <span className="text-text-muted text-xs">{f}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border-color">
              <div>
                <p className="text-white text-sm font-semibold">{plan.subscribers.toLocaleString()}</p>
                <p className="text-text-muted text-xs">subscribers</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 bg-teal/10 text-teal text-xs font-medium px-2.5 py-1 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-slow" />
                  {plan.status}
                </span>
                <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-muted hover:text-white transition-all">
                  <RiEditLine className="text-sm" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-danger/10 hover:bg-danger/20 flex items-center justify-center text-danger transition-all">
                  <RiDeleteBinLine className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
