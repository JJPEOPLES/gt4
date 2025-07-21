import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  Button, 
  Fade, 
  Zoom, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  Modal,
  Divider,
  CircularProgress,
  Avatar,
  Chip,
  Tooltip
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import GroupIcon from '@mui/icons-material/Group';
import { useAuth } from '../Auth/AuthContext';

// Firebase imports
import { db, storage } from '../../firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';

// Initial artworks
const initialArtworks = [
  { 
    id: 1,
    src: "/gt4-artwork.png", 
    label: "Digital Masterpiece", 
    description: "Created with GT4's advanced brush tools",
    height: 240,
    artist: "Prime",
    isCreator: true,
    collaborators: []
  },
  { 
    id: 2,
    src: "/gt4-artwork (1).png", 
    label: "Creative Expression", 
    description: "Showcasing the power of layers and blending",
    height: 280,
    artist: "DigitalDreamer",
    isCreator: false,
    collaborators: ["ArtisticSoul", "ColorMaster"]
  },
  { 
    id: 3,
    src: "/gt4-artwork (2).png", 
    label: "Artistic Vision", 
    description: "Demonstrating GT4's color manipulation features",
    height: 220,
    artist: "ColorMaster"
  },
  { 
    id: 4,
    src: "/gt4-artwork (3).png", 
    label: "Digital Landscape", 
    description: "Utilizing the full range of GT4's texture brushes",
    height: 260,
    artist: "BrushWizard"
  },
  { 
    id: 5,
    src: "/gt4-artwork (4).png", 
    label: "Emotive Contrast", 
    description: "Created by an 11-year-old artist using GT4",
    height: 230,
    artist: "YoungCreator"
  },
  { 
    id: 6,
    src: "/gt4-artwork (6).png", 
    label: "Creative Masterpiece", 
    description: "Pushing the boundaries of digital art with GT4",
    height: 250,
    artist: "ArtExplorer"
  },
  { 
    id: 7,
    src: "/gt4-artwork (4).png", 
    label: "Abstract Thoughts", 
    description: "Expressing emotions through abstract shapes and colors",
    height: 240,
    artist: "MindArtist"
  },
  { 
    id: 8,
    src: "/gt4-artwork (2).png", 
    label: "Digital Dreams", 
    description: "A journey through the digital landscape of imagination",
    height: 260,
    artist: "DreamWeaver"
  },
  { 
    id: 9,
    src: "/gt4-artwork (1).png", 
    label: "Colorful Imagination", 
    description: "Vibrant colors bringing imagination to life",
    height: 230,
    artist: "ColorfulKid"
  },
  { 
    id: 10,
    src: "/gt4-artwork.png", 
    label: "Future Vision", 
    description: "A glimpse into the future of digital art",
    height: 250,
    artist: "FutureThinker"
  },
];

