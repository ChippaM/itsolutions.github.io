const colorTheme = [
  { d_bgc: 'linear-gradient(45deg, rgb(255, 85, 85), rgb(255, 210, 85))', a_bgc: 'rgba(255, 85, 85, .5)', h_lblc: 'rgb(255, 230, 153)' },
  { d_bgc: 'linear-gradient(45deg, rgb(34, 193, 195), rgb(253, 187, 45))', a_bgc: 'rgba(34, 193, 195, .5)', h_lblc: 'rgb(204, 255, 255)' },
  { d_bgc: 'linear-gradient(45deg, rgb(66, 133, 244), rgb(234, 67, 53))', a_bgc: 'rgba(66, 133, 244, .5)', h_lblc: 'rgb(234, 213, 220)' },
  { d_bgc: 'linear-gradient(45deg, rgb(255, 159, 28), rgb(255, 71, 87))', a_bgc: 'rgba(255, 159, 28, .5)', h_lblc: 'rgb(255, 219, 191)' },
  { d_bgc: 'linear-gradient(135deg, rgb(248, 82, 73), rgb(230, 24, 115))', a_bgc: 'rgba(248, 82, 73, .5)', h_lblc: 'rgb(255, 209, 223)' },
  { d_bgc: 'linear-gradient(180deg, rgb(233, 30, 99), rgb(156, 39, 176))', a_bgc: 'rgba(233, 30, 99, .5)', h_lblc: 'rgb(255, 205, 231)' },
  { d_bgc: 'linear-gradient(90deg, rgb(0, 204, 255), rgb(255, 99, 132))', a_bgc: 'rgba(0, 204, 255, .5)', h_lblc: 'rgb(200, 230, 255)' },
  { d_bgc: 'linear-gradient(45deg, rgb(39, 174, 96), rgb(26, 188, 156))', a_bgc: 'rgba(39, 174, 96, .5)', h_lblc: 'rgb(220, 255, 226)' },
  { d_bgc: 'linear-gradient(135deg, rgb(255, 93, 134), rgb(255, 176, 77))', a_bgc: 'rgba(255, 93, 134, .5)', h_lblc: 'rgb(255, 216, 182)' },
  { d_bgc: 'linear-gradient(135deg, rgb(6, 215, 211), rgb(255, 84, 101))', a_bgc: 'rgba(6, 215, 211, .5)', h_lblc: 'rgb(220, 255, 248)' },
  { d_bgc: 'linear-gradient(45deg, rgb(255, 204, 0), rgb(255, 87, 34))', a_bgc: 'rgba(255, 204, 0, .5)', h_lblc: 'rgb(255, 228, 169)' },
  { d_bgc: 'linear-gradient(45deg, rgb(255, 87, 34), rgb(255, 193, 7))', a_bgc: 'rgba(255, 87, 34, .5)', h_lblc: 'rgb(255, 222, 164)' },
  { d_bgc: 'linear-gradient(135deg, rgb(249, 130, 77), rgb(243, 64, 99))', a_bgc: 'rgba(249, 130, 77, .5)', h_lblc: 'rgb(255, 210, 191)' },
  { d_bgc: 'linear-gradient(45deg, rgb(66, 133, 244), rgb(234, 67, 53))', a_bgc: 'rgba(66, 133, 244, .5)', h_lblc: 'rgb(234, 213, 220)' },
  { d_bgc: 'linear-gradient(135deg, rgb(245, 50, 150), rgb(255, 99, 132))', a_bgc: 'rgba(245, 50, 150, .5)', h_lblc: 'rgb(255, 179, 189)' },
  { d_bgc: 'linear-gradient(90deg, rgb(255, 204, 0), rgb(255, 87, 34))', a_bgc: 'rgba(255, 204, 0, .5)', h_lblc: 'rgb(255, 228, 169)' },
  { d_bgc: 'linear-gradient(45deg, rgb(255, 99, 132), rgb(245, 50, 150))', a_bgc: 'rgba(255, 99, 132, .5)', h_lblc: 'rgb(255, 179, 189)' },
  { d_bgc: 'linear-gradient(135deg, rgb(255, 93, 134), rgb(255, 176, 77))', a_bgc: 'rgba(255, 93, 134, .5)', h_lblc: 'rgb(255, 216, 182)' },
  { d_bgc: 'linear-gradient(135deg, rgb(233, 30, 99), rgb(156, 39, 176))', a_bgc: 'rgba(233, 30, 99, .5)', h_lblc: 'rgb(255, 205, 231)' },
  { d_bgc: 'linear-gradient(90deg, rgb(0, 204, 255), rgb(255, 99, 132))', a_bgc: 'rgba(0, 204, 255, .5)', h_lblc: 'rgb(200, 230, 255)' },
  { d_bgc: 'linear-gradient(135deg, rgb(245, 50, 150), rgb(255, 99, 132))', a_bgc: 'rgba(245, 50, 150, .5)', h_lblc: 'rgb(255, 179, 189)' },
  { d_bgc: 'linear-gradient(45deg, rgb(39, 174, 96), rgb(26, 188, 156))', a_bgc: 'rgba(39, 174, 96, .5)', h_lblc: 'rgb(220, 255, 226)' },
  { d_bgc: 'linear-gradient(135deg, rgb(0, 230, 118), rgb(3, 169, 244))', a_bgc: 'rgba(0, 230, 118, .5)', h_lblc: 'rgb(204, 255, 234)' },
  { d_bgc: 'linear-gradient(90deg, rgb(245, 50, 150), rgb(255, 99, 132))', a_bgc: 'rgba(245, 50, 150, .5)', h_lblc: 'rgb(255, 179, 189)' },
  { d_bgc: 'linear-gradient(45deg, rgb(255, 204, 0), rgb(255, 87, 34))', a_bgc: 'rgba(255, 204, 0, .5)', h_lblc: 'rgb(255, 228, 169)' },
  { d_bgc: 'linear-gradient(45deg, rgb(255, 87, 34), rgb(255, 193, 7))', a_bgc: 'rgba(255, 87, 34, .5)', h_lblc: 'rgb(255, 222, 164)' },
  { d_bgc: 'linear-gradient(135deg, rgb(249, 130, 77), rgb(243, 64, 99))', a_bgc: 'rgba(249, 130, 77, .5)', h_lblc: 'rgb(255, 210, 191)' },
  { d_bgc: 'linear-gradient(45deg, rgb(66, 133, 244), rgb(234, 67, 53))', a_bgc: 'rgba(66, 133, 244, .5)', h_lblc: 'rgb(234, 213, 220)' },
  { d_bgc: 'linear-gradient(135deg, rgb(245, 50, 150), rgb(255, 99, 132))', a_bgc: 'rgba(245, 50, 150, .5)', h_lblc: 'rgb(255, 179, 189)' },
  { d_bgc: 'linear-gradient(90deg, rgb(255, 204, 0), rgb(255, 87, 34))', a_bgc: 'rgba(255, 204, 0, .5)', h_lblc: 'rgb(255, 228, 169)' },
  { d_bgc: 'linear-gradient(45deg, rgb(255, 99, 132), rgb(245, 50, 150))', a_bgc: 'rgba(255, 99, 132, .5)', h_lblc: 'rgb(255, 179, 189)' },
  { d_bgc: 'linear-gradient(135deg, rgb(255, 93, 134), rgb(255, 176, 77))', a_bgc: 'rgba(255, 93, 134, .5)', h_lblc: 'rgb(255, 216, 182)' },
  { d_bgc: 'linear-gradient(135deg, rgb(233, 30, 99), rgb(156, 39, 176))', a_bgc: 'rgba(233, 30, 99, .5)', h_lblc: 'rgb(255, 205, 231)' },
  { d_bgc: 'linear-gradient(90deg, rgb(0, 204, 255), rgb(255, 99, 132))', a_bgc: 'rgba(0, 204, 255, .5)', h_lblc: 'rgb(200, 230, 255)' },
  { d_bgc: 'linear-gradient(135deg, rgb(245, 50, 150), rgb(255, 99, 132))', a_bgc: 'rgba(245, 50, 150, .5)', h_lblc: 'rgb(255, 179, 189)' },
  { d_bgc: 'linear-gradient(45deg, rgb(39, 174, 96), rgb(26, 188, 156))', a_bgc: 'rgba(39, 174, 96, .5)', h_lblc: 'rgb(220, 255, 226)' },
  { d_bgc: 'linear-gradient(135deg, rgb(0, 230, 118), rgb(3, 169, 244))', a_bgc: 'rgba(0, 230, 118, .5)', h_lblc: 'rgb(204, 255, 234)' },
  { d_bgc: 'linear-gradient(90deg, rgb(245, 50, 150), rgb(255, 99, 132))', a_bgc: 'rgba(245, 50, 150, .5)', h_lblc: 'rgb(255, 179, 189)' },
  { d_bgc: 'linear-gradient(45deg, rgb(255, 204, 0), rgb(255, 87, 34))', a_bgc: 'rgba(255, 204, 0, .5)', h_lblc: 'rgb(255, 228, 169)' },
  { d_bgc: 'linear-gradient(45deg, rgb(255, 87, 34), rgb(255, 193, 7))', a_bgc: 'rgba(255, 87, 34, .5)', h_lblc: 'rgb(255, 222, 164)' },
  { d_bgc: 'linear-gradient(135deg, rgb(249, 130, 77), rgb(243, 64, 99))', a_bgc: 'rgba(249, 130, 77, .5)', h_lblc: 'rgb(255, 210, 191)' },
  { d_bgc: 'linear-gradient(45deg, rgb(66, 133, 244), rgb(234, 67, 53))', a_bgc: 'rgba(66, 133, 244, .5)', h_lblc: 'rgb(234, 213, 220)' },
  { d_bgc: 'linear-gradient(135deg, rgb(245, 50, 150), rgb(255, 99, 132))', a_bgc: 'rgba(245, 50, 150, .5)', h_lblc: 'rgb(255, 179, 189)' },
  { d_bgc: 'linear-gradient(90deg, rgb(255, 204, 0), rgb(255, 87, 34))', a_bgc: 'rgba(255, 204, 0, .5)', h_lblc: 'rgb(255, 228, 169)' },
  { d_bgc: 'linear-gradient(45deg, rgb(255, 99, 132), rgb(245, 50, 150))', a_bgc: 'rgba(255, 99, 132, .5)', h_lblc: 'rgb(255, 179, 189)' },
  { d_bgc: 'linear-gradient(135deg, rgb(255, 93, 134), rgb(255, 176, 77))', a_bgc: 'rgba(255, 93, 134, .5)', h_lblc: 'rgb(255, 216, 182)' },
  { d_bgc: 'linear-gradient(135deg, rgb(233, 30, 99), rgb(156, 39, 176))', a_bgc: 'rgba(233, 30, 99, .5)', h_lblc: 'rgb(255, 205, 231)' },
  { d_bgc: 'linear-gradient(90deg, rgb(0, 204, 255), rgb(255, 99, 132))', a_bgc: 'rgba(0, 204, 255, .5)', h_lblc: 'rgb(200, 230, 255)' },
  { d_bgc: 'linear-gradient(135deg, rgb(245, 50, 150), rgb(255, 99, 132))', a_bgc: 'rgba(245, 50, 150, .5)', h_lblc: 'rgb(255, 179, 189)' },
  { d_bgc: 'linear-gradient(45deg, rgb(39, 174, 96), rgb(26, 188, 156))', a_bgc: 'rgba(39, 174, 96, .5)', h_lblc: 'rgb(220, 255, 226)' },
];
  const tipsObj = [
      {tip:'This is the course name',ele:'#couse-title'},
      {tip:'This will show the number of questions you answered correctly.',ele:'.score'},
      {tip:'This will show number of selected questions',ele:'.selected-num-quiz'},
      {tip:'This will show number of questions you have answered so far during a test session.',ele:'.no-answered-question'},
      {tip:'This is the total number of questions in the app.',ele:'.question-len'},
      {tip:'This will show remaining time to complete the exam.',ele:'#remaining-time span'},
      {tip:'This will show your progress during the exam',ele:'#progress-tracker'},
      {tip:'To select questions you answered, failed, not answered, and all test questions from here.',ele:'#select-questions'},
      {tip:'To access your emails generated by the app.',ele:'#email-icon'},
      {tip:'To test settings and other features of the app, click on the 3 short lines.',ele:'#settings-icon'},
      {tip:'To get a definition of a term, select/hightlight it.',ele:''},
      {tip:'To all these settings, hover your mouse on this circle.',ele:'#help-circle'},
      {tip:'To increase font size, click up arrow.',ele:'#increase-font-size'},
      {tip:'To make font bold or undone, click "FontSize" text.',ele:'#font-weight'},
      {tip:'To reduce the font size, click the down arrow.',ele:'#reduce-font-size'},
      {tip:'To change the font color, click this.',ele:'#font-color-input'},
      {tip:'To change to previous theme, click the up arrow',ele:'#previous-theme'},
      {tip:'To switch to next theme, click the down arrow',ele:'#next-theme'},
      {tip:'To access quick settings',ele:'#quick-settings'},
      {tip:'To initiate built in app',ele:'#chat-circle'},
      {tip:'This shows how many times you have passed, failed and skipped the question.',ele:'.lastUpdate'},
      {tip:'This will show how many times you passed the question.',ele:'.pass-counter'},
      {tip:'This will show how many times you failed the question.',ele:'.fail-counter'},
      {tip:'This will show how many times you skipped the question.',ele:'.skip-counter'},
      {tip:'This the button to read content of your question',ele:'.play'},
      {tip:'This is your answer',ele:'#yourAnswer'},
      {tip:'This is the reference Id for the question, every question has unique id',ele:'.ref-span1'},
      {tip:'This is the submit button',ele:'#submit-button'},
      {tip:'Thanks.',ele:''},
      {tip:'Done',ele:''}
  ]

  const responseDb = {
    welcomeScript:[
       ' Hello, how can I assist you today?',
       'Hi, how can I help?',
       'Good day, how can I be your assistance today?',
       `Hello, I hope you're doing well. How may I be your assistance today.`,
        'Welcome! How may I help you?'
    ],
    initialUserGreet:`Hi~!~Hey~!~Hello~!~Yo~!~What's up~!~!~Howdy~!~Greetings~!~Salutations~!~Hiya~!~
    Hey there~!~Hi there~!~Hello there~!~How are you doing?~!~How are you?~!~How's it going?
    ~!~How's everything?~!~How's life?~!~How's your day?~!
    How's it going~!~Hey there~!~Sup~!~bo~!~Salut~!~Bonjour
    ~!~Good day~!~Good morning~!~Good afternoon~!~Hi there~!~Good evening~!~Rixile~!~Ahee`,
    noAnswer:[
    ' I’m afraid I don’t have the answer to that right now. Would you like me to help you with something else',
    ` It looks like that’s
     something I’m unable to assist with. Could you clarify or ask something else? I’ll do my best to help!`,
     `I’m not able to provide the answer to that at this time.
      I recommend reaching out to Chippa Mathebula for further assistance.`,
      ` It looks like I’m unable to provide the answer to that.
       Would you like me to help you with something else?`,
       ` It looks like unable to don't have the best answere to that.
        Would you like me to help you with something else?`

    ],
    byeReply: ['Goodbye! If you ever need assistance, I’m here!',
              'Take care! Let me know if you need anything else in the future!',
              'Hope you have a great day ahead. I’ll be here if you need help again!',
              'Thank you for the conversation. Have a great day!',
              'Goodbye, and feel free to reach out again anytime.',
              'It was a pleasure assisting you. Take care!'
    ],

    helpOffer :[
     'I need help with"I need help with',
     'Can you assist me with',
     'I need support with',
     'I have a question about'
                
    ]
 }

 const appreciationResponse = `
 Thank you so much! I’m here to help you do your best!
  I appreciate that! Let’s keep up the good work!
  You’re very kind, thank you!
  That’s so nice of you to say! I’m happy to assist.
  Thanks a ton! I’m glad to be of help!
  Your compliment means a lot! Let’s continue making progress!
  Thank you! I’m doing my best to help you succeed!
  I’m so glad you think so! Let’s keep working together.
  You just made my day! Thanks for the compliment!
  Thank you for your kind words! I’m here to help you shine!
  I’m flattered! I’ll keep assisting you as best as I can.
  Thanks! Let’s continue to make your exam prep a breeze.
  You’re too sweet! Let’s continue tackling this together.
  Thank you! It’s all about teamwork—you're doing great!
  So glad to hear that! Let’s keep up the momentum!
  That means a lot! I’m happy to be here for you.
  You’re so encouraging, thank you!
  I appreciate your words! We’re in this together.
  Wow, thanks for the kind words! Let’s keep going strong.
  I’m happy to help! Thanks for the compliment!
  Thank you! Together, we’re going to crush this exam!
  Your compliment gives me energy! Let’s keep pushing forward!
  You’re doing great—thank you for the kind words!
  That’s the spirit! Keep that positivity going!
  Your motivation fuels mine! Let’s keep working hard!
  Thank you! You’re on the right track—let’s keep going!
  Thanks! Let’s keep that good vibe flowing!
  I’m so glad you’re feeling confident—let’s turn that into success!
  You're giving me all the encouragement I need! Thanks!
  Your positive energy is inspiring—let’s keep up the great work!
  Oh, you’re too kind! I’m just here to do my best for you.
  I’m just a humble assistant, but thank you for saying that!
  You’re making me feel like a genius, but it’s all about teamwork!
  Thank you! I’m just here to support you every step of the way.
  I’m happy to help, but you’re the real star here!
  I appreciate it, but we’re both working hard together!
  I’m just doing what I’m designed to do! Thanks for the compliment.
  You're too nice! But I’m glad to be helping you.
  I’m happy to assist, but it’s really your effort that counts!
  I’m just doing my job, but thanks for the encouraging words!
  Thank you! Happy to help whenever you need it.
  I appreciate that! Let’s continue moving forward together.
  That’s awesome to hear, thanks! Let’s keep it up!
  Thanks for the compliment, and I’m here to help anytime!
  You're making my job easy! Let’s continue this great progress!
  A little kindness goes a long way—thank you! Now let’s ace this!
  You’re making me feel like the MVP! Thanks for that!
  If I could do a happy dance, I’d totally be doing one right now!
  Thanks! Your positive energy is contagious—let’s keep this going!
  Now you’ve got me feeling like a rockstar assistant—thank you!
  I’m feeling all sorts of pumped up now! Thanks for the love!
  You’re boosting my confidence too! Let’s keep at it!
  I appreciate the compliment, but we’ve got exams to crush!
  You’re making me feel like the exam champion—thanks!
  You’re seriously making this fun! Let’s keep rolling!`

  const dictionary = `
        absorptive capacity#An organization’s ability to recognize the value of new information, embed it into an existing knowledge system, and apply it to achieve the intended business outcomes.
        acceptance criteria#A list of minimum requirements that a service or service component must meet for it to be acceptable to key stakeholders.
        adaptive system#A system in which the behaviour of agents changes and they self-organize in response to events.
        Agile#An umbrella term for a collection of frameworks and techniques that together enable teams and individuals to work in a way that is typified by collaboration, prioritization, iterative and incremental delivery, and timeboxing. There are several specific methods (or frameworks) that are classed as Agile, such as Scrum, Lean, and Kanban.
        AIOps#The application of machine learning and big data to IT operations to receive continuous insights which provide continuous fixes and improvements via automation. Also referred to as ‘artificial intelligence for IT operations’ or ‘algorithmic IT operations’.
        Andon#A system, either manual or automated, used to notify workers and other parts of an organization of quality or process issues. The Andon system originated in manufacturing, but is now widely used in IT.
        architecture management practice#The practice of providing an understanding of all the different elements that make up an organization and how those elements relate to one another.
        artificial intelligence#Highly advanced automation that demonstrates capabilities of general reasoning, learning, and human-like intelligence; a branch of computer science and engineering focused on simulating intelligent behaviour in computer systems.
        asset register#A database or list of assets, capturing key attributes such as ownership and financial value.
        availability#The ability of an IT service or other configuration item to perform its agreed function when required.
        availability management practice#The practice of ensuring that services deliver agreed levels of availability to meet the needs of customers and users.
        backlog#A list of new features for a product. The list may consist of user stories which are structured in a way that describes who wants the feature and why. It is also a generic term that can be defined in terms of releases, sprints, and products.
        band of visibility#Activities and resources within a service relationship that are visible to both the service provider and the service consumer.
        baseline#A report or metric that serves as a starting point against which progress or change can be assessed.
        best practice#A way of working that has been proven to be successful by multiple organizations.
        big data#The use of very large volumes of structured and unstructured data from a variety of sources to gain new insights.
        blameless post-mortem#A non-judgemental description and analysis of the circumstances and events that preceded an incident.
        blockchain#An open, distributed ledger that can record transactions between two parties efficiently and in a verifiable and permanent way.
        business analysis practice#The practice of analysing a business or some element of a business, defining its needs and recommending solutions to address these needs and/or solve a business problem, and create value for stakeholders. Business analysis enables an organization to communicate its needs in a meaningful way, express the rationale for change, and design and describe solutions that enable value creation in alignment with the organization’s objectives.
        business case#A justification for the expenditure of organizational resources, providing information about costs, benefits, options, risks, and issues.
        business impact analysis (BIA)#A key activity in the practice of service continuity management that identifies vital business functions and their dependencies.
        business model#A formal description of how an organization should be configured to create value for customers based on its strategy.
        business relationship manager (BRM)#A role responsible for maintaining good relationships with one or more customers.
        business strategy#How an organization defines and achieves its purpose.
        call#An interaction (e.g. a telephone call) with the service desk. A call could result in an incident or a service request being logged.
        call/contact centre#An organization or business unit that handles large numbers of incoming and outgoing calls and other interactions.
        capability#The ability of an organization, person, process, application, configuration item, or IT service to carry out an activity.
        capacity and performance management practice#The practice of ensuring that services achieve agreed and expected performance levels, satisfying current and future demand in a cost-effective way.
        capacity planning#The activity of creating a plan that manages resources to meet demand for services.
        change#The addition, modification, or removal of anything that could have a direct or indirect effect on services.
        change agent#A role that facilitates the development, application, and advocation of new ways of working.
        change authority#A person or group responsible for authorizing a change.
        Change Control#(previously referred to as Change Management) in ITIL is the process responsible for managing all changes to IT services, systems, and infrastructure, ensuring that changes are carried out in a controlled, efficient, and systematic manner. 
        Change Enablement#(formerly known as Change Management) in ITIL is the process responsible for managing changes to IT services, infrastructure, and systems in a way that minimizes risk and disruption while ensuring that beneficial changes are implemented efficiently and effectively.
        change enablement practice#The practice of ensuring that risks are properly assessed, authorizing changes to proceed and managing a change schedule in order to maximize the number of successful service and product changes.
        change model#A repeatable approach to the management of a particular type of change.
        change schedule#A calendar that shows planned and historical changes.
        chaos engineering#The discipline of experimenting on a system in order to build confidence in the system’s capability to withstand turbulent conditions in production.
        chaos monkey#A tool that tests the resilience of IT systems by intentionally disabling components in production to test how remaining systems respond to the outage.
        charging#The activity that assigns a price for services.
        cloud computing#A model for enabling on-demand network access to a shared pool of configurable computing resources that can be rapidly provided with minimal management effort or provider interaction.
        collaboration#Working with others to achieve common shared goals.
        communication technology#Technology that enables information technology (IT) and operational technology (OT) to be highly mobile and accessible to organizations, consumers, and other stakeholders. Sometimes seen as a component of either IT or OT.
        complex adaptive systems#Systems that adapt in, and co-evolve with, a changing environment, resulting in:behaviour that is not predicted by the behaviour of parts of the  systemthe inability to examine the system in isolation from the other systems in its environment.
        complex system#A system in which agents’ interactions are dynamic and often unpredictable.
        complexity thinking#A systems thinking approach based on the recognition and understanding of the various levels of complexity inherent in the systems and the context in which they operate.
        compliance#Both the act and result of ensuring that a standard or set of guidelines is followed, or that proper, consistent accounting or other practices are being employed.
        confidentiality#A security objective that ensures information is not made available or disclosed to unauthorized entities.
        configuration#An arrangement of configuration items (CIs) or other resources that work together to deliver a product or service. Can also be used to describe the parameter settings for one or more CIs.
        configuration item (CI)#Any component that needs to be managed in order to deliver an IT service.
        configuration management database (CMDB)#A database used to store configuration records throughout their lifecycle. The CMDB also maintains the relationships between configuration records.
        configuration management system (CMS)#A set of tools, data, and information that is used to support service configuration management.
        configuration record#A record containing the details of a configuration item (CI). Each configuration record documents the lifecycle of a single CI. Configuration records are stored in a configuration management database.
        containerization#The technique of packaging software into standardized lightweight, stand-alone, executable units for development, shipment, and deployment.
        continual improvement practice#The practice of aligning an organization’s practices and services with changing business needs through the ongoing identification and improvement of all elements involved in the effective management of products and services.
        continuous delivery#An approach to software development in which software can be released to production at any time. Frequent deployments are possible, but deployment decisions are taken case by case, usually because organizations prefer a slower rate of deployment.
        continuous deployment#An approach to software development in which changes go through the pipeline and are automatically put into the production environment, enabling multiple production deployments per day. Continuous deployment relies on continuous delivery.
        continuous integration#An approach to integrating, building, and testing code within the software development environment.
        continuous integration/continuous delivery (CI/CD)#An integrated set of practices and tools used to merge developers’ code, build and test the resulting software, and package it so that it is ready for deployment.
        control#The means of managing a risk, ensuring that a business objective is achieved, or that a process is followed.
        cooperation#Working with others to achieve your own goals.
        cost#The amount of money spent on a specific activity or resource.
        cost centre#A business unit or project to which costs are assigned.
        cost of delay#The benefits that are expected to be lost when the launch or update of a service offering is delayed.
        critical success factor (CSF)#A necessary precondition for the achievement of intended results.
        cultural fit#The ability of an employee or a team to work comfortably in an environment that corresponds with their own beliefs, values, and needs.
        culture#A set of values that is shared by a group of people, including expectations about how people should behave, ideas, beliefs, and practices.
        customer#A person who defines the requirements for a service and takes responsibility for the outcomes of service consumption.
        customer experience (CX)#The sum of functional and emotional interactions with a service and service provider as perceived by a customer.
        customer journey#The complete end-to-end experience that service customers have with one or more service providers and/or their products through touchpoints and service interactions.
        customer orientation#An approach to sales and customer relations in which staff focus on helping customers to meet their long-term needs and wants.
        cybersecurity risks#Risks of exposure or loss for an organization resulting from a cyber-attack or a data breach.
        cycle time#The amount of time required to complete a discrete unit of work, converting inputs into outputs.
        dashboard#A real-time graphical representation of data.
        data#Information that has been translated into a form that is efficient for movement or processing.
        data analytics#A branch of data science focused on analysing raw data in order to draw conclusions about it, using highly automated techniques.
        definition of done#A checklist of the agreed criteria for a proposed product or service.
        deliver and support#The value chain activity that ensures services are delivered and supported according to agreed specifications and stakeholders’ expectations.
        demand#Input to the service value system based on opportunities and needs from internal and external stakeholders.
        deployment#The movement of any service component into any environment.
        deployment Management#is the process responsible for planning, scheduling, and controlling the movement of releases to test and live environments.
        deployment management practice#The practice of moving new or changed hardware, software, documentation, processes, or any other service component to live environments.
        design and transition#The value chain activity that ensures products and services continually meet stakeholder expectations for quality, costs, and time to market.
        design thinking#A practical and human-centred approach used by product and service designers to solve complex problems and find practical and creative solutions that meet the needs of an organization and its customers.
        development environment#An environment used to create or modify IT services or applications.
        DevOps#An organizational culture that aims to improve the flow of value to customers. DevOps focuses on culture, automation, Lean, measurement, and sharing (CALMS).
        digital business#Activities that use digital technology, enabling an organization to fulfil its purpose.
        digital disruption#A fundamental shift in an organization’s operation caused by the development of digital technology.
        digital organization#An organization that is enabled by digital technology to do business significantly differently, or to do significantly different business.
        digital product#A product is digital when digital technology plays a significant role in its goods, resources, or associated service interactions.
        digital strategy#A business strategy that is based all or in part on using digital technology to achieve its goals and purpose.
        digital technology#Technology that digitizes something or processes digital data. Digital technology refers to information technology (IT) and the parts of operational technology (OT) that have been digitized. See also digitization.
        digital transformation#The evolution of traditional business models to meet the needs of highly empowered customers, with technology playing an enabling role. Can also be defined as the use of digital technology to enable a significant improvement in the realization of an organization’s objectives that could not feasibly have been achieved by non-digital means.
        digitization#The process of transforming something (e.g. text, sound, or images) from analogue to digital form by expressing the information in binary digits.
        directing#Leading, conducting, or guiding someone or ordering something. This includes setting and communicating the vision, purpose, objectives, and guiding principles for an organization or team. It may also include leading or guiding the organization or team towards its objectives.
        disaster#A sudden unplanned event that causes great damage or serious loss to an organization. A disaster results in an organization failing to provide critical business functions for some predetermined minimum period of time.
        disaster recovery plans#A set of clearly defined plans related to how an organization will recover from a disaster as well as return to a pre-disaster condition, considering the four dimensions of service management.
        discontinuous innovation#An innovation that completely replaces what came before.
        disruption risks#Risks that can disrupt the organization’s operating or business model.
        double-loop learning#A form of learning that takes place when examining the purpose and function of work being done, without taking the existing organizational structure for granted. Also known as ‘reframing’.
        driver#Something that influences strategy, objectives, or requirements.
        early-life support (ELS)#A period of time associated with the release of service components to users, when additional resources are allocated to user support and service operations. Early-life support can also be applied to the onboarding or offboarding of users from a service.
        ecosystem disruption#Disruption that occurs when digital technology introduces a change that impacts organizations across multiple industries and markets.
        effectiveness#A measure of whether the objectives of a practice, service or activity have been achieved.
        efficiency#A measure of whether the right amount of resources have been used by a practice, service, or activity.
        emergency change#A change that must be introduced as soon as possible.
        emotional intelligence#The ability to understand the way people feel and react, and to use this skill to make good judgements and to avoid or solve conflicts.
        employee fulfilment#The feeling that people have when their work aligns with their intrinsic motivation and provides them with a sense of purpose.
        engage#The value chain activity that provides a good understanding of stakeholder needs, transparency, continual engagement, and good relationships with all stakeholders.
        engagement risks#Risks that originate from an organization’s stakeholders, including its suppliers and partners, consumers, and employees.
        environment#A subset of the IT infrastructure that is used for a particular purpose, for example a live environment or test environment. Can also mean the external conditions that influence or affect something.
        epic#A high-level definition of a requirement that has not yet been sufficiently refined or understood. Eventually an epic will be refined or broken down into several user stories and requirements.
        error#A flaw or vulnerability that may cause incidents.
        error control#Problem management activities used to manage known errors.
        escalation#The act of sharing awareness or transferring ownership of an issue or work item.
        ethics#A system of principles that defines what is good for individuals and society.
        event#Any change of state that has significance for the management of a service or other configuration item.
        external customer#A customer who works for an organization other than the service provider.
        failure#A loss of ability to operate to specification, or to deliver the required output or outcome.
        feedback loop#A technique whereby the outputs of one part of a system are used as inputs to the same part of the system.
        four dimensions of service management#The four perspectives that are critical to the effective and efficient facilitation of value for customers and other stakeholders in the form of products and services.
        gap analysis#An activity that compares two sets of data and identifies the differences; for example, comparing a set of requirements with the actual delivery, or the current state of an organization with a target future state.
        goods#Tangible resources that are transferred or available for transfer from a service provider to a service consumer, together with ownership and associated rights and responsibilities.
        governance#The means by which an organization is directed and controlled.
        guideline#A recommended practice that allows some discretion in its interpretation, implementation, or use.
        high-velocity IT#The application of digital technology for significant business enablement, where time to market, time to customer, time to change, and speed in general are crucial. High velocity is not restricted to fast development; it is required throughout the service value chain, from innovation at the start, through development and operations, to the actual realization of value.
        high-velocity IT operating model#An IT operating model where digital technology plays a major role in the co-creation of value.
        identity#A unique name that is used to identify and grant system access rights to a user, person, or role.
        improve#The value chain activity that ensures continual improvement of products, services, and practices across all value chain activities and the four dimensions of service management.
        improvement#A deliberately introduced change that results in increased value for one or more stakeholders.
        improvement review#An evaluation using metrics and other evidence to determine whether an improvement has achieved its desired outcomes and, if not, what needs to be done to complete the work.
        incident#An unplanned interruption to a service or reduction in the quality of a service.
        incident management#The practice of minimizing the negative impact of incidents by restoring normal service operation as quickly as possible.
        indicator#A metric that is used to assess and manage something.
        industry disruption#Disruption that occurs when digital technology introduces a change that impacts a specific industry (e.g. manufacturing, finance, retail, or mining) or a group of related industries (e.g. e-books and self-publishing, which have disrupted printing, publishing, and retail).
        information and technology#One of the four dimensions of service management. It includes the information and knowledge used to deliver services, and the information and technologies used to manage all aspects of the service value system.
        information model#The construct of information, related to the taxonomy and relationships of data to other data, required to present and share content in a meaningful and representative way.
        information security management practice#The practice of protecting an organization by understanding and managing risks to the confidentiality, integrity, and availability of information.
        information security policy#The policy that governs an organization’s approach to information security management.
        information technology#The application of digital technology to store, retrieve, transmit, and manipulate data (data processing), often in the context of a business or other kind of organization.
        infrastructure and platform management practice#The practice of overseeing the infrastructure and platforms used by an organization. This enables the monitoring of technology solutions available, including solutions from third parties.
        innovation#The adoption of a novel technology or way of working that has led to the significant improvement of an organization, product, or service.
        innovation risks#Risks introduced by the organization’s innovations.
        integration of duties#Having a task that is prone to fraud or error performed by one person because other controls have been applied. This serves as an alternative to separation (or segregation) of duties.
        integrity#A security objective that ensures information is only modified by authorized personnel and activities.
        intelligent disobedience#Deliberately disobeying or disregarding rules in order to avoid a dangerous situation, or ‘doing the right thing’.
        internal customer#A customer who works for the same organization as the service provider.
        Internet of Things (IoT)#The interconnection of devices via the internet that were not traditionally thought of as IT assets, but now include embedded computing, capability, and network connectivity.
        IT asset#Any financially valuable component that can contribute to the delivery of an IT product or service.
        IT asset management practice#The practice of planning and managing the full lifecycle of all IT assets.
        IT infrastructure#All of the hardware, software, networks, and facilities that are required to develop, test, deliver, monitor, manage, and support IT services.
        IT service#A service based on the use of information technology.
        ITIL#Best-practice guidance for IT service management.
        ITIL Foundation#ITIL Foundation is the basic certification level that introduces individuals to the core concepts, principles, and processes of ITIL, helping organizations align IT services with business needs.
        ITIL continual improvement model#A model which provides organizations with a structured approach to implementing improvements.
        ITIL guiding principles#Recommendations that can guide an organization in all circumstances, regardless of changes in its goals, strategies, type of work, or management structure.
        ITIL service value chain#An operating model for service providers that covers all the key activities required to effectively manage products and services.
        ITIL service value chain activity#A step of the value chain that an organization takes in the creation of value.
        job#A position within an organization that is assigned to a specific person.
        Kanban#A method for visualizing work, identifying potential blockages and resource conflicts, and managing work in progress.
        key performance indicator (KPI)#An important metric used to evaluate the success in meeting an objective.
        knowledge management practice#The practice of maintaining and improving the effective, efficient, and convenient use of information and knowledge across an organization.
        known error#A problem that has been analysed but has not been resolved.
        lagging indicator#Indicators that show historical performance.
        lead time#The time taken to complete the execution of a process, usually measured from a specific perspective (e.g. that of the customer).
        leading indicator#Indicators that help to predict future performance.
        Lean#An approach that focuses on improving workflows by maximizing value through the elimination of waste.
        Lean culture#A work environment where trust, respect, curiosity, enquiry, playfulness, and intensity all co-exist to support learning and discovery.
        lessons-learned analysis#An evaluation of an improvement initiative or iteration for the purpose of understanding what did or did not go well and what should be done differently in the future in similar circumstances.
        lifecycle#The full set of stages, transitions, and associated statuses in the life of a service, product, practice, or other entity.
        live#Refers to a service or other configuration item operating in the live environment.
        live environment#A controlled environment used in the delivery of IT services to service consumers. (Additional info: Live environment emphasizes that the application is currently active, operational, and accessible to end-users.)
        machine learning#An applied form of artificial intelligence, based on the principle of systems responding to data, and adapting their actions and outputs as they are continually exposed to more of it.
        maintainability#The ease with which a service or other entity can be repaired or modified.
        major incident#An incident with significant business impact, requiring an immediate coordinated resolution.
        management#Coordinated activities to define, control, supervise, and improve something.
        management system#Interrelated or interacting elements that establish policy and objectives and enable the achievement of those objectives.
        market disruption#Disruption that occurs when digital technology introduces a change that impacts a particular market or market segment.
        maturity#A measure of the reliability, efficiency and effectiveness of an organization, practice, or process.
        mean time between failures (MTBF)#A metric of how frequently a service or other configuration item fails.
        mean time to restore service (MTRS)#A metric of how quickly a service is restored after a failure.
        measurement#A means of decreasing uncertainty based on one or more observations that are expressed in quantifiable units.
        measurement and reporting#The practice of supporting good decision-making and continual improvement by decreasing levels of uncertainty.
        mental model#An explanation of someone’s understanding of how something works in the surrounding world.
        metric#A measurement or calculation that is monitored or reported for management and improvement.
        microservices#A variation of the service-oriented architecture in which an application is designed and developed as a set of small, loosely coupled services, each running in its own process and using lightweight mechanisms to communicate.
        minimum viable approach#A technique of providing users with the minimum set of capabilities to enable rapid assessment and learning. Minimum viable approaches can be applied to products, services, practices, processes, and process outputs.
        minimum viable product (MVP)#A product with just enough features to satisfy early customers, and to provide feedback for future product development.
        mission#A short but complete description of the overall purpose and intentions of an organization. It states what is to be achieved, but not how this should be done.
        model#A representation of a system, practice, process, service, or other entity that is used to understand and predict its behaviour and relationships.
        modelling#The activity of creating, maintaining, and utilizing models.
        moment of truth#Any episode in which the customer or user comes into contact with an aspect of the organization and gets an impression of the quality of its service. It is the basis for setting and fulfilling client expectations and ultimately achieving client satisfaction.
        monitoring#Repeated observation of a system, practice, process, service, or other entity to detect events and to ensure that the current status is known.
        monitoring and event management practice#The practice of systematically observing services and service components, and recording and reporting selected changes of state identified as events.
        multi-sourcing#The use of multiple service providers offering similar (if not the same) services, balancing the risks of relying on a single provider with the overhead of managing work across multiple providers.
        net promoter score (NPS)#A metric used to measure customer loyalty; often used as a proxy to measure customer satisfaction.
        objectives and key results (OKR)#A framework for defining and tracking objectives and their outcomes.
        obtain/build#The value chain activity that ensures service components are available when and where they are needed, and that they meet agreed specifications.
        operating model#A conceptual and/or visual representation of how an organization co-creates value with its customers and other stakeholders, as well as how the organization runs itself.
        operation#The routine running and management of an activity, product, service, or other configuration item.
        operational technology#The application of digital technology for detecting or causing changes in physical devices through monitoring and/or control.
        opportunity#A situation that allows an organization to expand its existing operation, either by introducing new products and services or by moving into a new market.
        organization#A person or a group of people that has its own functions with responsibilities, authorities, and relationships to achieve its objectives.
        organizational agility#The ability of an organization to move and adapt quickly, flexibly, and decisively in response to events in the internal or external environments.
        organizational change management practice#The practice of ensuring that changes in an organization are smoothly and successfully implemented and that lasting benefits are achieved by managing the human aspects of the changes.
        organizational resilience#The ability of an organization to anticipate, prepare for, respond to, and overcome adverse events in the internal or external environments.
        organizational velocity#The speed, effectiveness, and efficiency with which an organization operates. Organizational velocity influences time to market, quality, safety, costs, and risks.
        organizations and people#One of the four dimensions of service management. It ensures that the way an organization is structured and managed, as well as its roles, responsibilities, and systems of authority and communication, is well defined and supports its overall strategy and operating model.
        out-of-the-box services#Services immediately available for use after a service agreement is reached, with little or no need for onboarding and setup.
        outcome#A result for a stakeholder enabled by one or more outputs.
        output#A tangible or intangible deliverable of an activity.
        outsourcing#The process of having external suppliers provide products and services that were previously provided internally.
        paradoxical intervention#A management technique that relies on asking staff for something in order to achieve the opposite result; for example, asking for more risks to be taken to decrease their impact.
        parallel operating model#An approach to executing digital strategy while maintaining a steady state.
        partners and suppliers#One of the four dimensions of service management. It encompasses the relationships an organization has with other organizations that are involved in the design, development, deployment, delivery, support, and/or continual improvement of services.
        partnership#A relationship between two organizations that involves working closely together to achieve common goals and objectives.
        pattern of business activity (PBA)#A workload profile of one or more business activities. PBAs are used to help the service provider understand and support different levels of service consumer activity.
        peer review#A judgement on a piece of scientific or other professional work by others working in the same area. When applied in software development, a work product is examined by its developer and one or more colleagues in order to evaluate its technical content and quality. This contributes to assured conformance.
        performance#A measure of what is achieved or delivered by a system, person, team, practice, or service.
        persona#A fictional yet realistic description of a typical or target customer or user of a service or product.
        pilot#A test implementation of a service with a limited scope in a live environment.
        plan#The value chain activity that ensures a shared understanding of the vision, current status, and improvement direction for all four dimensions and all products and services across an organization.
        policy#Formally documented management expectations and intentions, used to direct decisions and activities.
        portfolio#A collection of assets into which an organization chooses to invest its resources in order to receive the best return.
        portfolio management practice#The practice of ensuring that an organization has the right mix of programmes, projects, products, and services to execute its strategy within its funding and resource constraints.
        post-implementation review (PIR)#A review after the implementation of a change, to evaluate success and identify opportunities for improvement.
        practice#A set of organizational resources designed for performing work or accomplishing an objective.
        prioritization#An action of selecting tasks to work on first when it is impossible to assign resources to all tasks in the backlog.
        problem#A cause, or potential cause, of one or more incidents.
        problem management practice#The practice of reducing the likelihood and impact of incidents by identifying actual and potential causes of incidents, and managing workarounds and known errors.
        procedure#A documented way to carry out an activity or a process.
        process#A set of interrelated or interacting activities that transform inputs into outputs. A process takes one or more defined inputs and turns them into defined outputs. Processes define the sequence of actions and their dependencies.
        product#A configuration of an organization’s resources, designed to offer value for a consumer.
        product owner#A role in a Scrum team that is responsible for: defining user stories and acceptance criteria; prioritizing user stories in a backlog; clarifying requirements and answering questions from the development team; and assisting with demonstrations to customers.
        production environment#A controlled environment used in the delivery of IT services to service consumers. (Additional info: Production environment focuses on where the application runs and the related infrastructure.)
        programme#A set of related projects and activities, and an organization structure created to direct and oversee them.
        project#A temporary structure that is created for the purpose of delivering one or more outputs (or products) according to an agreed business case.
        project management practice#The practice of ensuring that all an organization’s projects are successfully delivered.
        quick win#An improvement that is expected to provide a return on investment in a short period of time with relatively small cost and effort.
        RACI#A model used to help define roles and responsibilities. RACI stands for responsible, accountable, consulted, and informed.
        reconstructing for service agility#An approach to organizing knowledge work and service provision that reflects its complex and social nature.
        record#A document stating results achieved and providing evidence of activities performed.
        recovery#The activity of returning a configuration item to normal operation after a failure.
        recovery point objective (RPO)#The point to which information used by an activity must be restored to enable the activity to operate on resumption.
        recovery time objective (RTO)#The maximum acceptable period of time following a service disruption that can elapse before the lack of business functionality severely impacts the organization.
        reframing#A form of learning that takes place when examining the purpose and function of work being done, without taking the existing organizational structure for granted.
        relationship management practice#The practice of establishing and nurturing links between an organization and its stakeholders at strategic and tactical levels.
        release#A version of a service or other configuration item, or a collection of configuration items, that is made available for use.
        release management practice#The practice of making new and changed services and features available for use.
        reliability#The ability of a product, service, or other configuration item to perform its intended function for a specified period of time or number of cycles.
        report#A detailed communication of information or knowledge about a topic or event.
        request catalogue#A view of the service catalogue, providing details on service requests for existing and new services, which is made available for the user.
        request for change (RFC)#A description of a proposed change used to initiate change control.
        resolution#The action of solving an incident or problem.
        resource#A person or other entity that is required for the execution of an activity or the achievement of an objective. Resources may be owned or employed by an organization, or contracted from a third party.
        retire#The act of permanently withdrawing a product, service, or other configuration item from use.
        rich data#Data that is accurate, precise, and subjected to rigorous quality control.
        risk#A possible event that could cause harm or loss or make it more difficult to achieve objectives. Can also be defined as uncertainty of outcome and can be used in the context of measuring the probability of positive outcomes as well as negative outcomes.
        risk assessment#An activity to identify, analyse, and evaluate risks.
        risk management practice#The practice of ensuring that an organization understands and effectively handles risks.
        role#A role is a set of responsibilities, activities, and authorizations granted to a person or team in a specific context.
        safety culture#A climate in which people are comfortable being (and expressing) themselves.
        scope of control#The area(s) or activities over which a person has the authority to direct the actions of others or define the required outcomes.
        Scrum#An iterative, timeboxed approach to product delivery that is described as ‘a framework within which people can address complex adaptive problems, while productively and creatively delivering products of the highest possible value’.
        servant leadership#Leadership that is focused on the explicit support of people in their roles.
        service#A means of enabling value co-creation by facilitating outcomes that customers want to achieve, without the customer having to manage specific costs and risks.
        service action#Any action required to deliver a service output to a user. Service actions may be performed by a service provider resource, by service users, or jointly.
        service architecture#A view of all the services provided by an organization. It includes interactions between the services, and service models that describe the structure and dynamics of each service.
        service catalogue#Structured information about all the services and service offerings of a service provider, relevant for a specific target audience.
        service catalogue management practice#The practice of providing a single source of consistent information on all services and service offerings, and ensuring that it is available to the relevant audience.
        service configuration management practice#The practice of ensuring that accurate and reliable information about the configuration of services, and the configuration items that support them, is available when and where needed.
        service consumption#Activities performed by an organization to consume services. It includes the management of the consumer’s resources needed to use the service, service actions performed by users, and the receiving (acquiring) of goods (if required).
        service continuity management practice#The practice of ensuring that service availability and performance are maintained at a sufficient level in case of a disaster.
        service design practice#The practice of designing products and services that are fit for purpose, fit for use, and that can be delivered by the organization and its ecosystem.
        service desk#The point of communication between the service provider and all its users.
        service desk practice#The practice of capturing demand for incident resolution and service requests.
        service empathy#The ability to recognize, understand, predict, and project the interests, needs, intentions, and experiences of another party, in order to establish, maintain, and improve the service relationship.
        service financial management practice#The practice of supporting an organization’s strategies and plans for service management by ensuring that the organization’s financial resources and investments are being used effectively.
        service integration and management#The coordination and orchestration of work across all suppliers involved in the development and delivery of products and services.
        service interaction#A reciprocal action between a service provider and a service consumer that co-creates value.
        service level#One or more metrics that define expected or achieved service quality.
        service level agreement (SLA)#A documented agreement between a service provider and a customer that identifies both the services required and the expected level of service.
        service level management practice#The practice of setting clear business-based targets for service performance so that the delivery of a service can be properly assessed, monitored, and managed against these targets.
        service management#A set of specialized organizational capabilities for enabling value for customers in the form of services.
        service management office (SMO)#A group or department that functions as a centre of excellence for service management, ensuring continual development and the consistent application of management practices across an organization.
        service mindset#An important component of the organizational culture that defines an organization’s behaviour in service relationships. A service mindset includes the shared values and guiding principles adopted and followed by an organization.
        service offering#A documented agreement between a service provider and a customer that identifies both the services required and the expected level of service. Can also be defined as a formal description of one or more services, designed to address the needs of a target consumer group. A service offering may include goods, access to resources, and service actions.
        service owner#A role that is accountable for the delivery of a specific service.
        service portfolio#A complete set of products and services that are managed throughout their lifecycles by an organization.
        service provider#A role performed by an organization in a service relationship to provide services to consumers.
        service provision#Activities performed by an organization to provide services. It includes management of the provider’s resources, configured to deliver the service; ensuring access to these resources for users; fulfilment of the agreed service actions; service level management; and continual improvement. It may also include the supply of goods.
        service quality#The totality of a service’s characteristics that are relevant to its ability to satisfy stated and implied needs.
        service relationship#A cooperation between a service provider and service consumer. Service relationships include service provision, service consumption, and service relationship management.
        service relationship management#Joint activities performed by a service provider and a service consumer to ensure continual value co-creation based on agreed and available service offerings.
        service request#A request from a user or a user’s authorized representative that initiates a service action which has been agreed as a normal part of service delivery.
        service request management practice#The practice of supporting the agreed quality of a service by handling all pre-defined, user-initiated service requests in an effective and user-friendly manner.
        service requirement#refer to the specific needs or conditions that must be met for a service to be delivered effectively and efficiently. These requirements help define what is expected from an IT service and guide the design, implementation, and operation of the service.
        service validation and testing practice#The practice of ensuring that new or changed products and services meet defined requirements.
        service value system#A model representing how all the components and activities of an organization work together to facilitate value creation.
        service-dominant logic#A mental model of an (economic) exchange in which organizations co-create value by applying their competencies and other resources for the benefit of each other.
        shift-left approach#An approach to managing work that focuses on moving activities closer to the source of the work, in order to avoid potentially expensive delays or escalations. In a software development context, a shift-left approach might be characterized by moving testing activities closer to (or integrated with) development activities. In a support context, a shift-left approach might be characterized by providing self-help tools to end-users.
        Simian army#An open-source toolset for chaos engineering developed by Netflix.
        single-loop learning#The type of learning that takes place when fixing problems within the present organizational structure so that the system will function better without altering its structure.
        site reliability engineering (SRE)#A discipline that incorporates aspects of software engineering and applies them to infrastructure and operations problems with the goal of creating ultra-scalable and highly reliable software systems.
        software development and management practice#The practice of ensuring that applications meet stakeholder needs in terms of functionality, reliability, maintainability, compliance, and auditability.
        sourcing#The activity of planning and obtaining resources from a particular source type, which could be internal or external, centralized or distributed, and open or proprietary.
        specification#A documented description of the properties of a product, service, or other configuration item.
        sponsor#A person who authorizes budget for service consumption. Can also be used to describe an organization or individual that provides financial or other support for an initiative.
        sprint#A fixed timeframe (typically of 2–4 weeks) for creating selected features from the backlog.
        stakeholder#A person or organization that has an interest or involvement in an organization, product, service, practice, or other entity.
        standard#A document, established by consensus and approved by a recognized body, that provides for common and repeated use, mandatory requirements, guidelines, or characteristics for its subject.
        standard change#A low-risk, pre-authorized change that is well understood and fully documented, and which can be implemented without needing additional authorization.
        status#A description of the specific states an entity can have at a given time.
        strategy#A broad approach or course of action defined by an organization for achieving its objectives.
        strategy management practice#The practice of formulating the goals of an organization and adopting the courses of action and allocation of resources necessary for achieving those goals.
        stress prevention#The prevention, monitoring, and remediation of unhealthy tension in the workplace.
        supplier#A stakeholder responsible for providing services that are used by an organization.
        supplier management practice#The practice of ensuring that an organization’s suppliers and their performance levels are managed appropriately to support the provision of seamless quality products and services.
        support team#A team with the responsibility to maintain normal operations, address users’ requests, and resolve incidents and problems related to specified products, services, or other configuration items.
        sustainability#A business approach focused on creating long-term value for society and other stakeholders by addressing the risks and opportunities associated with economic, environmental, and social developments.
        swarming#A method of managing work in which a variety of specialist resources or stakeholders work on an item until it becomes apparent who is best placed to continue with the work, at which point the others are freed up to move on to other work items.
        system#A combination of interacting elements organized and maintained to achieve one or more stated purposes.
        systems thinking#A holistic approach to analysis and decision-making that focuses on the relationship between a system’s components and the way the system works, both as a whole and within the context of larger systems.
        technical debt#The total rework backlog accumulated by choosing workarounds instead of system solutions that would take longer.
        test environment#A controlled environment established to test products, services, and other configuration items.
        theory of constraints#A methodology for identifying the most important limiting factor (i.e. constraint, often referred to as a bottleneck) that stands in the way of creating value, and then systematically correcting that constraint until it is no longer the limiting factor.
        third party#A stakeholder external to an organization.
        throughput#A measure of the amount of work performed by a product, service, or other system over a given period of time.
        time value profile#A depiction of the change in value of a requirement, output, or outcome over time.
        touchpoint#Any event where a service consumer or potential service consumer has an encounter with the service provider and/or its products and resources.
        Toyota Kata#A mental model and behaviour pattern for scientific thinking and routines for practice and coaching.
        transaction#A unit of work consisting of an exchange between two or more participants or systems.
        use case#A technique using realistic practical scenarios to define functional requirements and to design tests.
        user#A person who uses services.
        user experience (UX)#The sum of the functional and emotional interactions with a service and service provider as perceived by a user.
        user story#A technique in Agile software development that uses natural language to describe desired outcomes and benefits from the point of view of a specific persona (typically the end-user), usually in the form of ‘who, what, and why’.
        utility#The functionality offered by a product or service to meet a particular need. Utility can be summarized as ‘what the service does’ and can be used to determine whether a service is ‘fit for purpose’. To have utility, a service must either support the performance of the consumer or remove constraints from the consumer. Many services do both.
        utility requirements#Functional requirements which have been defined by the customer and are unique to a specific product.
        validation#Confirmation that the system, product, service, or other entity meets the agreed specification.
        value#The perceived benefits, usefulness, and importance of something.
        value proposition#An explicit promise made by a service provider to its customers that it will deliver a particular bundle of benefits.
        value stream#A series of steps an organization undertakes to create and deliver products and services to consumers.
        value stream map#A visual representation of a service value stream which shows the flow of work, information, and resources.
        value stream mapping#A Lean management technique to visualize the steps needed to convert demand into value, used to identify opportunities to improve.
        value streams and processes#One of the four dimensions of service management. It defines the activities, workflows, controls, and procedures needed to achieve the agreed objectives.
        version control#The administrative management of sources and artefacts of information systems, products, and services.
        vision#A defined aspiration of what an organization would like to become in the future.
        warranty#Assurance that a product or service will meet agreed requirements. Warranty can be summarized as ‘how the service performs’ and can be used to determine whether a service is ‘fit for use’. Warranty often relates to service levels aligned with the needs of service consumers. This may be based on a formal agreement, or it may be a marketing message or brand image. Warranty typically addresses such areas as the availability of the service, its capacity, levels of security, and continuity. A service may be said to provide acceptable assurance, or ‘warranty’, if all defined and agreed conditions are met.
        warranty requirements#Typically non-functional requirements captured as inputs from key stakeholders and other practices.
        waterfall method#A development approach that is linear and sequential with distinct objectives for each phase of development.
        work instruction#A detailed description to be followed in order to perform an activity.
        workaround#A solution that reduces or eliminates the impact of an incident or problem for which a full resolution is not yet available. Some workarounds reduce the likelihood of incidents.
        workforce and talent management practice#The practice of ensuring that an organization has the right people with the appropriate skills and knowledge and in the correct roles to support its business objectives.
        aggregate CSP#Cloud service providers that offer a comprehensive blend of services using two or more cloud service models. See also infrastructure-as-a-service (IaaS); platform-as-a-service (PaaS); software-as-a-service (SaaS).
        application programming interface (API)#A type of software interface that offers a service to other pieces of software, such as access to or transmission of data, according to predefined rules.
        architecture#The process of planning and designing how a solution, system, service, or organization are structured to meet a set of defined objectives. The product of architecture is a blueprint that shows which elements will be used, how they are related, and how they should be managed through their lifecycle.
        big-bang migration#An approach to cloud migration that focuses on moving all identified components into the cloud as quickly as possible.
        capital expenditure (capex)#The cost of purchasing something that will become a financial asset (e.g. computer equipment and buildings). The value of the asset depreciates over multiple accounting periods. See also operating expenditure (opex).
        cloud migration#The process of moving applications, workloads, services, and/or data into, from, or between cloud environments.
        cloud native#A solution that has been designed and built specifically to operate in the cloud.
        cloud service#IT service (infrastructure, platforms, and software) that is hosted by third-party providers and made available on demand to users through the internet.
        cloud service agreement (CSA)#A compilation of documents or agreements that contain the terms governing the relationship between the cloud customer and the cloud service provider (CSP). The CSA is the key output of the negotiation between a CSP and a service consumer.
        cloud service provider (CSP)#An organization that offers private or public cloud-based infrastructure, platforms, or applications on an on-demand (or pay-per-use) basis.
        cloud service provider (CSP) partner#An organization that is formally recognized by one or more CSPs, and which specializes in helping consumer organizations to plan for, prepare for, acquire, and use cloud services. Types of partner include resellers, brokers, consultancies, implementors, and solution developers.
        cloud sprawl#Over-utilization of cloud services through duplication and failure to decommission services that are no longer used.
        cloud strategy#The part of the digital strategy that refers to which cloud services will be used and how they will be acquired and used.
        cloud#The provision of IT services that are available on demand, via the internet, from a pool of shared resources. These might be storage, processing facilities, operating systems, applications, functionality, development platforms, and/or IT management facilities.
        decision model#A way to break down and represent the steps and information required when making a complex business decision.
        disaster recovery#The formal plan and measures that enable an organization to restore key activities, systems, and facilities following a sudden unplanned event that causes great damage or serious loss. A disaster results in an organization failing to provide critical business functions for some predetermined minimum period of time.
        disbenefit#A measurable decline resulting from an outcome perceived as negative by the investing organization(s) and which detracts from one or more organizational objectives.
        elasticity#The extent to which capacity can be provided to services in order to match real-time demand and performance requirements.
        failover#A mechanism that causes the system to switch automatically from an active to a redundant component when monitoring detects a failure.
        feedback activity#The process of using the results and outputs of a step in the cloud customer journey to modify the next instance of an earlier step.
        feedforward activity#The process of using the interim results and outputs of a step to modify a later step before the former step is complete.
        framework agreement#A catalogue of agreements that have been negotiated and approved by an organization on behalf of multiple customers within the organization. Customers can select the service they need from a list of preferred service providers at rates, terms, and conditions that have been pre-negotiated.
        hybrid cloud#A combination of bespoke and standardized services from several internal and/or external service providers.
        infrastructure-as-a-service (IaaS)#A service model that provides technology components, such as standardized infrastructure services on a pay-as-you-use or reserved-use basis. Using IaaS services abstracts the user from the hardware layer of the solution.
        interoperability#The ability of computer systems or software from different vendors to operate together, and exchange and make use of information.
        legacy system#An outdated IT system that is still in use.
        middleware#Software that connects two or more software components or applications. Middleware is usually purchased from a supplier, rather than developed within the IT service provider.
        multi-cloud#A deployment model in which a single workload can be spread across two or more cloud service providers.
        multi-tenancy#A technology environment that is architected to support more than one customer at a time.
        operating expenditure (opex)#The cost resulting from running IT services, which often involves repeating payments such as staff costs, hardware maintenance, and electricity (also known as current expenditure or revenue expenditure). See also capital expenditure (capex).
        platform-as-a-service (PaaS)#A service model that provides an environment within which systems and solutions can be built. Using PaaS services abstracts the user from the infrastructure layer of the solution.
        private cloud#A deployment model based on customized consumer requirements. A private cloud model is consumer centric, and each service is built specifically for individual consumers. This could be provided by an internal IT department or a service provider.
        public cloud#A deployment model in which standard services using standardized components are delivered to a range of consumer organizations by a cloud service provider (CSP).
        request for information (RFI)#A technique used when requirements are unclear or incomplete and external assistance is needed to refine or add to them.
        request for proposal (RFP)#A formal document that provides background information and requirements to a short list of service providers, and invites them to submit a commercial proposal for products and services that meet or exceed the stated requirements.
        return on investment (ROI)#A measurement of the expected benefit of an investment. In the simplest sense, it is the profit of an investment divided by the costs invested. Most calculations will also include qualitative elements, such as the impact on culture and the perception of stakeholders.
        scalability#The ability of an IT service, process, and so on to perform its agreed function when the workload or scope changes.
        shared responsibility model#A shared responsibility model defines the line between consumer and provider responsibilities. It should be tailored based on the service and the organizational context.
        software-as-a-service (SaaS)#A service model that provides applications which can be used as they are, or with limited customization to suit a particular consumer. Using SaaS services abstracts the user from the underlying platform and infrastructure layers of the solution.
        vendor lock-in#The dependency on a cloud service provider for services and the inability to use another vendor without substantial switching costs.
        well-architected framework#Best-practice framework that has been created and adapted by major cloud service providers (CSPs) aiming to enable a secure, high-performing, and resilient infrastructure.
        availability management#The process responsible for ensuring that IT services meet agreed-upon availability levels.
        Availability Management#The process responsible for ensuring that IT services meet agreed-upon availability levels.
        Agreed Service Time (AST)#The agreed-upon time during which a service should be available for use.
        Asset Management#The process of managing the assets in the IT environment, including hardware, software, and documentation.
        Assessment#A formal evaluation to determine how well a process, service, or organization is performing against a set of agreed-upon metrics or standards.
        Business Continuity Management (BCM)#The process of planning and preparing to ensure that an organization can continue to operate during and after a major disruption.
        Business Impact Analysis (BIA)#A process used to assess the potential impact of a disruption to business operations and prioritize critical services.
        Change Management#A process that ensures that changes to IT services and infrastructure are carried out in a controlled manner.
        Capacity Management#The process of ensuring that IT resources are used effectively to meet current and future demand.
        Configuration Management#The process of managing the configuration of an organization's IT services, systems, and components.
        Continual Service Improvement (CSI)#A process designed to improve the effectiveness and efficiency of IT services over time by learning from past performance.
        Demand Management#The process of understanding and controlling customer demand for IT services to ensure that the necessary resources are available when needed.
        Disaster Recovery#The process of restoring IT services and infrastructure after a significant disruption or disaster.
        Event Management#The process of detecting and responding to events in the IT environment to ensure normal service operation.
        Emergency Change#A change that must be implemented immediately to resolve an issue that is causing significant disruption to IT services.
        Failure#The inability of a component or service to perform its required function.
        Full Availability#The state in which a service is fully operational and accessible, meeting all agreed-upon service levels.
        Governance#The framework, policies, and procedures that ensure that IT services align with the organization's objectives and comply with regulations.
        Incident#An unplanned interruption or reduction in the quality of an IT service.
        Incident Management#The process responsible for restoring normal service operation as quickly as possible following an incident.
        Infrastructure#The underlying hardware, software, networks, and facilities that support the delivery of IT services.
        IT Service Management (ITSM)#The discipline of managing IT services to ensure that they meet the needs of the business and its customers.
        Job Control#The process of managing the execution and scheduling of tasks in the IT infrastructure.
        Key Performance Indicator (KPI)#A metric used to measure the performance of a process, service, or organization against agreed-upon objectives.
        Lifecycle#The stages through which a service or component progresses, from conception through design, operation, and eventual retirement.
        Level 1 Support#The first line of support that typically handles basic or simple incidents and service requests.
        Major Incident#A significant incident that causes a serious disruption to IT services and requires immediate attention.
        Monitoring#The process of tracking the performance of IT systems and services to detect issues and ensure compliance with service levels.
        Normal Service Operation#The expected and standard operation of an IT service, free from disruption.
        Notification#The process of informing relevant stakeholders about changes, incidents, or other critical events.
        Operational Level Agreement (OLA)#An agreement between internal IT teams and departments that defines the service levels required to meet business needs.
        Outage#A period when an IT service or system is unavailable due to failure or maintenance.
        Problem Management#The process of identifying, analyzing, and resolving the root causes of incidents to prevent recurrence.
        Process Owner#The person responsible for ensuring that a specific ITIL process is effective and efficient.
        Provisioning#The process of providing IT services and resources to users or customers.
        Performance Management#The process of ensuring that services meet performance targets and quality standards.
        Quality Management#The process of ensuring that IT services and processes meet established quality standards.
        Qualification#The process of verifying that an individual or team has the necessary skills or qualifications to perform a specific task or role.
        Release Management#The process of planning, scheduling, and controlling the deployment of new or updated IT services into the live environment.
        Request Fulfillment#The process of handling service requests, which are user-initiated requests for standard services.
        Root Cause#The underlying cause of an incident or problem that, when resolved, prevents recurrence.
        Service Desk#The primary point of contact for users to report incidents, service requests, and seek help.
        Service Level Agreement#(SLA) A formal agreement between an IT service provider and a customer that defines the expected service levels for the delivery of IT services.
        Service Transition#The phase of the service lifecycle where new or changed services are planned, built, and deployed into the operational environment.
        Service agreement#is a formal, documented agreement between a service provider and a customer or user, outlining the terms and conditions of the services to be provided
        Stakeholder#Any individual or group with an interest in the performance or outcome of a service or process.
        Security Management#The process responsible for ensuring that IT services and information are protected from security threats.
        Standard Change#A pre-approved change that is low risk and follows a predefined process.
        Ticketing System#A software tool used to track and manage incidents, service requests, and other IT issues.
        Training#The process of providing employees with the knowledge and skills needed to perform their roles effectively.
        Urgency#The degree to which an incident or change must be addressed quickly to minimize impact on the business.
        User#An individual who interacts with IT services or systems to fulfill their needs or perform their work.
        Value#The benefit that is derived from a service or IT process in relation to the cost and effort involved.
        Validation#The process of ensuring that a product, service, or system meets the requirements and expectations of the customer.
        Workaround#A temporary solution used to reduce the impact of an incident or problem until a permanent solution can be found.
        Workflow#The sequence of tasks and activities that need to be completed in a process.
        XaaS (Anything as a Service)#A broad term for services delivered via the cloud, such as Software as a Service (SaaS) or Infrastructure as a Service (IaaS).
        Yield#The amount of output produced from an IT process or service, typically in relation to resources used.
        Zero Downtime#A goal or target of ensuring that an IT service is always available, without interruption.`

