import { useRef } from "react";
import { useState } from "react";
import { searchMovies } from '../services/movies.js'

export const useMovies = ({ search }) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  const getMovies = async () => {
    if (search != previousSearch.current) {
      try {
        setLoading(true)
        setError(null)
        previousSearch.current = search
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
      } catch (error) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
  }
  return { movies, getMovies, loading }
}