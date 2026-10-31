import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import type { PortfolioData } from '@/types'

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionName = import.meta.env.VITE_FIRESTORE_COLLECTION || 'portfolio'
        const snapshot = await getDocs(collection(db, collectionName))
        
        const portfolioData: PortfolioData = {}
        
        snapshot.forEach((doc) => {
          const docData = doc.data()
          const id = docData.id || doc.id
          
          // Map documents by their ID/type
          if (id === 'profile') {
            portfolioData.profile = docData as any
          } else if (id === 'about') {
            portfolioData.about = docData as any
          } else if (id === 'skills') {
            portfolioData.skills = docData as any
          } else if (id === 'experience') {
            portfolioData.experience = docData as any
          } else if (id === 'education') {
            portfolioData.education = docData as any
          } else if (id === 'projects') {
            portfolioData.projects = docData as any
          } else if (id === 'research') {
            portfolioData.research = docData as any
          } else if (id === 'certifications') {
            portfolioData.certifications = docData as any
          }
        })
        
        setData(portfolioData)
        setError(null)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data'
        setError(errorMessage)
        console.error('Error fetching portfolio data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