const stress = `
 You’ve got this! Take a deep breath. You’ve worked hard, and that will pay off.
    It’s completely okay to feel stressed. It shows how much you care.
    Remember, one exam doesn’t define you. You are so much more than this one moment.
    You’ve prepared for this, and you’re going to do great. Believe in yourself.
    I know it feels tough now, but you’ve been building up your knowledge for a while. Trust in that.
    Everyone experiences stress at times like this, but it will pass, and you will do well.
    Just take it one step at a time. You don’t need to have everything figured out right now.
    Remember, it’s about doing your best, not being perfect. You’re on the right path.
    You’ve worked hard. Just keep that focus and everything will fall into place.
    Don’t be too hard on yourself—this is just one moment. You’ve got this!`

const examTips = `
    Break your study sessions into manageable chunks. Avoid cramming!
    Prioritize your health: Eat well, stay hydrated, and get enough sleep.
    Set clear goals for each study session and reward yourself when you meet them.
    Focus on understanding the concepts, not just memorizing them.
    Use active recall and spaced repetition to retain more information.
    Stay organized: Make a study schedule and stick to it.
    Don't multitask! Focus on one thing at a time for better concentration.
    Start with the hardest subjects first while your mind is fresh.
    Practice with past exam papers to familiarize yourself with the format.
    Take regular breaks to avoid burnout and maintain focus.
    Don't be afraid to ask for help if you're stuck on something.
    Stay positive and visualize your success.
    Remind yourself why you started. Keep the bigger picture in mind.
    Avoid distractions like social media. Create a dedicated, quiet study space.
    Teach what you've learned to someone else. It's a great way to reinforce your knowledge.
    Break your study sessions into 25-minute intervals with short breaks in between.
    Stay consistent—small daily efforts add up over time.
    Use mnemonic devices to help remember difficult information.
    Believe in your ability to succeed. Confidence is key!
    Don’t procrastinate. The sooner you start, the less stressed you’ll feel.
    Take care of your mental health: meditate or take a walk when needed.
    Stay motivated by tracking your progress. Celebrate small victories.
    Trust the process—success comes from consistent effort over time.
    Don’t compare yourself to others. Focus on your own journey.
    Believe in progress, not perfection. Keep going, even if things don’t go perfectly.
    Keep your study area neat and organized. A tidy space helps clear your mind.
    Sometimes the best way to study is to take a step back and relax.
    Sleep is crucial for memory retention. Get a good night’s rest before the exam!
    Focus on mastering key concepts instead of trying to learn everything.
    Set both short-term and long-term goals for your studies.
    Avoid distractions by putting your phone on airplane mode or in another room.
    Keep a positive mindset: No matter how tough it gets, remember you’re capable.
    Use visualization techniques—imagine yourself walking into the exam with confidence.
    Don't be afraid to take risks in your studying. Try new methods and see what works for you.
    When you feel overwhelmed, take a deep breath, step away, and come back with a clear mind.
    Review your notes at least once a day. Repetition is the key to remembering information.
    Stay accountable. Share your goals with someone who will encourage you to stay on track.
    Focus on quality, not quantity. It’s better to deeply understand a few topics than to superficially know many.
    Surround yourself with positivity. Whether it’s friends, family, or inspirational quotes, stay motivated!
    Stay curious. The more you enjoy learning, the easier it will be to retain information.
    Get moving! Physical activity helps to boost concentration and reduce stress.
    If you make a mistake, don’t stress. Learn from it and keep moving forward.
    Celebrate every milestone, even the small ones. Every step counts!
    The only limit to your achievement is your willingness to keep going.
    Remember, this exam is just a small step in your long journey. You’ve got this!
    Persistence is key. Even when it’s tough, keep going.`

    const motivation = `
    The harder you work for something, the greater you'll feel when you achieve it.
Success is the sum of small efforts, repeated day in and day out. – Robert Collier
Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. – Christian D. Larson
Don’t watch the clock; do what it does. Keep going. – Sam Levenson
The future depends on what you do today. – Mahatma Gandhi
The pain you feel today will be the strength you feel tomorrow.
Success doesn’t come from what you do occasionally, it comes from what you do consistently.
If you want to achieve greatness, stop asking for permission.
Don’t stop when you’re tired. Stop when you’re done.
Your dreams don’t work unless you do.
The key to success is to focus on goals, not obstacles.
Great things never come from comfort zones.
It always seems impossible until it’s done. – Nelson Mandela
Study hard, stay positive, and trust in your ability.
What you get by achieving your goals is not as important as what you become by achieving your goals. – Zig Ziglar
Hard work beats talent when talent doesn’t work hard. – Tim Notke
The road to success and the road to failure are almost exactly the same. – Colin R. Davis
Take small steps every day. Keep moving forward.
You don't have to be great to start, but you have to start to be great. – Zig Ziglar
Success is the result of preparation, hard work, and learning from failure. – Colin Powell
Your effort today will be the results of your tomorrow.
Don’t let yesterday take up too much of today. – Will Rogers
The only way to do great work is to love what you do. – Steve Jobs
No matter how you feel, get up, dress up, and show up.
Do something today that your future self will thank you for.
Strive for progress, not perfection.
Be stronger than your strongest excuse.
You don’t have to be perfect. You just have to keep going.
The secret of getting ahead is getting started. – Mark Twain
Act as if what you do makes a difference. It does. – William James
Don't count the days. Make the days count. – Muhammad Ali
If you can’t stop thinking about it, don’t stop working for it.
You are capable of more than you know.
Small progress is still progress.
Do not wait to strike till the iron is hot, but make it hot by striking. – William Butler Yeats
Learning is not attained by chance, it must be sought for with ardor and diligence. – Abigail Adams
Success is not the key to happiness. Happiness is the key to success.
Your biggest challenge isn't someone else. It's the ache in your lungs and the burning in your legs.
Focus on being productive instead of busy.
Push yourself because no one else is going to do it for you.
The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt
You will never have this day again, so make it count.
Success is the progressive realization of a worthy goal or ideal. – Earl Nightingale
You miss 100% of the shots you don’t take. – Wayne Gretzky
Don’t stop when you’re tired. Stop when you’re done.
One step at a time.
Keep your face always toward the sunshine—and shadows will fall behind you. – Walt Whitman
A year from now you may wish you had started today.
Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill
Don’t let your dreams be dreams. – Jack Johnson
What seems impossible today will one day become your warm-up.
Stay focused and never give up.
You are what you do, not what you say you’ll do.
If you want to be successful, find someone who has achieved the results you want and copy what they do.
Success is the result of hard work and perseverance.`

 