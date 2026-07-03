import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SearchIcon from '@mui/icons-material/Search';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

function matchesSearch(post, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return true;
  }

  const searchableText = [
    post.postProfile,
    post.postDesc,
    String(post.reqExperience),
    ...(post.postTechStack || []),
  ]
    .join(' ')
    .toLowerCase();

  return searchableText.includes(normalizedQuery);
}

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/jobPosts');
      setPosts(response.data);
    } catch (err) {
      setError('Unable to load job posts. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filteredPosts = useMemo(
    () => posts.filter((post) => matchesSearch(post, searchQuery)),
    [posts, searchQuery],
  );

  const handleEdit = (id) => {
    navigate('/edit', { state: { id } });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/jobPost/${id}`);
      setPosts((current) => current.filter((post) => post.postId !== id));
    } catch (err) {
      setError('Unable to delete this job post.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress size={48} />
      </Box>
    );
  }

  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          background:
            'linear-gradient(135deg, rgba(79, 70, 229, 0.95) 0%, rgba(14, 165, 233, 0.92) 100%)',
          color: 'white',
        }}
      >
        <Typography variant="h4" sx={{ mb: 1 }}>
          Browse open roles
        </Typography>
        <Typography sx={{ opacity: 0.92, maxWidth: 620, mb: 3 }}>
          Search by job title, skills, experience, or description to quickly find
          the right opportunity.
        </Typography>

        <TextField
          fullWidth
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search jobs by role, skills, or description..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'white',
              borderRadius: 3,
            },
          }}
        />
      </Paper>

      {error && <Alert severity="error">{error}</Alert>}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography color="text.secondary">
          Showing {filteredPosts.length} of {posts.length} jobs
        </Typography>
        {searchQuery && (
          <Chip
            label={`Search: ${searchQuery}`}
            onDelete={() => setSearchQuery('')}
            color="primary"
            variant="outlined"
          />
        )}
      </Box>

      {filteredPosts.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            py: 8,
            px: 3,
            textAlign: 'center',
            borderRadius: 4,
            border: '1px dashed rgba(148, 163, 184, 0.5)',
          }}
        >
          <WorkOutlineIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No jobs found
          </Typography>
          <Typography color="text.secondary">
            {searchQuery
              ? 'Try a different search term or clear the search bar.'
              : 'Create a job post to get started.'}
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredPosts.map((post) => (
            <Grid key={post.postId} item xs={12} md={6} lg={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 18px 40px rgba(15, 23, 42, 0.12)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Stack spacing={2}>
                    <Box>
                      <Chip
                        label={`${post.reqExperience} yrs exp`}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ mb: 1.5 }}
                      />
                      <Typography variant="h5">{post.postProfile}</Typography>
                    </Box>

                    <Typography color="text.secondary" sx={{ minHeight: 72 }}>
                      {post.postDesc}
                    </Typography>

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mb: 1 }}
                      >
                        Required skills
                      </Typography>
                      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        {(post.postTechStack?.length
                          ? post.postTechStack
                          : ['No skills listed']
                        ).map((skill) => (
                          <Chip
                            key={`${post.postId}-${skill}`}
                            label={skill}
                            size="small"
                            sx={{ bgcolor: 'rgba(79, 70, 229, 0.08)' }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>

                <Box
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderTop: '1px solid rgba(148, 163, 184, 0.16)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 0.5,
                  }}
                >
                  <Tooltip title="Edit job">
                    <IconButton
                      aria-label="edit job post"
                      onClick={() => handleEdit(post.postId)}
                      sx={{ color: 'primary.main' }}
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete job">
                    <IconButton
                      aria-label="delete job post"
                      onClick={() => handleDelete(post.postId)}
                      sx={{ color: 'error.main' }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
};

export default AllPosts;