const GallerySection: React.FC = () => {
  const { currentUser, userProfile, isCreator } = useAuth();
  const [artworks, setArtworks] = useState<any[]>([]);
  const [visibleItems, setVisibleItems] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("success");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [openCollabDialog, setOpenCollabDialog] = useState(false);
  const [collaboratorEmail, setCollaboratorEmail] = useState("");
  
  // Form state
  const [newArtwork, setNewArtwork] = useState({
    label: "",
    description: "",
    artist: userProfile?.displayName || "",
    imageFile: null,
    imagePreview: "",
    isCollaborative: false,
    collaborators: []
  });
  
  // Number of items to show initially
  const initialItemCount = 6;
  
  // Fetch artworks from Firebase
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setIsLoading(true);
        const artworksCollection = collection(db, "artworks");
        const artworksQuery = query(artworksCollection, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(artworksQuery);
        
        const fetchedArtworks = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // If no artworks in Firebase yet, use initial ones
        if (fetchedArtworks.length === 0) {
          setArtworks(initialArtworks);
        } else {
          setArtworks(fetchedArtworks);
        }
      } catch (error) {
        console.error("Error fetching artworks:", error);
        setSnackbarMessage("Failed to load gallery artworks. Please try again later.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        
        // Fallback to initial artworks
        setArtworks(initialArtworks);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArtworks();
  }, []);
  
  // Animation effect to gradually reveal gallery items
  useEffect(() => {
    if (isLoading) return;
    
    const timer = setInterval(() => {
      setVisibleItems(prev => {
        if (prev < Math.min(artworks.length, initialItemCount)) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 200);
    
    return () => clearInterval(timer);
  }, [artworks.length, isLoading]);

  // Handle image selection
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setNewArtwork({
            ...newArtwork,
            imageFile: file,
            imagePreview: e.target.result as string,
            isCollaborative: newArtwork.isCollaborative,
            collaborators: newArtwork.collaborators
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewArtwork({
      ...newArtwork,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!newArtwork.imagePreview || !newArtwork.label || !newArtwork.artist) {
      setSnackbarMessage("Please fill in all required fields");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Generate a unique filename
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2, 8);
      const filename = `artwork_${timestamp}_${randomId}`;
      
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `gallery/${filename}`);
      
      // Remove the data:image/jpeg;base64, part
      const imageData = newArtwork.imagePreview.split(',')[1];
      
      // Upload as base64 data
      await uploadString(storageRef, imageData, 'base64');
      
      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      
      // Create artwork document in Firestore
      const artworkData = {
        src: downloadURL,
        label: newArtwork.label,
        description: newArtwork.description || "Created with GT4 Drawing Engine",
        height: 240 + Math.floor(Math.random() * 40),
        artist: currentUser ? userProfile?.displayName : newArtwork.artist,
        isCreator: currentUser ? isCreator : (newArtwork.artist.toLowerCase() === 'prime'),
        createdAt: new Date().toISOString(),
        storagePath: `gallery/${filename}`,
        userId: currentUser?.uid || null,
        isCollaborative: newArtwork.isCollaborative,
        collaborators: newArtwork.collaborators || []
      };
      
      const docRef = await addDoc(collection(db, "artworks"), artworkData);
      
      // Add to local state with the Firestore ID
      const newArt = {
        id: docRef.id,
        ...artworkData
      };
      
      setArtworks([newArt, ...artworks]);
      setOpenPostDialog(false);
      setSnackbarMessage("Your artwork has been added to the gallery and will be visible to everyone!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      
      // Reset form
      setNewArtwork({
        label: "",
        description: "",
        artist: "",
        imageFile: null,
        imagePreview: "",
        isCollaborative: false,
        collaborators: []
      });
    } catch (error) {
      console.error("Error uploading artwork:", error);
      setSnackbarMessage("Failed to upload artwork. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsUploading(false);
    }
  };
  
  // Handle view more button click
  const handleViewMore = () => {
    setShowAll(true);
    // Animate the newly visible items
    let count = visibleItems;
    const timer = setInterval(() => {
      if (count < artworks.length) {
        count++;
        setVisibleItems(count);
      } else {
        clearInterval(timer);
      }
    }, 100);
  };
  
  // Open image in modal
  const handleImageClick = (artwork: any) => {
    setSelectedImage(artwork.src);
    setSelectedArtwork(artwork);
    setOpenImageModal(true);
  };
  
  // Remove an artwork from the gallery
  const handleRemoveArtwork = async (id: string, storagePath: string) => {
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, "artworks", id));
      
      // Delete from Storage if it's a user-uploaded image
      if (storagePath) {
        const imageRef = ref(storage, storagePath);
        await deleteObject(imageRef);
      }
      
      // Update local state
      const updatedArtworks = artworks.filter(art => art.id !== id);
      setArtworks(updatedArtworks);
      
      setSnackbarMessage("Artwork removed from gallery");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      
      // Close modal if open
      if (openImageModal) {
        setOpenImageModal(false);
      }
    } catch (error) {
      console.error("Error removing artwork:", error);
      setSnackbarMessage("Failed to remove artwork. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box id="gallery" sx={{ 
      py: { xs: 6, md: 10 }, 
      bgcolor: 'background.default',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'rgba(98, 0, 234, 0.05)',
        filter: 'blur(100px)',
        top: '10%',
        left: '-300px',
        zIndex: 0
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Fade in={true} timeout={1000}>
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(90deg, #6200EA 0%, #B388FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Gallery of Creations
            </Typography>
          </Fade>
          
          <Fade in={true} timeout={1500}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpenPostDialog(true)}
              sx={{
                borderRadius: '30px',
                py: 1,
                px: 3,
                fontWeight: 600,
                boxShadow: '0 4px 10px rgba(98, 0, 234, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 15px rgba(98, 0, 234, 0.4)',
                }
              }}
            >
              Post to Gallery
            </Button>
          </Fade>
        </Box>

        <Fade in={true} timeout={1500}>
          <Typography 
            variant="h6" 
            align="left"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: '800px' }}
          >
            Check out what artists have created with GT4! These artworks showcase what's possible
            when everyone has access to powerful digital art tools. Share your own creations too!
          </Typography>
        </Fade>

        <Box sx={{ mb: 6 }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress color="primary" />
            </Box>
          ) : artworks.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No artworks found in the gallery.
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenPostDialog(true)}
                sx={{ mt: 2 }}
              >
                Be the first to post!
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {artworks.slice(0, showAll ? artworks.length : initialItemCount).map((art, index) => (
                <Grid 
                  item 
                  xs={12} 
                  sm={6} 
                  md={index % 3 === 0 ? 4 : (index % 3 === 1 ? 5 : 3)} 
                  key={art.id}
                >
                  <Zoom in={index < visibleItems} timeout={500}>
                    <Card 
                      sx={{ 
                        borderRadius: '12px',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                        '&:hover': {
                          transform: 'translateY(-12px) scale(1.02)',
                          boxShadow: '0 15px 30px rgba(98, 0, 234, 0.2)',
                          '& .overlay': { opacity: 1 }
                        },
                        cursor: 'pointer'
                      }}
                      onClick={() => handleImageClick(art)}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <Box 
                          component="img"
                          src={art.src}
                          alt={art.label}
                          sx={{ 
                            width: '100%', 
                            height: art.height, 
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease',
                            '&:hover': {
                              transform: 'scale(1.05)'
                            }
                          }}
                        />
                        <Box 
                          className="overlay"
                          sx={{ 
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(98, 0, 234, 0.5) 100%)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            padding: 3,
                            opacity: 0,
                            transition: 'opacity 0.4s ease'
                          }}
                        >
                          <Typography variant="h6" color="white" fontWeight={700} gutterBottom>
                            {art.label}
                          </Typography>
                          <Typography variant="body2" color="white" align="center" gutterBottom>
                            {art.description}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Typography variant="caption" color="white" sx={{ opacity: 0.8 }}>
                              by 
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                              <Typography variant="caption" color="white" fontWeight={600}>
                                {art.artist}
                              </Typography>
                              {art.isCreator && (
                                <Tooltip title="GT4 Creator">
                                  <StarIcon sx={{ ml: 0.5, fontSize: 14, color: '#FFD700' }} />
                                </Tooltip>
                              )}
                            </Box>
                          </Box>
                          
                          {art.collaborators && art.collaborators.length > 0 && (
                            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                              <GroupIcon sx={{ fontSize: 14, color: 'white', opacity: 0.8, mr: 0.5 }} />
                              <Typography variant="caption" color="white" sx={{ opacity: 0.8 }}>
                                Collaborators: {art.collaborators.join(', ')}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Card>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
        
        {!showAll && artworks.length > initialItemCount && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="outlined" 
              color="primary"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={handleViewMore}
              sx={{ 
                borderRadius: '30px',
                py: 1.2,
                px: 4,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  backgroundColor: 'rgba(98, 0, 234, 0.05)'
                }
              }}
            >
              View More Artwork ({artworks.length - initialItemCount} more)
            </Button>
          </Box>
        )}
      </Container>
      
      {/* Post to Gallery Dialog */}
      <Dialog 
        open={openPostDialog} 
        onClose={() => setOpenPostDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(90deg, #6200EA 0%, #B388FF 100%)',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6" component="div" fontWeight={600}>
            Share Your Artwork
          </Typography>
          <IconButton 
            edge="end" 
            color="inherit" 
            onClick={() => setOpenPostDialog(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            {newArtwork.imagePreview ? (
              <Box 
                sx={{ 
                  position: 'relative',
                  width: '100%',
                  height: 250,
                  borderRadius: 2,
                  overflow: 'hidden',
                  mb: 2
                }}
              >
                <Box 
                  component="img"
                  src={newArtwork.imagePreview}
                  alt="Preview"
                  sx={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'rgba(0,0,0,0.7)'
                    }
                  }}
                  onClick={() => setNewArtwork({...newArtwork, imageFile: null, imagePreview: ""})}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            ) : (
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ 
                  height: 200,
                  width: '100%',
                  borderStyle: 'dashed',
                  borderWidth: 2,
                  borderColor: 'rgba(98, 0, 234, 0.3)',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  '&:hover': {
                    borderColor: 'primary.main'
                  }
                }}
              >
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageSelect}
                />
                <ImageIcon sx={{ fontSize: 48, color: 'primary.main', opacity: 0.7 }} />
                <Typography>Click to upload your artwork</Typography>
                <Typography variant="caption" color="text.secondary">
                  PNG, JPG, or GIF (max 5MB)
                </Typography>
              </Button>
            )}
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="label"
                label="Artwork Title"
                value={newArtwork.label}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                value={newArtwork.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="artist"
                label="Your Name/Username"
                value={newArtwork.artist}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
                disabled={!!currentUser}
                helperText={currentUser ? "Using your account name" : "Enter your name or username"}
              />
            </Grid>
            
            {currentUser && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2">Enable Collaboration</Typography>
                  <Button 
                    variant="outlined" 
                    size="small"
                    color={newArtwork.isCollaborative ? "primary" : "inherit"}
                    onClick={() => setNewArtwork({
                      ...newArtwork,
                      isCollaborative: !newArtwork.isCollaborative
                    })}
                    startIcon={<GroupIcon />}
                  >
                    {newArtwork.isCollaborative ? "Enabled" : "Disabled"}
                  </Button>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Allow others to collaborate on this artwork
                </Typography>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={() => setOpenPostDialog(false)}
            variant="outlined"
            sx={{ borderRadius: '8px' }}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            sx={{ 
              borderRadius: '8px',
              px: 3
            }}
            disabled={isUploading || !newArtwork.imagePreview || !newArtwork.label || !newArtwork.artist}
            startIcon={isUploading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isUploading ? 'Uploading...' : 'Post to Gallery'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Image Modal */}
      <Modal
        open={openImageModal}
        onClose={() => setOpenImageModal(false)}
        aria-labelledby="image-modal"
        aria-describedby="view full artwork"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '70%' },
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}>
            <Typography variant="h6" component="div">
              {selectedArtwork?.label}
            </Typography>
            <Box>
              {selectedArtwork?.storagePath && (
                <IconButton
                  color="error"
                  onClick={() => handleRemoveArtwork(selectedArtwork.id, selectedArtwork.storagePath)}
                  sx={{ mr: 1 }}
                  title="Delete artwork"
                >
                  <DeleteIcon />
                </IconButton>
              )}
              <IconButton
                onClick={() => setOpenImageModal(false)}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          
          <Box sx={{ position: 'relative', flexGrow: 1, overflow: 'auto' }}>
            <Box 
              component="img"
              src={selectedImage}
              alt="Full size artwork"
              sx={{ 
                width: '100%',
                maxHeight: '70vh',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </Box>
          
          <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body1" gutterBottom>
              {selectedArtwork?.description}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Created by 
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                <Typography variant="body2" fontWeight={600}>
                  {selectedArtwork?.artist}
                </Typography>
                {selectedArtwork?.isCreator && (
                  <Tooltip title="GT4 Creator">
                    <StarIcon sx={{ ml: 0.5, fontSize: 16, color: '#FFD700' }} />
                  </Tooltip>
                )}
              </Box>
            </Box>
            
            {selectedArtwork?.collaborators && selectedArtwork.collaborators.length > 0 && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                  <GroupIcon sx={{ fontSize: 18, mr: 0.5 }} /> Collaborators:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                  {selectedArtwork.collaborators.map((collab: string) => (
                    <Chip 
                      key={collab} 
                      label={collab} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                  ))}
                </Box>
              </Box>
            )}
            
            {currentUser && selectedArtwork?.isCollaborative && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<GroupIcon />}
                sx={{ mt: 2 }}
                onClick={() => setOpenCollabDialog(true)}
              >
                Request to Collaborate
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
      
      {/* Collaboration Request Dialog */}
      <Dialog
        open={openCollabDialog}
        onClose={() => setOpenCollabDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Request to Collaborate
          <IconButton
            aria-label="close"
            onClick={() => setOpenCollabDialog(false)}
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
          <Typography variant="body2" paragraph>
            Send a collaboration request to join this project. The owner will need to approve your request.
          </Typography>
          
          <TextField
            label="Message to Owner"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            placeholder="Explain why you'd like to collaborate on this artwork..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCollabDialog(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              setSnackbarMessage("Collaboration request sent successfully!");
              setSnackbarSeverity("success");
              setSnackbarOpen(true);
              setOpenCollabDialog(false);
            }}
          >
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GallerySection;
