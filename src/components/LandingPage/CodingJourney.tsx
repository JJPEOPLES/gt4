import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper,
  Chip,
  Divider,
  Grid,
  Card,
  Avatar,
  Fade
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BrushIcon from '@mui/icons-material/Brush';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import StarIcon from '@mui/icons-material/Star';

const journeyEvents = [
  {
    year: "2021",
    month: "January",
    title: "First Line of Code",
    description: "I wrote my first line of code at age 9. It was a simple 'Hello World' program in JavaScript.",
    icon: <CodeIcon />,
    color: "#6200EA"
  },
  {
    year: "2021",
    month: "March",
    title: "HTML & CSS Basics",
    description: "I learned the fundamentals of HTML and CSS by building a simple personal website about my favorite games.",
    icon: <LaptopMacIcon />,
    color: "#3700B3"
  },
  {
    year: "2021",
    month: "June",
    title: "First JavaScript Project",
    description: "Created a simple calculator app using JavaScript. It was basic but I was so proud of it!",
    icon: <CodeIcon />,
    color: "#6200EA"
  },
  {
    year: "2022",
    month: "January",
    title: "Learning React",
    description: "Started learning React by following tutorials and building small components. It was challenging but exciting!",
    icon: <CodeIcon />,
    color: "#03DAC6"
  },
  {
    year: "2022",
    month: "April",
    title: "Digital Art Exploration",
    description: "Began exploring digital art and realized there was a need for better free drawing tools.",
    icon: <BrushIcon />,
    color: "#BB86FC"
  },
  {
    year: "2022",
    month: "August",
    title: "First Drawing App Prototype",
    description: "Created my first prototype of a drawing application using HTML Canvas. It only had basic brush tools.",
    icon: <BrushIcon />,
    color: "#BB86FC"
  },
  {
    year: "2023",
    month: "January",
    title: "Learning TypeScript",
    description: "Started learning TypeScript to make my code more robust and easier to maintain.",
    icon: <SchoolIcon />,
    color: "#3700B3"
  },
  {
    year: "2025",
    month: "July 4",
    title: "GT4 Project Started",
    description: "Started the GT4 project on Independence Day with the goal of creating a professional drawing app in just 10 days!",
    icon: <StarIcon />,
    color: "#03DAC6"
  },
  {
    year: "2025",
    month: "July 6",
    title: "Core Drawing Engine",
    description: "Completed the core drawing engine with basic brush functionality and canvas interactions in just two days.",
    icon: <CodeIcon />,
    color: "#6200EA"
  },
  {
    year: "2025",
    month: "July 9",
    title: "Layer System",
    description: "Implemented the layer system and added support for blend modes, opacity controls, and layer management.",
    icon: <CodeIcon />,
    color: "#BB86FC"
  },
  {
    year: "2025",
    month: "July 12",
    title: "Advanced Features",
    description: "Added advanced features like custom brushes, filters, and image import/export capabilities.",
    icon: <CodeIcon />,
    color: "#6200EA"
  },
  {
    year: "2025",
    month: "July 14",
    title: "GT4 Released",
    description: "Completed and released GT4 Drawing Engine in just 10 days! Now working on adding the gallery and community features.",
    icon: <EmojiEventsIcon />,
    color: "#03DAC6"
  }
];

const CodingJourney: React.FC = () => {
  return (
    <Box id="journey" sx={{ 
      py: { xs: 8, md: 12 }, 
      bgcolor: 'background.default',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'rgba(98, 0, 234, 0.05)',
        filter: 'blur(100px)',
        top: '-200px',
        right: '-100px',
        zIndex: 0
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in={true} timeout={1000}>
          <Typography 
            variant="h2" 
            component="h2" 
            align="center"
            sx={{ 
              mb: 2, 
              fontWeight: 700,
              background: 'linear-gradient(90deg, #6200EA 0%, #B388FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            My Coding Journey
          </Typography>
        </Fade>
        
        <Fade in={true} timeout={1500}>
          <Typography 
            variant="h6" 
            align="center"
            color="text.secondary"
            sx={{ mb: 8, maxWidth: '800px', mx: 'auto' }}
          >
            From my first line of code to creating GT4 - here's how I taught myself programming and built this entire professional drawing engine in just 10 DAYS (July 4-14, 2025)!
          </Typography>
        </Fade>
        
        <Box sx={{ position: 'relative' }}>
          {/* Vertical line */}
          <Box sx={{ 
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '4px',
            bgcolor: 'rgba(98, 0, 234, 0.2)',
            transform: 'translateX(-50%)',
            display: { xs: 'none', md: 'block' }
          }} />
          
          <Grid container spacing={4}>
            {journeyEvents.map((event, index) => (
              <Grid 
                item 
                xs={12} 
                md={6} 
                key={index} 
                sx={{ 
                  textAlign: { md: index % 2 === 0 ? 'right' : 'left' },
                  pl: { md: index % 2 === 0 ? { xs: 2, md: 6 } : 2 },
                  pr: { md: index % 2 === 0 ? 2 : { xs: 2, md: 6 } },
                }}
              >
                <Fade in={true} timeout={1000 + (index * 200)}>
                  <Card 
                    elevation={3} 
                    sx={{ 
                      p: 3, 
                      mb: 3,
                      borderRadius: '12px',
                      position: 'relative',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                      },
                      borderLeft: index % 2 !== 0 ? `4px solid ${event.color}` : 'none',
                      borderRight: index % 2 === 0 ? `4px solid ${event.color}` : 'none',
                    }}
                  >
                    {/* Date chip */}
                    <Chip 
                      label={`${event.month} ${event.year}`}
                      size="small"
                      sx={{ 
                        position: 'absolute',
                        top: -10,
                        left: index % 2 === 0 ? 16 : 'auto',
                        right: index % 2 !== 0 ? 16 : 'auto',
                        bgcolor: event.color,
                        color: 'white',
                        fontWeight: 600
                      }}
                    />
                    
                    {/* Icon */}
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: { xs: 'flex-start', md: index % 2 === 0 ? 'flex-end' : 'flex-start' },
                      mb: 2
                    }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: event.color,
                          width: 48,
                          height: 48
                        }}
                      >
                        {event.icon}
                      </Avatar>
                    </Box>
                    
                    <Typography variant="h6" component="h3" fontWeight={600}>
                      {event.title}
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {event.description}
                    </Typography>
                    
                    {index === journeyEvents.length - 1 && (
                      <Box sx={{ mt: 2 }}>
                        <Chip 
                          label="Current" 
                          color="primary" 
                          size="small" 
                          sx={{ fontWeight: 600 }} 
                        />
                      </Box>
                    )}
                  </Card>
                </Fade>
              </Grid>
              ))}
          </Grid>
        </Box>
        
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            What's Next?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
            Today (July 14th) I just added the gallery feature to allow everyone to share their artwork! Next, I'm planning to add more brush types, layer effects, and collaborative drawing features. My goal is to make GT4 the best free drawing application available, proving that with determination and focus, amazing things can be built in record time!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default CodingJourney;