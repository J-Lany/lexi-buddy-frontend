import type { QaCategory } from './qa-data';

export const QA_DATA_EN: QaCategory[] = [
  {
    category: 'Getting Started',
    icon: '🚀',
    items: [
      {
        q: 'How do I register on Lexi Buddy?',
        a: "Go to https://lexi-buddy.com/ and sign up with your email. Once registered, you'll land on your Students dashboard and can start adding students right away.",
      },
      {
        q: 'Do my students need to do anything before I can add them?',
        a: "Yes — your student must first find the Lexi Buddy Telegram bot (@lexi_buddy_bot) and start it. Once they've completed registration there, they'll be discoverable by Telegram username on the platform in the '+Add a student' section and you can send them an invitation.",
      },
      {
        q: 'What does my main dashboard look like?',
        a: 'The left sidebar has four sections: Students, Lessons, Settings and Q&A. Students is your home base — it shows your full student list with Telegram handles, groups (if applicable) and levels at a glance.',
      },
    ],
  },
  {
    category: 'Managing Students',
    icon: '👩‍🎓',
    items: [
      {
        q: 'How do I add a new student?',
        a: "Click '+ Add a student' in the top-right of the Students page. Search for the student by their Telegram username (type at least 2 characters), optionally write a personal message, then hit 'Send request'. The student gets an invitation in the bot, and once they accept they'll appear in your list and you will be able to assign lessons to them. NOTE: the student needs to be registered in the Lexi Buddy Telegram bot (@lexi_buddy_bot) before they can be discovered.",
      },
      {
        q: "Can I add a student who hasn't started the bot yet?",
        a: 'No. The student must have already started the Lexi Buddy Telegram bot (@lexi_buddy_bot) before you can find and invite them. Ask your student to open Telegram, search for the Lexi Buddy bot and press Start.',
      },
      {
        q: "Can I change my student's display name?",
        a: "Yes. Open the student's profile and click the pencil icon next to their name. The name you set is only visible to you — the student sees their own Telegram name in the bot.",
      },
      {
        q: 'What profile information can I edit for a student?',
        a: "You can edit the student's display name (teacher-only), their English level (A1 through C2), and their age group (Child, Teen or Adults). Their Telegram handle and photo are pulled from Telegram and cannot be changed.",
      },
      {
        q: 'What does the student profile page show me?',
        a: "The left 'About' panel shows level, age group, Telegram handle and last visit. The right 'Activity' panel shows total lessons assigned, assignments completed vs. total, average score, last submission date and overall progress percentage. Below both panels is a table of all lessons assigned to that student.",
      },
      {
        q: 'Can I remove a student from my list?',
        a: 'Student removal is managed through your account settings. If you need to remove a student, check the Settings section or contact support.',
      },
    ],
  },
  {
    category: 'Groups',
    icon: '👥',
    items: [
      {
        q: 'How do I create a group?',
        a: "Go to Students → Groups tab → click '+ Create a new group'. A two-step modal appears. In step 1 enter a group title, select a level, and add an optional description. In step 2 pick which students to add. Hit Next to move between steps.",
      },
      {
        q: 'Why use groups instead of individual assignments?',
        a: 'Groups save time when you teach multiple students at the same level and want to assign the same lessons. Assigning a lesson to a group notifies all students at once and you can track their progress collectively.',
      },
      {
        q: 'Can a student be in more than one group?',
        a: 'Yes, a student can belong to multiple groups at the same time.',
      },
      {
        q: 'Can I edit a group after creating it?',
        a: 'Yes. Click on the group from the Groups tab to open it and update the title, description, level or student list.',
      },
    ],
  },
  {
    category: 'Creating Lessons',
    icon: '📚',
    items: [
      {
        q: 'How do I create a new lesson?',
        a: "Go to the Lessons page and click '+ New lesson'. You'll walk through a 4-step wizard: (1) Lesson details, (2) Vocabulary, (3) Assignments, (4) Assign to students or groups.",
      },
      {
        q: 'What do I fill in at the Lesson details step?',
        a: 'Enter a lesson name, choose a language level (A1–C2), select an age group (Child/Teen/Adults) and write a topic or source description. All the fields (except for Lesson Name) help the AI generate contextually appropriate tasks.',
      },
      {
        q: 'How do I enter the vocabulary list?',
        a: "In step 2 (Vocabulary), type your words or phrases separated by dots — for example: 'boiled. scramble. meat. fried'. You can enter up to 15 items. Then click 'Provide translations and definitions' and the AI generates a translation and up to 3 synonyms for each item.",
      },
      {
        q: 'Can I edit the AI-generated translations and synonyms?',
        a: 'Yes. After the AI generates the vocabulary cards, every field is editable — you can change the term, rewrite the translation, edit synonyms, or delete individual synonyms using the × button. You can also delete an entire term using the trash icon.',
      },
      {
        q: 'What are the four task types?',
        a: 'Definition quiz — students choose the correct meaning from 3 options. Gap filling — students complete a sentence with the right word. Phrase fail — students identify which sentence uses a word incorrectly. Collocation check — students pick the word that fits correctly across multiple sentences.',
      },
      {
        q: 'Do I have to generate all four task types?',
        a: 'No. You can generate between 1 and 4 task types.',
      },
      {
        q: 'How do I generate tasks?',
        a: "In step 3 (Assignments), click 'Generate' next to each task type you want. The AI creates questions, answer options, and explanations. Click 'Show' to review the content inline. Click 'Regenerate' at any time to get a fresh set.",
      },
      {
        q: 'Can I edit the generated tasks?',
        a: "Yes. After clicking 'Show', every question, answer option, and explanation field is fully editable directly in the modal.",
      },
      {
        q: 'What does the number badge next to a task type mean?',
        a: "It shows how many questions were generated for that task type (e.g. '4' means four questions).",
      },
      {
        q: 'Can I save a lesson without assigning it?',
        a: "Yes. At step 4 click 'Skip & finish' to save the lesson to your library and assign it later.",
      },
      {
        q: 'How many words can I add per lesson?',
        a: 'Up to 15 words or phrases per lesson.',
      },
    ],
  },
  {
    category: 'Assigning Lessons',
    icon: '📬',
    items: [
      {
        q: 'How do I assign a lesson?',
        a: "In step 4 of lesson creation, or from the lesson detail page using the 'Assign' button, select individual students from the left panel and/or groups from the right panel. Selected students will immediately receive a Telegram notification.",
      },
      {
        q: 'Can I assign to both students and groups at once?',
        a: 'Yes. The assignment screen shows Students and Groups side by side — you can select any combination.',
      },
      {
        q: 'What happens after I assign a lesson?',
        a: 'Each assigned student gets a Telegram bot notification telling them a new lesson is ready. They can open it and complete all interactive tasks directly inside Telegram.',
      },
      {
        q: "Can I assign a lesson to more people after it's been created?",
        a: "Yes. Open the lesson from your Lessons list and click the 'Assign' button on the lesson detail page to add more students or groups at any time.",
      },
    ],
  },
  {
    category: 'Tracking Progress',
    icon: '📊',
    items: [
      {
        q: 'Where can I see how a student is doing overall?',
        a: "Open the student's profile from the Students list. The 'Activity' panel shows total lessons, assignments done vs. total, average score, last submission date, and an overall progress percentage.",
      },
      {
        q: 'Where can I see progress for a specific lesson?',
        a: 'Open the lesson from the Lessons list. The Assigned section shows all students with a status badge: Not started, In progress, or Completed. Click on a student row to see their per-task-type results.',
      },
      {
        q: 'What does the per-student lesson results page show?',
        a: 'It shows total tasks done, average score, and last activity timestamp. Results are broken out by task type (Definition quiz, Gap filling, Phrase fail, Collocation check) — switch between tabs to see attempt history for each.',
      },
      {
        q: 'What do the status labels mean?',
        a: "'Not started' — the student hasn't opened the lesson yet. 'In progress' — they've completed at least one task type. 'Completed' — all assigned task types have been attempted.",
      },
      {
        q: 'What does the progress percentage on a student profile mean?',
        a: 'It reflects the proportion of all assigned tasks that the student has completed across all their lessons.',
      },
    ],
  },
  {
    category: 'The Telegram Bot',
    icon: '🤖',
    items: [
      {
        q: 'What does the Telegram bot do for students?',
        a: 'The bot is the student-facing side of Lexi Buddy. Students receive lesson assignment notifications there and complete all four task types interactively inside Telegram — no need to visit a website.',
      },
      {
        q: 'Can I use the Telegram bot as a teacher?',
        a: 'The platform website is the main tool for teachers — lesson creation, student management, and progress tracking all happen there. The bot is primarily designed for the student experience.',
      },
      {
        q: 'What if a student changes their Telegram username?',
        a: "You'll need to re-invite them with their new username. Contact support if you encounter issues with existing student records.",
      },
    ],
  },
  {
    category: 'Lesson Library',
    icon: '🗂️',
    items: [
      {
        q: 'Can I reuse a lesson for multiple students or classes?',
        a: "Yes. Lessons stay in your library permanently. Open any lesson and use the 'Assign' button to send it to new students or groups whenever you need.",
      },
      {
        q: 'Can I search for a lesson?',
        a: 'Yes. The Lessons page has a search bar at the top — type any part of the lesson name to filter your list.',
      },
      {
        q: 'Can I edit a lesson after it has been created?',
        a: 'You can view all vocabulary and tasks from the lesson detail page. For full editing capabilities, check the Settings section or contact support.',
      },
    ],
  },
];
