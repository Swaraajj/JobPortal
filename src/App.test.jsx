import { render, screen } from '@testing-library/react';
import App from './App';

vi.mock('./api/client', () => ({
  default: {
    get: vi.fn(() =>
      Promise.resolve({
        data: [
          {
            postId: 1,
            postProfile: 'Frontend Developer',
            reqExperience: 2,
            postDesc: 'Build modern React applications.',
            postTechStack: ['Javascript', 'React'],
          },
        ],
      }),
    ),
    delete: vi.fn(),
    post: vi.fn(),
  },
}));

test('renders job portal navigation and search', async () => {
  render(<App />);

  expect(screen.getByText(/job portal/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /add job/i })).toBeInTheDocument();

  expect(
    await screen.findByPlaceholderText(/search jobs by role, skills, or description/i),
  ).toBeInTheDocument();
});
