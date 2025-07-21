import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Alert,
  CircularProgress,
  Divider,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  AdminPanelSettings as AdminIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Image as ImageIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useAuth } from '../Auth/AuthContext';
import { collection, query, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AdminPanel: React.FC = () => {
  const { isCreator } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState<any[]>([]);
  const [artworks, setArtworks] = useState<any[]>([]);
  const [collaborations, setCollaborations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editUserDialog, setEditUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedIsBlocked, setEditedIsBlocked] = useState(false);

  // Redirect if not creator
  useEffect(() => {
    if (!isCreator) {
      window.location.href = '/';
    }
  }, [isCreator]);

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);
      
      const usersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        joinedAt: doc.data().joinedAt?.toDate?.() || new Date()
      }));
      
      setUsers(usersList);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch artworks
  const fetchArtworks = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const artworksRef = collection(db, 'artworks');
      const querySnapshot = await getDocs(artworksRef);
      
      const artworksList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setArtworks(artworksList);
    } catch (err) {
      console.error('Error fetching artworks:', err);
      setError('Failed to load artworks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch collaborations
  const fetchCollaborations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const collabsRef = collection(db, 'collaborations');
      const querySnapshot = await getDocs(collabsRef);
      
      const collabsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date()
      }));
      
      setCollaborations(collabsList);
    } catch (err) {
      console.error('Error fetching collaborations:', err);
      setError('Failed to load collaborations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load data based on active tab
  useEffect(() => {
    if (!isCreator) return;
    
    if (tabValue === 0) {
      fetchUsers();
    } else if (tabValue === 1) {
      fetchArtworks();
    } else if (tabValue === 2) {
      fetchCollaborations();
    }
  }, [tabValue, isCreator]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setEditedUsername(user.displayName);
    setEditedIsBlocked(user.isBlocked || false);
    setEditUserDialog(true);
  };

  const handleSaveUserEdit = async () => {
    if (!selectedUser) return;
    
    try {
      setLoading(true);
      
      // Don't allow changing username to "Prime" if it's not already Prime
      if (
        editedUsername.toLowerCase() === 'prime' && 
        selectedUser.displayName.toLowerCase() !== 'prime'
      ) {
        setError('The username "Prime" is reserved for the creator of GT4.');
        return;
      }
      
      // Update user in Firestore
      await updateDoc(doc(db, 'users', selectedUser.id), {
        displayName: editedUsername,
        isBlocked: editedIsBlocked
      });
      
      // Update local state
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, displayName: editedUsername, isBlocked: editedIsBlocked }
          : user
      ));
      
      setEditUserDialog(false);
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }
    
    try {
      setLoading(true);
      
      // Delete user from Firestore
      await deleteDoc(doc(db, 'users', userId));
      
      // Update local state
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArtwork = async (artworkId: string) => {
    if (!window.confirm('Are you sure you want to delete this artwork? This action cannot be undone.')) {
      return;
    }
    
    try {
      setLoading(true);
      
      // Delete artwork from Firestore
      await deleteDoc(doc(db, 'artworks', artworkId));
      
      // Update local state
      setArtworks(artworks.filter(artwork => artwork.id !== artworkId));
    } catch (err) {
      console.error('Error deleting artwork:', err);
      setError('Failed to delete artwork. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isCreator) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Access Denied
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          This area is restricted to the GT4 creator.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={3} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
        <Box sx={{ 
          p: 2, 
          bgcolor: 'primary.main', 
          color: 'white',
          display: 'flex',
          alignItems: 'center'
        }}>
          <AdminIcon sx={{ mr: 1 }} />
          <Typography variant="h6">GT4 Creator Admin Panel</Typography>
        </Box>
        
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab icon={<PersonIcon />} label="Users" />
          <Tab icon={<ImageIcon />} label="Artworks" />
          <Tab icon={<GroupIcon />} label="Collaborations" />
        </Tabs>
        
        {error && (
          <Alert severity="error" sx={{ m: 2 }}>
            {error}
          </Alert>
        )}
        
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button 
              startIcon={<RefreshIcon />} 
              onClick={fetchUsers}
              disabled={loading}
            >
              Refresh
            </Button>
          </Box>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Joined</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {user.displayName}
                          {user.displayName.toLowerCase() === 'prime' && (
                            <Chip 
                              size="small" 
                              label="Creator" 
                              color="primary" 
                              sx={{ ml: 1 }} 
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.joinedAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {user.isBlocked ? (
                          <Chip 
                            icon={<BlockIcon />} 
                            label="Blocked" 
                            color="error" 
                            size="small" 
                          />
                        ) : (
                          <Chip 
                            icon={<CheckCircleIcon />} 
                            label="Active" 
                            color="success" 
                            size="small" 
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {user.isCreator ? (
                          <Chip 
                            label="Creator" 
                            color="primary" 
                            size="small" 
                          />
                        ) : (
                          <Chip 
                            label="User" 
                            variant="outlined" 
                            size="small" 
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          color="primary" 
                          onClick={() => handleEditUser(user)}
                          disabled={loading}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          color="error" 
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={loading || user.isCreator}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button 
              startIcon={<RefreshIcon />} 
              onClick={fetchArtworks}
              disabled={loading}
            >
              Refresh
            </Button>
          </Box>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Artwork</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Artist</TableCell>
                    <TableCell>Collaborative</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {artworks.map((artwork) => (
                    <TableRow key={artwork.id}>
                      <TableCell>
                        <Box 
                          component="img"
                          src={artwork.src}
                          alt={artwork.label}
                          sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }}
                        />
                      </TableCell>
                      <TableCell>{artwork.label}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {artwork.artist}
                          {artwork.isCreator && (
                            <Chip 
                              size="small" 
                              label="Creator" 
                              color="primary" 
                              sx={{ ml: 1 }} 
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        {artwork.isCollaborative ? (
                          <Chip 
                            icon={<GroupIcon />} 
                            label="Yes" 
                            color="success" 
                            size="small" 
                          />
                        ) : (
                          <Chip 
                            label="No" 
                            variant="outlined" 
                            size="small" 
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          color="error" 
                          onClick={() => handleDeleteArtwork(artwork.id)}
                          disabled={loading}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button 
              startIcon={<RefreshIcon />} 
              onClick={fetchCollaborations}
              disabled={loading}
            >
              Refresh
            </Button>
          </Box>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : collaborations.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">
                No collaborations found.
              </Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Artwork</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell>Collaborators</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {collaborations.map((collab) => (
                    <TableRow key={collab.id}>
                      <TableCell>{collab.artworkTitle}</TableCell>
                      <TableCell>{collab.ownerName}</TableCell>
                      <TableCell>
                        {collab.collaborators?.map((c: any) => (
                          <Chip 
                            key={c.id} 
                            label={c.displayName} 
                            size="small" 
                            sx={{ mr: 0.5, mb: 0.5 }} 
                          />
                        ))}
                      </TableCell>
                      <TableCell>
                        {collab.createdAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={collab.status} 
                          color={
                            collab.status === 'active' ? 'success' : 
                            collab.status === 'pending' ? 'warning' : 'default'
                          } 
                          size="small" 
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TabPanel>
      </Paper>
      
      {/* Edit User Dialog */}
      <Dialog 
        open={editUserDialog} 
        onClose={() => setEditUserDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Username"
              fullWidth
              value={editedUsername}
              onChange={(e) => setEditedUsername(e.target.value)}
              margin="normal"
              disabled={selectedUser?.displayName.toLowerCase() === 'prime'}
              helperText={selectedUser?.displayName.toLowerCase() === 'prime' ? "Creator username cannot be changed" : ""}
            />
            
            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={editedIsBlocked}
                    onChange={(e) => setEditedIsBlocked(e.target.checked)}
                    disabled={selectedUser?.isCreator}
                  />
                }
                label="Block User"
              />
              {selectedUser?.isCreator && (
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  The creator account cannot be blocked
                </Typography>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUserDialog(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleSaveUserEdit}
            disabled={loading}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPanel;