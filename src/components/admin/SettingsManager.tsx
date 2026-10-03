import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import {
  getActiveFirebaseConfig,
  saveCustomFirebaseConfig,
  clearCustomFirebaseConfig,
  isFirebaseConfigured,
} from "@/lib/firebase";
import {
  Save,
  Check,
  MessageCircle,
  QrCode,
  Sparkles,
  Cloud,
  CloudOff,
  Lock,
  KeyRound,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Database,
} from "lucide-react";

export default function SettingsManager() {
  const { settings, updateSettings, isFirebaseActive, syncToFirebase } = useStore();
  const { updateAdminPassword } = useAuth();
  const [formData, setFormData] = useState(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Security password state
  const [newPassword, setNewPassword] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Firebase config state
  const [fbConfig, setFbConfig] = useState(getActiveFirebaseConfig());
  const [showFbConfig, setShowFbConfig] = useState(false);
  const [syncingFirebase, setSyncingFirebase] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) return;
    updateAdminPassword(newPassword.trim());
    setPasswordSuccess(true);
    setNewPassword("");
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  const handleSaveFirebaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveCustomFirebaseConfig(fbConfig);
  };

  const handleSyncToFirebase = async () => {
    try {
      setSyncingFirebase(true);
      setSyncStatus(null);
      const res = await syncToFirebase();
      setSyncStatus(`Successfully uploaded ${res.count} products, settings & banners to Firebase Firestore!`);
    } catch (err: any) {
      setSyncStatus(`Sync error: ${err?.message || "Failed to sync"}`);
    } finally {
      setSyncingFirebase(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="pb-4 border-b border-[#e8ddcd]">
        <h2 className="font-serif font-bold text-2xl text-[#35141f]">
          Store & Payment Configuration
        </h2>
        <p className="text-xs text-[#746863]">
          Configure your Admin WhatsApp redirect number, Manual UPI payment details, and
          announcements.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xs border border-[#e8ddcd] space-y-6 shadow-xs">
        {savedSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xs flex items-center gap-2">
            <Check size={16} /> Store settings updated successfully!
          </div>
        )}

        {/* WhatsApp Redirection Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#25D366] text-sm font-bold uppercase tracking-wider">
            <MessageCircle size={18} />
            <span>WhatsApp Redirection Configuration</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#35141f] mb-1">
                Admin WhatsApp Number (Country code + digits, no + or spaces) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 919876543210"
                value={formData.adminWhatsApp}
                onChange={(e) =>
                  setFormData({ ...formData, adminWhatsApp: e.target.value.replace(/\D/g, "") })
                }
                className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
              />
              <p className="text-[10px] text-[#746863] mt-1">
                All customer orders and inquiry redirects will open chat with this number.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#35141f] mb-1">
                Display Phone Number (Formatted for Footer)
              </label>
              <input
                type="text"
                value={formData.adminPhone}
                onChange={(e) => setFormData({ ...formData, adminPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
              />
            </div>
          </div>
        </div>

        {/* UPI Payment Settings */}
        <div className="pt-6 border-t border-[#e8ddcd] space-y-4">
          <div className="flex items-center gap-2 text-[#7b1e3a] text-sm font-bold uppercase tracking-wider">
            <QrCode size={18} />
            <span>Manual UPI Payment Details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#35141f] mb-1">
                Store UPI ID (e.g. yourname@okhdfcbank or yourname@paytm) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. roopandrivaaz@okhdfcbank"
                value={formData.upiId}
                onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f] font-mono"
              />
              <p className="text-[10px] text-[#746863] mt-1">
                Displayed to customers during checkout with 1-click copy functionality.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#35141f] mb-1">
                Payee Legal Name (Account Holder Name) *
              </label>
              <input
                type="text"
                required
                value={formData.upiPayeeName}
                onChange={(e) => setFormData({ ...formData, upiPayeeName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
              />
            </div>
          </div>
        </div>

        {/* Storefront Branding & Delivery */}
        <div className="pt-6 border-t border-[#e8ddcd] space-y-4">
          <div className="flex items-center gap-2 text-[#c5902f] text-sm font-bold uppercase tracking-wider">
            <Sparkles size={18} />
            <span>Storefront Announcements & Shipping</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#35141f] mb-1">
              Top Announcement Bar Text
            </label>
            <input
              type="text"
              value={formData.announcement}
              onChange={(e) => setFormData({ ...formData, announcement: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#35141f] mb-1">
                Free Shipping on Orders Above (₹)
              </label>
              <input
                type="number"
                value={formData.freeShippingAbove}
                onChange={(e) =>
                  setFormData({ ...formData, freeShippingAbove: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#35141f] mb-1">
                Standard Shipping Fee (₹)
              </label>
              <input
                type="number"
                value={formData.standardShippingFee}
                onChange={(e) =>
                  setFormData({ ...formData, standardShippingFee: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="btn-primary px-8 py-3 rounded-xs text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Save size={15} className="text-white" />
            <span className="text-white font-bold">Save All Settings</span>
          </button>
        </div>
      </form>

      {/* Cloud Database (Firebase) Control Section */}
      <div className="bg-white p-6 sm:p-8 rounded-xs border border-[#e8ddcd] space-y-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#f4ecdf]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#f4ecdf] text-[#7b1e3a] flex items-center justify-center">
              <Database size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#35141f] uppercase tracking-wider">
                Firebase Cloud Database &amp; Storage
              </h3>
              <p className="text-[11px] text-[#746863]">
                Synchronize products, orders, and banners across all phones and laptops in real-time.
              </p>
            </div>
          </div>

          <div>
            {isFirebaseActive ? (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold rounded-full">
                <Cloud size={14} className="text-emerald-600" /> Firebase Cloud Connected
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold rounded-full">
                <CloudOff size={14} className="text-amber-600" /> Local Storage Mode
              </span>
            )}
          </div>
        </div>

        {syncStatus && (
          <div className="p-3 bg-blue-50 border border-blue-200 text-blue-900 text-xs rounded-xs flex items-center gap-2">
            <CheckCircle2 size={15} /> {syncStatus}
          </div>
        )}

        {/* 1-Click Cloud Sync Action */}
        <div className="p-4 bg-[#fcfaf5] rounded-xs border border-[#e8ddcd] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <strong className="text-xs text-[#35141f] block font-semibold">
              Seed Catalog to Firebase Cloud
            </strong>
            <p className="text-[11px] text-[#746863]">
              Uploads all current products, homepage content, and settings directly into your Firebase Firestore database.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSyncToFirebase}
            disabled={syncingFirebase}
            className="px-5 py-2.5 bg-[#7b1e3a] hover:bg-[#35141f] text-white text-xs font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
          >
            <RefreshCw size={14} className={syncingFirebase ? "animate-spin" : ""} />
            <span>{syncingFirebase ? "Syncing to Cloud..." : "Sync Store to Cloud"}</span>
          </button>
        </div>

        {/* Firebase Config Toggle */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowFbConfig(!showFbConfig)}
            className="text-xs text-[#7b1e3a] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            {showFbConfig ? "Hide Firebase API Credentials" : "⚙️ View / Edit Firebase Project Credentials"}
          </button>

          {showFbConfig && (
            <form onSubmit={handleSaveFirebaseConfig} className="mt-4 p-4 bg-[#fcfaf5] rounded-xs border border-[#e8ddcd] space-y-4">
              <p className="text-[11px] text-[#746863]">
                Enter your Firebase Web App configuration from the Firebase Console (Project Settings → Your apps → SDK setup). You can also set these in <code>.env.local</code>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-[#35141f] mb-1">
                    API Key (apiKey)
                  </label>
                  <input
                    type="text"
                    value={fbConfig.apiKey}
                    onChange={(e) => setFbConfig({ ...fbConfig, apiKey: e.target.value })}
                    placeholder="AIzaSy..."
                    className="w-full px-3 py-1.5 bg-white border border-[#e8ddcd] rounded-xs font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#35141f] mb-1">
                    Project ID (projectId)
                  </label>
                  <input
                    type="text"
                    value={fbConfig.projectId}
                    onChange={(e) => setFbConfig({ ...fbConfig, projectId: e.target.value })}
                    placeholder="roop-rivaaz-app"
                    className="w-full px-3 py-1.5 bg-white border border-[#e8ddcd] rounded-xs font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#35141f] mb-1">
                    Auth Domain (authDomain)
                  </label>
                  <input
                    type="text"
                    value={fbConfig.authDomain}
                    onChange={(e) => setFbConfig({ ...fbConfig, authDomain: e.target.value })}
                    placeholder="roop-rivaaz-app.firebaseapp.com"
                    className="w-full px-3 py-1.5 bg-white border border-[#e8ddcd] rounded-xs font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#35141f] mb-1">
                    Storage Bucket (storageBucket)
                  </label>
                  <input
                    type="text"
                    value={fbConfig.storageBucket}
                    onChange={(e) => setFbConfig({ ...fbConfig, storageBucket: e.target.value })}
                    placeholder="roop-rivaaz-app.firebasestorage.app"
                    className="w-full px-3 py-1.5 bg-white border border-[#e8ddcd] rounded-xs font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#c5902f] hover:bg-[#e1bf75] text-[#35141f] text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer shadow-xs"
                >
                  Save Config &amp; Reload
                </button>
                <button
                  type="button"
                  onClick={() => clearCustomFirebaseConfig()}
                  className="px-3 py-2 text-xs text-red-600 hover:underline cursor-pointer"
                >
                  Clear Saved Config
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Admin Security Password Section */}
      <div className="bg-white p-6 sm:p-8 rounded-xs border border-[#e8ddcd] space-y-4 shadow-xs">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#f4ecdf]">
          <div className="w-8 h-8 rounded-full bg-[#f4ecdf] text-[#7b1e3a] flex items-center justify-center">
            <Lock size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#35141f] uppercase tracking-wider">
              Admin Portal Security
            </h3>
            <p className="text-[11px] text-[#746863]">
              Update the master admin password required to log into the Admin Dashboard.
            </p>
          </div>
        </div>

        {passwordSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xs flex items-center gap-2 font-semibold">
            <Check size={16} /> Admin password updated successfully!
          </div>
        )}

        <form onSubmit={handleUpdatePassword} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-[#35141f] mb-1">
              New Master Admin Password
            </label>
            <input
              type="password"
              required
              minLength={4}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new secure password"
              className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#35141f] hover:bg-[#7b1e3a] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
