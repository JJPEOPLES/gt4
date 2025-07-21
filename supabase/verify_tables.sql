-- Check if profiles table exists and show its structure
SELECT 
  table_name, 
  column_name, 
  data_type 
FROM 
  information_schema.columns 
WHERE 
  table_name = 'profiles' 
ORDER BY 
  ordinal_position;

-- Check if system_settings table exists and show its structure
SELECT 
  table_name, 
  column_name, 
  data_type 
FROM 
  information_schema.columns 
WHERE 
  table_name = 'system_settings' 
ORDER BY 
  ordinal_position;

-- Check RLS policies for profiles
SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- Check RLS policies for system_settings
SELECT * FROM pg_policies WHERE tablename = 'system_settings';