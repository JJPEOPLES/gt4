import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip, Tooltip } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { db } from '../firebase';
import { doc, onSnapshot, updateDoc, increment, setDoc, getDoc } from 'firebase/firestore';

interface LiveUserCountProps {
  showLabel?: boolean;
  variant?: 'default' | 'compact';
}

const LiveUserCount: React.FC<LiveUserCountProps> = ({ 
  showLabel = true, 
  variant = 'default' 
}) => {
  const [userCount, setUserCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Reference to the stats document
    const statsRef = doc(db, 'stats', 'userCount');
    
    // Function to increment the user count when a user visits
    const incrementUserCount = async () => {
      try {
        // Check if the document exists
        const docSnap = await getDoc(statsRef);
        
        if (docSnap.exists()) {
          // Increment the count
          await updateDoc(statsRef, {
            currentUsers: increment(1),
            totalVisits: increment(1)
          });
        } else {
          // Create the document if it doesn't exist
          await setDoc(statsRef, {
            currentUsers: 1,
            totalVisits: 1
          });
        }
      } catch (error) {
        console.error('Error updating user count:', error);
      }
    };
    
    // Function to decrement the user count when a user leaves
    const decrementUserCount = async () => {
      try {
        await updateDoc(statsRef, {
          currentUsers: increment(-1)
        });
      } catch (error) {
        console.error('Error updating user count:', error);
      }
    };
    
    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(statsRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setUserCount(data.currentUsers || 0);
      }
      setLoading(false);
    });
    
    // Increment the count when the component mounts
    incrementUserCount();
    
    // Decrement the count when the component unmounts
    return () => {
      unsubscribe();
      decrementUserCount();
    };
  }, []);

  if (variant === 'compact') {
    return (
      <Tooltip title={`${userCount} users online`}>
        <Chip
          icon={<PeopleIcon />}
          label={userCount}
          color="primary"
          size="small"
          sx={{ 
            fontWeight: 'bold',
            '& .MuiChip-icon': { color: 'inherit' }
          }}
        />
      </Tooltip>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <PeopleIcon color="primary" sx={{ mr: 1 }} />
      {showLabel && (
        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
          Users Online:
        </Typography>
      )}
      <Typography 
        variant="body2" 
        fontWeight="bold" 
        color="primary"
      >
        {loading ? '...' : userCount}
      </Typography>
    </Box>
  );
};

export default LiveUserCount;