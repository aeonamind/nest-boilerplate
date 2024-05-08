export default {
  $schema: 'http://json-schema.org/schema',
  $id: 'SchematicsNestApplication',
  title: 'Nest Application Options Schema',
  questions: [
    {
      type: 'input',
      name: 'name',
      message: 'What name would you like to use for the new project?',
      validate: (value) => {
        return !!value.trim() || 'Please enter a name for the project';
      },
    },
    {
      type: 'input',
      name: 'description',
      message: 'Which is the description of the project?',
    },
  ],
};
