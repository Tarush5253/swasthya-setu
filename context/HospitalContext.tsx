"use client"

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { toast } from '@/components/ui/use-toast'

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
  bedData: BedData
  patientRequests: BedRequest[]
  loading: boolean
  error: string | null
  fetchBedData: () => Promise<void>
  updateBedAvailability: (bedType: keyof BedData, available: number) => Promise<void>
  fetchPatientRequests: () => Promise<void>
  updateRequestStatus: (requestId: string, status: string) => Promise<void>
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined)

export const HospitalProvider = ({ children }: { children: React.ReactNode }) => {
  const [bedData, setBedData] = useState<BedData>({
    icu: { total: 0, available: 0, occupied: 0 },
    general: { total: 0, available: 0, occupied: 0 },
    emergency: { total: 0, available: 0, occupied: 0 },
    pediatric: { total: 0, available: 0, occupied: 0 }
  })
  const [patientRequests, setPatientRequests] = useState<BedRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch initial bed data
  const fetchBedData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/hospital/beds')
      if (!response.ok) throw new Error('Failed to fetch bed data')
      const data = await response.json()
      setBedData(data)
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

  // Update bed availability
  const updateBedAvailability = useCallback(async (bedType: keyof BedData, available: number) => {
    setLoading(true)
    try {
      const response = await fetch('/api/hospital/beds', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bedType, available })
      })
      
      if (!response.ok) throw new Error('Failed to update bed data')
      
      const updatedData = await response.json()
      setBedData(prev => ({
        ...prev,
        [bedType]: updatedData
      }))
      
      toast({
        title: 'Success',
        description: 'Bed availability updated successfully'
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      toast({
        title: 'Error',
        description: 'Failed to update bed data',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch patient requests
  const fetchPatientRequests = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/bed-requests')
      if (!response.ok) throw new Error('Failed to fetch patient requests')
      const data = await response.json()
      setPatientRequests(data)
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
    fetchPatientRequests()
  }, [fetchBedData, fetchPatientRequests])

  const value = {
    bedData,
    patientRequests,
    loading,
    error,
    fetchBedData,
    updateBedAvailability,
    fetchPatientRequests,
    updateRequestStatus
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