import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Button,
  TextField,
  IconButton,
  Tooltip,
  Badge,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  Send as SendIcon,
  Close as CloseIcon,
  Star as StarIcon,
  Brush as BrushIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { useAuth } from '../Auth/AuthContext';
import { collection, query, where, getDocs, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

interface CollaboratorType {
  id: string;
  displayName: string;
  isCreator: boolean;
  isActive: boolean;
  lastActive: Date;
  role: 'owner' | 'editor' | 'viewer';
}

interface MessageType {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Date;
}

interface CollabPanelProps {
  projectId: string;
  isOwner: boolean;
}

const CollabPanel: React.FC<CollabPanelProps> = ({ projectId, isOwner }) => {
  const { currentUser, userProfile } = useAuth();
  const [collaborators, setCollaborators] = useState<CollaboratorType[]>([]);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [messageText, setMessageText] = useState('');
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'editor' | 'viewer'>('editor');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch collaborators
  useEffect(() => {
    if (!projectId) return;

    const unsubscribe = onSnapshot(
      collection(db, `projects/${projectId}/collaborators`),
      (snapshot) => {
        const collaboratorsList: CollaboratorType[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          collaboratorsList.push({
            id: doc.id,
            displayName: data.displayName,
            isCreator: data.isCreator,
            isActive: data.isActive,
            lastActive: data.lastActive?.toDate() || new Date(),
            role: data.role
          });
        });
        setCollaborators(collaboratorsList);
      }
    );

    return () => unsubscribe();
  }, [projectId]);

  // Fetch messages
  useEffect(() => {
    if (!projectId) return;

    const unsubscribe = onSnapshot(
      query(
        collection(db, `projects/${projectId}/messages`),
        // Order by timestamp
        // limit to 50 messages
      ),
      (snapshot) => {
        const messagesList: MessageType[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          messagesList.push({
            id: doc.id,
            senderId: data.senderId,
            senderName: data.senderName,
            text: data.text,
            timestamp: data.timestamp?.toDate() || new Date()
          });
        });
        // Sort messages by timestamp
        messagesList.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        setMessages(messagesList);
      }
    );

    return () => unsubscribe();
  }, [projectId]);

  const handleSendMessage = async () => {
    if (!messageText.trim() || !currentUser || !userProfile) return;

    try {
      await addDoc(collection(db, `projects/${projectId}/messages`), {
        senderId: currentUser.uid,
        senderName: userProfile.displayName,
        text: messageText,
        timestamp: serverTimestamp()
      });
      setMessageText('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const handleInviteUser = async () => {
    if (!inviteEmail.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      // Check if user exists
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', inviteEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('No user found with this email address. They need to create an account first.');
        setIsLoading(false);
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      // Check if user is already a collaborator
      const collaboratorsRef = collection(db, `projects/${projectId}/collaborators`);
      const collaboratorQuery = query(collaboratorsRef, where('id', '==', userDoc.id));
      const collaboratorSnapshot = await getDocs(collaboratorQuery);

      if (!collaboratorSnapshot.empty) {
        setError('This user is already a collaborator on this project.');
        setIsLoading(false);
        return;
      }

      // Add user as collaborator
      await addDoc(collaboratorsRef, {
        id: userDoc.id,
        displayName: userData.displayName,
        isCreator: userData.isCreator,
        isActive: false,
        lastActive: serverTimestamp(),
        role: inviteRole
      });

      // Close dialog and reset form
      setInviteDialogOpen(false);
      setInviteEmail('');
      setInviteRole('editor');
    } catch (err) {
      console.error('Error inviting user:', err);
      setError('An error occurred while inviting the user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        bgcolor: 'primary.main', 
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6">Live Collaboration</Typography>
        {isOwner && (
          <Button
            startIcon={<PersonAddIcon />}
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => setInviteDialogOpen(true)}
          >
            Invite
          </Button>
        )}
      </Box>

      {/* Collaborators List */}
      <Box sx={{ p: 2, bgcolor: 'background.default' }}>
        <Typography variant="subtitle2" gutterBottom>
          Active Collaborators ({collaborators.filter(c => c.isActive).length}/{collaborators.length})
        </Typography>
        <List dense>
          {collaborators.map((collaborator) => (
            <ListItem 
              key={collaborator.id}
              secondaryAction={
                <Chip 
                  size="small" 
                  label={collaborator.role} 
                  color={collaborator.role === 'owner' ? 'primary' : (collaborator.role === 'editor' ? 'secondary' : 'default')}
                />
              }
            >
              <ListItemAvatar>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    collaborator.isCreator ? (
                      <StarIcon sx={{ fontSize: 12, color: '#FFD700' }} />
                    ) : null
                  }
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: collaborator.isActive ? 'success.main' : 'grey.400',
                      border: collaborator.isCreator ? '2px solid #FFD700' : 'none'
                    }}
                  >
                    {collaborator.displayName.charAt(0).toUpperCase()}
                  </Avatar>
                </Badge>
              </ListItemAvatar>
              <ListItemText 
                primary={collaborator.displayName}
                secondary={
                  collaborator.isActive 
                    ? 'Currently active' 
                    : `Last active: ${collaborator.lastActive.toLocaleString()}`
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider />

      {/* Chat Section */}
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        p: 2,
        overflow: 'auto',
        maxHeight: '300px'
      }}>
        <Typography variant="subtitle2" gutterBottom>
          Chat
        </Typography>
        
        <Box sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
          {messages.length === 0 ? (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
              No messages yet. Start the conversation!
            </Typography>
          ) : (
            messages.map((message) => (
              <Box 
                key={message.id}
                sx={{ 
                  mb: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: message.senderId === currentUser?.uid ? 'flex-end' : 'flex-start'
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mb: 0.5
                }}>
                  <Typography variant="caption" color="text.secondary">
                    {message.senderId === currentUser?.uid ? 'You' : message.senderName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Box>
                <Paper 
                  sx={{ 
                    p: 1.5,
                    borderRadius: '12px',
                    maxWidth: '80%',
                    bgcolor: message.senderId === currentUser?.uid ? 'primary.light' : 'background.default',
                    color: message.senderId === currentUser?.uid ? 'white' : 'text.primary'
                  }}
                >
                  <Typography variant="body2">
                    {message.text}
                  </Typography>
                </Paper>
              </Box>
            ))
          )}
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={!currentUser}
            InputProps={{
              sx: { borderRadius: '20px' }
            }}
          />
          <IconButton 
            color="primary" 
            onClick={handleSendMessage}
            disabled={!messageText.trim() || !currentUser}
            sx={{ ml: 1 }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Invite Dialog */}
      <Dialog 
        open={inviteDialogOpen} 
        onClose={() => setInviteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Invite Collaborator
          <IconButton
            aria-label="close"
            onClick={() => setInviteDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {error && (
            <Box sx={{ mb: 2 }}>
              <Typography color="error">{error}</Typography>
            </Box>
          )}
          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            disabled={isLoading}
            helperText="Enter the email address of the user you want to invite"
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Collaboration Role
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Tooltip title="Can edit the artwork">
                <Button
                  variant={inviteRole === 'editor' ? 'contained' : 'outlined'}
                  color="primary"
                  startIcon={<BrushIcon />}
                  onClick={() => setInviteRole('editor')}
                  disabled={isLoading}
                >
                  Editor
                </Button>
              </Tooltip>
              <Tooltip title="Can only view the artwork">
                <Button
                  variant={inviteRole === 'viewer' ? 'contained' : 'outlined'}
                  color="secondary"
                  startIcon={<VisibilityIcon />}
                  onClick={() => setInviteRole('viewer')}
                  disabled={isLoading}
                >
                  Viewer
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setInviteDialogOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleInviteUser}
            variant="contained"
            color="primary"
            disabled={isLoading || !inviteEmail.trim()}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isLoading ? 'Inviting...' : 'Send Invitation'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CollabPanel;