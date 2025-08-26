import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Chat as ChatIcon,
  Send as SendIcon,
  Close as CloseIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  Psychology as PsychologyIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Devices as DevicesIcon,
  RocketLaunch as RocketIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  ContactSupport as ContactIcon
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: '#f8fafc',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today? 😊",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (chatOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 300);
    }
  }, [chatOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: `I understand you said: "${inputValue}". This is a demo response. In a real app, this would be connected to an AI API like OpenAI.`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const openChatbot = () => setChatOpen(true);
  const closeChatbot = () => setChatOpen(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        {/* Navigation */}
        <AppBar position="fixed" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <BotIcon sx={{ mr: 2, fontSize: 32 }} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                AI Assistant
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              <Button color="inherit" onClick={() => scrollToSection('home')}>Home</Button>
              <Button color="inherit" onClick={() => scrollToSection('features')}>Features</Button>
              <Button color="inherit" onClick={() => scrollToSection('about')}>About</Button>
              <Button 
                variant="contained" 
                sx={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  '&:hover': { background: 'rgba(255,255,255,0.3)' } 
                }}
                onClick={openChatbot}
              >
                Try Chatbot
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Box id="home" sx={{ pt: 8, pb: 6, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center" sx={{ minHeight: '80vh' }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                  Your AI Assistant
                </Typography>
                <Typography variant="h5" paragraph sx={{ mb: 4, opacity: 0.9 }}>
                  Experience the future of conversation with our intelligent chatbot powered by advanced AI technology.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button 
                    variant="contained" 
                    size="large" 
                    startIcon={<ChatIcon />}
                    onClick={openChatbot}
                    sx={{ 
                      background: 'white', 
                      color: '#667eea',
                      '&:hover': { background: '#f8f9fa' }
                    }}
                  >
                    Start Chatting
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large" 
                    startIcon={<InfoIcon />}
                    onClick={() => scrollToSection('features')}
                    sx={{ borderColor: 'white', color: 'white' }}
                  >
                    Learn More
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  width: 300,
                  height: 300,
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  mx: 'auto'
                }}>
                  <BotIcon sx={{ fontSize: 120, opacity: 0.8 }} />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Features Section */}
        <Box id="features" sx={{ py: 8, background: '#f8fafc' }}>
          <Container maxWidth="lg">
            <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ mb: 6, fontWeight: 600 }}>
              Why Choose Our AI Assistant?
            </Typography>
            <Grid container spacing={4}>
              {[
                { icon: <PsychologyIcon />, title: 'Intelligent Responses', description: 'Powered by advanced AI models for natural, contextual conversations' },
                { icon: <SpeedIcon />, title: 'Lightning Fast', description: 'Get instant responses with our optimized AI processing' },
                { icon: <SecurityIcon />, title: 'Secure & Private', description: 'Your conversations are protected with enterprise-grade security' },
                { icon: <DevicesIcon />, title: 'Multi-Platform', description: 'Works seamlessly on desktop, tablet, and mobile devices' }
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      mb: 2,
                      color: 'primary.main',
                      fontSize: 48
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* About Section */}
        <Box id="about" sx={{ py: 8 }}>
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                  About Our AI Technology
                </Typography>
                <Typography variant="body1" paragraph sx={{ mb: 4, fontSize: '1.1rem' }}>
                  Our AI assistant leverages cutting-edge natural language processing to understand and respond to your queries intelligently. Whether you need help with work, learning, or just want to chat, our AI is here to assist you 24/7.
                </Typography>
                <Grid container spacing={3}>
                  {[
                    { value: '99.9%', label: 'Uptime' },
                    { value: '< 1s', label: 'Response Time' },
                    { value: '24/7', label: 'Availability' }
                  ].map((stat, index) => (
                    <Grid item xs={4} key={index}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stat.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  width: 250,
                  height: 250,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                  mx: 'auto'
                }}>
                  <RocketIcon sx={{ fontSize: 100, color: 'white' }} />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Chatbot Dialog */}
        <Dialog 
          open={chatOpen} 
          onClose={closeChatbot}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              height: '80vh',
              maxHeight: '80vh',
              borderRadius: 3,
              overflow: 'hidden'
            }
          }}
        >
          <DialogTitle sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BotIcon />
              <Typography variant="h6">AI Assistant</Typography>
            </Box>
            <IconButton onClick={closeChatbot} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          
          <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ 
              flexGrow: 1, 
              overflow: 'auto', 
              p: 2,
              background: '#f8fafc',
              minHeight: 400
            }}>
              <List>
                {messages.map((message) => (
                  <ListItem key={message.id} sx={{ 
                    display: 'flex', 
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    px: 0
                  }}>
                    <Paper sx={{ 
                      p: 2, 
                      maxWidth: '70%',
                      background: message.sender === 'user' 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                        : 'white',
                      color: message.sender === 'user' ? 'white' : 'text.primary',
                      borderRadius: message.sender === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                      <Typography variant="body1">
                        {message.text}
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        opacity: 0.7, 
                        display: 'block', 
                        mt: 1,
                        textAlign: message.sender === 'user' ? 'right' : 'left'
                      }}>
                        {message.timestamp.toLocaleTimeString()}
                      </Typography>
                    </Paper>
                  </ListItem>
                ))}
                {isTyping && (
                  <ListItem sx={{ display: 'flex', justifyContent: 'flex-start', px: 0 }}>
                    <Paper sx={{ p: 2, background: 'white', borderRadius: '20px 20px 20px 0' }}>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <CircularProgress size={16} />
                        <Typography variant="body2" color="text.secondary">
                          AI is typing...
                        </Typography>
                      </Box>
                    </Paper>
                  </ListItem>
                )}
                <div ref={messagesEndRef} />
              </List>
            </Box>
            
            <Box sx={{ p: 2, background: 'white', borderTop: '1px solid #e0e0e0' }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  ref={inputRef}
                  fullWidth
                  multiline
                  maxRows={4}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  variant="outlined"
                  size="small"
                  sx={{ 
                    '& .MuiOutlinedInput-root': { borderRadius: 3 }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  sx={{ 
                    minWidth: 56, 
                    height: 56,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}
                >
                  <SendIcon />
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>

        {/* Floating Chat Button */}
        <Fab
          color="primary"
          aria-label="chat"
          onClick={openChatbot}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
            }
          }}
        >
          <ChatIcon />
        </Fab>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
