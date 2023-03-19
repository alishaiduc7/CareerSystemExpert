export const questions = [
  {
    section: 1,
    items: [
      {
        label: 'First name',
        type: 'text',
        value: 'username'
      },
      {
        label: 'Last name',
        type: 'text',
        value: 'username'
      },
     
    ]
  },
  {
    section: 2,
    items: [
      {
        label: 'What profile have you finished?',
        type: 'select',
        value: 'question1',
        options: [ 'Mathematic and computer science profile', 'Philology profile', 'Natural sciences profile']
      },
      {
        label: 'Are you passionate about education?',
        type: 'select',
        value: 'question2',
        options: [ 'Yes', 'No']
      },
      {
        label: 'Do you have advanced programming skills/knowledge?',
        type: 'select',
        value: 'question3',
        options: [ 'Yes', 'No']
      }
    ]
  },
  {
    section: 3,
    items: [
      {
        label: 'If you are ready to submit please press `Submit`',
        type: 'information'
      }
    ]
  }
]
