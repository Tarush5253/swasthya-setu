"use client"

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios';
import { getLocalStorage } from '@/lib/local-storage';




interface BedData {
  icu: {
    total: number
    available: number
    occupied: number
  }
  general: {
    total: number
    available: number
    occupied: number
  }
  emergency: {
    total: number
    available: number
    occupied: number
  }
  pediatric: {
    total: number
    available: number
    occupied: number
  }
}

interface BedRequest {
  _id: string
  patientName: string
  requestType: string
  priority: string
  status: string
  timestamp: Date
  hospital: {
    _id: string
    name: string
    location: string
    contact: string
  }
}

interface HospitalContextType {
  hospitals: Hospital[]
  bedData: BedData
  bloodBanks: BloodBank[]
  patientRequests: BedRequest[]
  loading: boolean
  error: string | null
  fetchBedData: () => Promise<void>
  fetchBloodData: () => Promise<void>
  fetchPatientRequests: () => Promise<void>
  updateRequestStatus: (requestId: string, status: string) => Promise<void>
}
export interface Hospital {
  _id: string;
  name: string;
  location: string;
  contact: string;
  beds: BedData;
  facilities: string[];
  admin: string;
  __v?: number;
}

export interface BloodBank {
  _id: string;
  admin: string;
  name: string;
  location: string;
  contact: string;
  stock: {
    AB_neg: number;
    AB_pos: number;
    A_neg: number;
    A_pos: number;
    B_neg: number;
    B_pos: number;
    O_neg: number;
    O_pos: number;
  };
  __v?: number;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined)

export const HospitalProvider = ({ children }: { children: React.ReactNode }) => {
  const [bedData, setBedData] = useState<BedData>({
    icu: { total: 0, available: 0, occupied: 0 },
    general: { total: 0, available: 0, occupied: 0 },
    emergency: { total: 0, available: 0, occupied: 0 },
    pediatric: { total: 0, available: 0, occupied: 0 }
  })
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [bloodBanks, setBloodBank] = useState<BloodBank[]>([])
  const [patientRequests, setPatientRequests] = useState<BedRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
  })


  // Fetch initial bed data
  const fetchBedData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await api.get(`/hospitals`)
      if (response.status == 200) {
        console.log(response.data)
        setHospitals(response.data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      toast({
        title: 'Error',
        description: 'Failed to fetch bed data',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchBloodData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await api.get(`/blood-banks`)
      if (response.status == 200) {
        console.log(response.data)
        setBloodBank(response.data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      toast({
        title: 'Error',
        description: 'Failed to fetch bed data',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch patient requests
  const fetchPatientRequests = useCallback(async () => {
    setLoading(true)
    const token = getLocalStorage("swasthyasetu_token")
    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const response = await api.get(`/requests//hospital-bed-requests`)
      if (response.status == 200) {
        console.log(response)
        setPatientRequests(response.data)
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      toast({
        title: 'Error',
        description: 'Failed to fetch patient requests',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }, [])

  // Update request status
  const updateRequestStatus = useCallback(async (requestId: string, status: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/bed-requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      })

      if (!response.ok) throw new Error('Failed to update request status')

      const updatedRequest = await response.json()
      setPatientRequests(prev =>
        prev.map(req => req._id === updatedRequest._id ? updatedRequest : req)
      )

      toast({
        title: 'Success',
        description: 'Request status updated successfully'
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      toast({
        title: 'Error',
        description: 'Failed to update request status',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial data fetch
  useEffect(() => {
    fetchBedData()
    fetchBloodData()
  }, [fetchBedData, fetchBloodData])

  const value = {
    bedData,
    patientRequests,
    loading,
    error,
    fetchBedData,
    fetchPatientRequests,
    updateRequestStatus,
    hospitals,
    fetchBloodData,
    bloodBanks
  }

  return (
    <HospitalContext.Provider value={value}>
      {children}
    </HospitalContext.Provider>
  )
}

export const useHospital = () => {
  const context = useContext(HospitalContext)
  if (context === undefined) {
    throw new Error('useHospital must be used within a HospitalProvider')
  }
  return context
}