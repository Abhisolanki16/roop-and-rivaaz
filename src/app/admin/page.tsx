"use client";

import React from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { Loader2 } from "lucide-react";

function AdminGate() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfaf5] flex flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="animate-spin text-[#c5902f]" />
        <p className="text-xs uppercase tracking-widest text-[#746863] font-semibold">
          Verifying Admin Credentials...
        </p>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}

export default function AdminPage() {
  return (
    <AuthProvider>
      <AdminGate />
    </AuthProvider>
  );
}
