import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../database/database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase
