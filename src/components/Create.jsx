import { useState } from 'react';
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
  Stack,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { initialJobForm, SKILL_SET, toggleSkill } from '../constants/jobForm';

const fieldSx = { width: '100%' };

const Create = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialJobForm);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      await api.post('/jobPost', form);
      navigate('/');
    } catch (err) {
      setError('Unable to create job post.');
      console.error(err);
    }
  };

  const handleSkillChange = (skill, checked) => {
    setForm((current) => ({
      ...current,
      postTechStack: toggleSkill(current.postTechStack, skill, checked),
    }));
  };

  return (
    <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, maxWidth: 760, mx: 'auto' }}>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="h4">Create job post</Typography>
        <Typography color="text.secondary">
          Share role details, experience level, and required skills.
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
              Publish job
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

export default Create;
