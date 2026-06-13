import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bwfnegxtbltlveivpnts.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_oIW0E4LelIo3Dc5uJsKg5Q_S7J6Czbs'

export const supabase = createClient(supabaseUrl, supabaseKey)