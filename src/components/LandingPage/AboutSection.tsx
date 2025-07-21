import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Button, 
  Container, 
  Card, 
  CardContent, 
  Chip,
  Fade,
  Slide,
  Divider,
  Avatar
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const skills = [
  { name: "JavaScript", level: 90 },
  { name: "React", level: 85 },
  { name: "TypeScript", level: 80 },
  { name: "HTML/CSS", level: 95 },
  { name: "Digital Art", level: 88 },
];

const milestones = [
  { year: "2022", achievement: "Started learning to code" },
  { year: "2023", achievement: "Created my first web app" },
  { year: "2023", achievement: "Learned React and TypeScript" },
  { year: "2024", achievement: "Built GT4 Drawing Engine" },
];

const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('story');
  
  return (
    <Box id="about" sx={{ 
      py: { xs: 8, md: 12 }, 
      bgcolor: 'background.paper',
      position: 'relative',
      overflow: 'hidden',
      '&::after': {
        content: '""',
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'rgba(98, 0, 234, 0.07)',
        filter: 'blur(100px)',
        bottom: '-250px',
        right: '-100px',
        zIndex: 0
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Slide direction="right" in={true} timeout={1000}>
              <Box>
                <Typography 
                  variant="h2" 
                  component="h2"
                  sx={{ 
                    mb: 1, 
                    fontWeight: 800,
                    background: 'linear-gradient(90deg, #6200EA 0%, #B388FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Hi, I'm the Creator!
                </Typography>
                
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 4, 
                    fontWeight: 500,
                    color: 'text.secondary'
                  }}
                >
                  An 11-year-old developer with big dreams
                </Typography>
                
                <Box sx={{ mb: 4, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip icon={<CodeIcon />} label="Coder" color="primary" sx={{ fontWeight: 600 }} />
                  <Chip icon={<BrushIcon />} label="Artist" color="secondary" sx={{ fontWeight: 600 }} />
                  <Chip icon={<SchoolIcon />} label="Student" sx={{ fontWeight: 600 }} />
                  <Chip icon={<EmojiEventsIcon />} label="Creator" sx={{ fontWeight: 600 }} />
                </Box>
                
                <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', fontSize: '1.1rem' }}>
                  GT4 was created by me, an 11-year-old developer with a passion for art, chaos, and coding. I built this app 
                  because I wanted to make professional-grade digital art tools accessible to everyone, especially kids like me.
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', fontSize: '1.1rem' }}>
                  I taught myself how to code and created this entire drawing engine on my own. My goal was to build something 
                  that rivals expensive applications like Procreate, while keeping it completely free and web-based so anyone can use it.
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', fontSize: '1.1rem' }}>
                  GT4 is my passion project, and I'm constantly adding new features and improvements. I hope you enjoy using 
                  it as much as I enjoyed creating it. This proves that age is just a number when it comes to building cool things!
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    size="large"
                    sx={{ 
                      borderRadius: '30px',
                      py: 1.2,
                      px: 3,
                      fontWeight: 600
                    }}
                  >
                    Try GT4 Now
                  </Button>
                  
                  <Button 
                    variant="outlined" 
                    color="primary"
                    size="large"
                    href="#journey"
                    sx={{ 
                      borderRadius: '30px',
                      py: 1.2,
                      px: 3,
                      borderWidth: 2,
                      fontWeight: 600,
                      '&:hover': {
                        borderWidth: 2
                      }
                    }}
                  >
                    My Coding Journey
                  </Button>
                </Box>
              </Box>
            </Slide>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Slide direction="left" in={true} timeout={1000}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      gap: 2, 
                      backgroundColor: 'background.default',
                      borderRadius: '30px',
                      padding: '4px',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Button 
                      variant={activeTab === 'story' ? 'contained' : 'text'}
                      color="primary"
                      onClick={() => setActiveTab('story')}
                      sx={{ 
                        borderRadius: '30px',
                        px: 3,
                        fontWeight: 600
                      }}
                    >
                      My Story
                    </Button>
                    <Button 
                      variant={activeTab === 'skills' ? 'contained' : 'text'}
                      color="primary"
                      onClick={() => setActiveTab('skills')}
                      sx={{ 
                        borderRadius: '30px',
                        px: 3,
                        fontWeight: 600
                      }}
                    >
                      My Skills
                    </Button>
                  </Box>
                </Box>
                
                {activeTab === 'story' ? (
                  <Fade in={activeTab === 'story'} timeout={500}>
                    <Card 
                      sx={{ 
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <Box 
                        component="img"
                        src="/gt4-artwork (3).png"
                        alt="GT4 Artwork Example"
                        sx={{
                          width: '100%',
                          height: '250px',
                          objectFit: 'cover'
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1, p: 4 }}>
                        <Typography variant="h5" gutterBottom fontWeight={700}>
                          My Journey as a Young Developer
                        </Typography>
                        
                        <Box sx={{ mt: 3 }}>
                          {milestones.map((milestone, index) => (
                            <Box key={index} sx={{ display: 'flex', mb: 2 }}>
                              <Box 
                                sx={{ 
                                  width: '80px', 
                                  fontWeight: 700, 
                                  color: 'primary.main',
                                  fontSize: '1.1rem'
                                }}
                              >
                                {milestone.year}
                              </Box>
                              <Box>
                                <Typography variant="body1">
                                  {milestone.achievement}
                                </Typography>
                                {index < milestones.length - 1 && (
                                  <Box 
                                    sx={{ 
                                      height: '20px', 
                                      borderLeft: '2px dashed', 
                                      borderColor: 'primary.light',
                                      ml: '3px',
                                      mt: '4px'
                                    }} 
                                  />
                                )}
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Fade>
                ) : (
                  <Fade in={activeTab === 'skills'} timeout={500}>
                    <Card 
                      sx={{ 
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                        height: '100%'
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Typography variant="h5" gutterBottom fontWeight={700}>
                          Skills I've Learned
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                          Even though I'm only 11, I've worked hard to learn these technologies:
                        </Typography>
                        
                        <Box sx={{ mt: 4 }}>
                          {skills.map((skill, index) => (
                            <Box key={index} sx={{ mb: 3 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body1" fontWeight={600}>
                                  {skill.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {skill.level}%
                                </Typography>
                              </Box>
                              <Box 
                                sx={{ 
                                  width: '100%', 
                                  height: '8px', 
                                  bgcolor: 'background.default',
                                  borderRadius: '4px',
                                  overflow: 'hidden'
                                }}
                              >
                                <Box 
                                  sx={{ 
                                    width: `${skill.level}%`, 
                                    height: '100%', 
                                    background: 'linear-gradient(90deg, #6200EA 0%, #B388FF 100%)',
                                    borderRadius: '4px',
                                    transition: 'width 1s ease-in-out'
                                  }} 
                                />
                              </Box>
                            </Box>
                          ))}
                        </Box>
                        
                        <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar 
                            sx={{ 
                              width: 60, 
                              height: 60, 
                              bgcolor: 'primary.main',
                              fontWeight: 700,
                              fontSize: '1.5rem'
                            }}
                          >
                            11
                          </Avatar>
                          <Box>
                            <Typography variant="body1" fontWeight={600}>
                              Age is just a number
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              When you're passionate about creating cool things!
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Fade>
                )}
              </Box>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSection;
