import commitlintConfig from '@commitlint/config-conventional';

const { rules, prompt } = commitlintConfig;

const conf = {
  rules,
  prompt,
};

export default conf;
