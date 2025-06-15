"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/AuthContext"
import { getLocalStorage } from "@/lib/local-storage"
import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
})

interface BloodStock {
  "A+": number;
  "A-": number;
  "B+": number;
  "B-": number;
  "AB+": number;
  "AB-": number;
  "O+": number;
  "O-": number;
}

interface BloodBankInfo {
  stock: {
    A_pos?: number;
    A_neg?: number;
    B_pos?: number;
    B_neg?: number;
    AB_pos?: number;
    AB_neg?: number;
    O_pos?: number;
    O_neg?: number;
  };
}

interface User {
  _id: string;
  role: string;
  bloodBankInfo?: BloodBankInfo;
}

interface BloodBankResponse {
  success: boolean;
  data: {
    stock: BloodStock;
  };
}

const updateBloodData = async (bloodBankId: string, stockData: BloodStock) => {
  const token = getLocalStorage("swasthyasetu_token");
  if (!token) throw new Error("Authentication token not found");
  
  try {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await api.patch<BloodBankResponse>(`/blood-banks/${bloodBankId}/stock`, { 
      stock: stockData 
    });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to update blood stock');
    }
    throw new Error('An unexpected error occurred');
  }
};

export function BloodStockForm() {
  const { user } = useAuth();
  const {toast} = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bloodStock, setBloodStock] = useState<BloodStock>({
    "A+": user?.bloodBankInfo?.stock?.A_pos || 0,
    "A-": user?.bloodBankInfo?.stock?.A_neg || 0,
    "B+": user?.bloodBankInfo?.stock?.B_pos || 0,
    "B-": user?.bloodBankInfo?.stock?.B_neg || 0,
    "AB+": user?.bloodBankInfo?.stock?.AB_pos || 0,
    "AB-": user?.bloodBankInfo?.stock?.AB_neg || 0,
    "O+": user?.bloodBankInfo?.stock?.O_pos || 0,
    "O-": user?.bloodBankInfo?.stock?.O_neg || 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = Number.parseInt(value) || 0;

    setBloodStock((prev) => ({
      ...prev,
      [name]: numValue,
    }) as BloodStock);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      toast({
        title: "Error",
        description: "User information not available",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await updateBloodData(user.id, bloodStock);
      toast({
        title: "Blood stock updated",
        description: "The blood stock information has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update blood stock",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div>
                <h3 className="text-lg font-medium">Blood Group Stock</h3>
                <Separator className="my-2" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(bloodStock).map(([group, count]) => (
                    <div key={group} className="space-y-2">
                      <Label htmlFor={group}>{group}</Label>
                      <Input 
                        id={group} 
                        name={group} 
                        type="number" 
                        value={count} 
                        onChange={handleInputChange} 
                        min={0}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Stock"}
        </Button>
      </div>
    </form>
  );
}