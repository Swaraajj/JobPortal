export const SKILL_SET = [
  'Javascript',
  'Java',
  'Python',
  'Django',
  'Rust',
];

export const initialJobForm = {
  postId: '',
  postProfile: '',
  reqExperience: 0,
  postTechStack: [],
  postDesc: '',
};

export function toggleSkill(currentSkills, skill, checked) {
  if (checked) {
    return currentSkills.includes(skill)
      ? currentSkills
      : [...currentSkills, skill];
  }

  return currentSkills.filter((item) => item !== skill);
}
