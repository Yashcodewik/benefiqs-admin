"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RiAddLine, RiDeleteBinLine, RiCheckLine, RiArrowLeftLine } from "react-icons/ri";

type BillingCycle = "Monthly" | "Yearly";

export default function CreateSubscriptionComponent() {
  const router = useRouter();
  const [billing, setBilling] = useState<BillingCycle>("Monthly");
  const [planName, setPlanName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState(["", ""]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [badge, setBadge] = useState("");
  const [saving, setSaving] = useState(false);

  const addFeature = () => setFeatures([...features, ""]);
  const removeFeature = (i: number) => setFeatures(features.filter((_, idx) => idx !== i));
  const updateFeature = (i: number, val: string) => {
    const updated = [...features];
    updated[i] = val;
    setFeatures(updated);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      router.push("/subscriptions");
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-xl bg-surface border border-border-color flex items-center justify-center text-text-muted hover:text-white hover:border-deep-blue transition-all"
        >
          <RiArrowLeftLine />
        </button>
        <div>
          <h2 className="text-white font-bold text-xl">Create Subscription Plan</h2>
          <p className="text-text-muted text-sm mt-0.5">Fill in the details to add a new plan</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Form */}
        <div className="xl:col-span-2 space-y-5">
          {/* Basic Info */}
          <div className="bg-surface border border-border-color rounded-2xl p-6 space-y-5">
            <h3 className="text-white font-semibold text-sm border-b border-border-color pb-3">Plan Details</h3>

            {/* Billing Cycle Toggle */}
            <div>
              <label className="block text-xs font-medium text-text-muted mb-2">Billing Cycle</label>
              <div className="flex bg-dark-navy border border-border-color rounded-xl p-1 w-fit">
                {(["Monthly", "Yearly"] as BillingCycle[]).map((cycle) => (
                  <button
                    key={cycle}
                    onClick={() => setBilling(cycle)}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      billing === cycle
                        ? "bg-deep-blue text-white shadow-glow-blue"
                        : "text-text-muted hover:text-white"
                    }`}
                  >
                    {cycle}
                  </button>
                ))}
              </div>
            </div>

            {/* Plan Name */}
            <div>
              <label className="block text-xs font-medium text-text-muted mb-2">Plan Name *</label>
              <input
                type="text"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                placeholder="e.g. Benefiqs Pro"
                className="w-full bg-dark-navy border border-border-color rounded-xl px-4 py-3 text-white text-sm placeholder:text-text-muted/40 focus:outline-none focus:border-deep-blue focus:ring-1 focus:ring-deep-blue transition-all"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-medium text-text-muted mb-2">
                Price ({billing === "Monthly" ? "per month" : "per year"}) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-medium">₹</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="999"
                  className="w-full bg-dark-navy border border-border-color rounded-xl pl-8 pr-4 py-3 text-white text-sm placeholder:text-text-muted/40 focus:outline-none focus:border-deep-blue focus:ring-1 focus:ring-deep-blue transition-all"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-medium text-text-muted mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description of this plan..."
                rows={3}
                className="w-full bg-dark-navy border border-border-color rounded-xl px-4 py-3 text-white text-sm placeholder:text-text-muted/40 focus:outline-none focus:border-deep-blue focus:ring-1 focus:ring-deep-blue transition-all resize-none"
              />
            </div>
          </div>

          {/* Features */}
          <div className="bg-surface border border-border-color rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border-color pb-3">
              <h3 className="text-white font-semibold text-sm">Key Features</h3>
              <button
                onClick={addFeature}
                className="flex items-center gap-1.5 text-teal text-xs font-medium hover:text-teal/80 transition-colors"
              >
                <RiAddLine /> Add Feature
              </button>
            </div>
            <div className="space-y-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0">
                    <RiCheckLine className="text-teal text-[10px]" />
                  </div>
                  <input
                    type="text"
                    value={f}
                    onChange={(e) => updateFeature(i, e.target.value)}
                    placeholder={`Feature ${i + 1}...`}
                    className="flex-1 bg-dark-navy border border-border-color rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-text-muted/40 focus:outline-none focus:border-deep-blue focus:ring-1 focus:ring-deep-blue transition-all"
                  />
                  {features.length > 1 && (
                    <button
                      onClick={() => removeFeature(i)}
                      className="w-8 h-8 rounded-lg bg-danger/10 hover:bg-danger/20 flex items-center justify-center text-danger transition-all"
                    >
                      <RiDeleteBinLine className="text-sm" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview + Settings */}
        <div className="space-y-5">
          {/* Settings */}
          <div className="bg-surface border border-border-color rounded-2xl p-6 space-y-4">
            <h3 className="text-white font-semibold text-sm border-b border-border-color pb-3">Settings</h3>

            {/* Featured toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">Featured Plan</p>
                <p className="text-text-muted text-xs">Show as highlighted plan</p>
              </div>
              <button
                onClick={() => setIsFeatured(!isFeatured)}
                className={`w-11 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ${
                  isFeatured ? "bg-deep-blue" : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${
                    isFeatured ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Badge */}
            <div>
              <label className="block text-xs font-medium text-text-muted mb-2">Badge Label</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Most Popular"
                className="w-full bg-dark-navy border border-border-color rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-text-muted/40 focus:outline-none focus:border-deep-blue transition-all"
              />
            </div>
          </div>

          {/* Live Preview */}
          <div className="bg-surface border-2 border-deep-blue rounded-2xl p-5 relative">
            {badge && (
              <div className="absolute -top-3 left-4 bg-deep-blue text-white text-xs font-bold px-3 py-0.5 rounded-full shadow-glow-blue">
                {badge}
              </div>
            )}
            <p className="text-text-muted text-xs mb-1">{billing}</p>
            <h3 className="text-white font-bold text-lg mb-1">{planName || "Plan Name"}</h3>
            <p className="text-3xl font-bold text-white mb-4">
              ₹{price || "0"}<span className="text-text-muted text-sm font-normal">/{billing === "Monthly" ? "mo" : "yr"}</span>
            </p>
            <div className="space-y-2">
              {features.filter(Boolean).map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0">
                    <RiCheckLine className="text-teal text-[10px]" />
                  </div>
                  <span className="text-text-muted text-xs">{f}</span>
                </div>
              ))}
              {features.filter(Boolean).length === 0 && (
                <p className="text-text-muted/40 text-xs">Add features above...</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleSave}
              disabled={saving || !planName || !price}
              className="w-full bg-deep-blue hover:bg-deep-blue/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all shadow-glow-blue flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                "Create Plan"
              )}
            </button>
            <button
              onClick={() => router.back()}
              className="w-full bg-white/5 hover:bg-white/10 text-text-muted hover:text-white font-medium py-3 rounded-xl transition-all text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
