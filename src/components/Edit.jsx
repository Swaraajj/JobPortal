import { useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
  Stack,
  Divider,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/client';
import { initialJobForm, SKILL_SET, toggleSkill } from '../constants/jobForm';

const fieldSx = { width: '100%' };

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialJobForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const postId = location.state?.id;

  useEffect(() => {
    if (!postId) {
      setError('No job post selected for editing.');
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await api.get(`/jobPost/${postId}`);
        setForm(response.data);
      } catch (err) {
        setError('Unable to load job post.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      await api.post('/jobPost', form);
      navigate('/');
    } catch (err) {
      setError('Unable to update job post.');
      console.error(err);
    }
  };

  const handleSkillChange = (skill, checked) => {
    setForm((current) => ({
      ...current,
      postTechStack: toggleSkill(current.postTechStack, skill, checked),
    }));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress size={48} />
      </Box>
    );
  }

  return (
    <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, maxWidth: 760, mx: 'auto' }}>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="h4">Edit job post</Typography>
        <Typography color="text.secondary">
          Update the role details and save your changes.
        </Typography>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box component="form" autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          <TextField
            min="0"
            type="number"
            sx={fieldSx}
            onChange={(e) => setForm({ ...form, postId: e.target.value })}
            label="Post ID"
            value={form.postId}
          />
          <TextField
            sx={fieldSx}
            required
            onChange={(e) => setForm({ ...form, postProfile: e.target.value })}
            label="Job profile"
            value={form.postProfile}
          />
          <TextField
            min="0"
            type="number"
            sx={fieldSx}
            required
            onChange={(e) => setForm({ ...form, reqExperience: e.target.value })}
            label="Years of experience"
            value={form.reqExperience}
          />
          <TextField
            sx={fieldSx}
            required
            multiline
            rows={4}
            onChange={(e) => setForm({ ...form, postDesc: e.target.value })}
            label="Job description"
            value={form.postDesc}
          />

          <Divider />

          <Box>
            <Typography variant="h6" gutterBottom>
              Required skills
            </Typography>
            <FormGroup row sx={{ gap: 1 }}>
              {SKILL_SET.map((skill) => (
                <FormControlLabel
                  key={skill}
                  control={
                    <Checkbox
                      checked={form.postTechStack.includes(skill)}
                      onChange={(e) => handleSkillChange(skill, e.target.checked)}
                    />
                  }
                  label={skill}
                  sx={{
                    m: 0,
                    px: 1.5,
                    borderRadius: 2,
                    border: '1px solid rgba(148, 163, 184, 0.24)',
                  }}
                />
              ))}
            </FormGroup>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button variant="outlined" onClick={() => navigate('/')} sx={{ flex: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" sx={{ flex: 1 }}>
              Save changes
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

export default Edit;
