# Rails Review

## Key Concepts

- Importance of Schema file
  - Visualizing it
- MVC
  - Other MVC Frameworks
- Debugging & Exploring Codebases
- Future of Rails
- How to continue learning with it

## Agenda

_Note: We won't be going into RSpec as part of the lecture._

**1. Checkpoint - How goes? (5m)**

Morale check: - React was a killer, but Ruby/Rails helped restore it - Some are feeling better about Whiteboard TIs

**2. Burning Questions? (5m)**

1. Stack options for final project.

- Front end: React (Vue, Angular, Ember)
- Back end: Node (Express / Koa / Hapi / ...) or Ruby (Rails / Sinatra / ...)
- Alternative: Python (Django / Flask)
- Alternative: PHP (CakePHP and CodeIgniter are less popular these days, Laravel and Yii are quite popular)
- Mongo (noSQL) and Redis (for PubSub and/or KV Cache)
- Overall I'd personally recommend Ruby + React for practice reasons. But in the real world the stack depends on many factors, including the type of project, the skillset of the team, etc.

**3. MVC Review (10m)**

Thanks to Tausif for his whiteboard explanation of MVC
![MVC diagram](https://ci4.googleusercontent.com/proxy/TWN7go8VTG1Tu0bjK3GNGC7T2OvdRfV1-LTHbOUYRX5Hg_KSvBkTTaY=s0-d-e1-ft#https://d.pr/i/ruMoO8+)

**4. Compass Feature(s) (40m)**

_We looked at Compass source code, and submitted a small change as a PR, and even merged it into master... Nice!_

**New Compass Enhancements:**

1. Number of active students in my cohort (done!)
2. ~Feedback UX - Link feedback to lecture~ (did not get to it)
3. ~Better completion (after marking activity completed) UX~ (did not get to it)

**Goals:**

- Working with a different codebase: Debugging & Exploring
  - Important files

Note: You can reverse engineer db visualization with https://www.dbdiagram.io

**Showed off:**

- Tests (via RSpec) which includes Unit tests but also e2e (integration) tests
- Rubocop for linting and autocorrect
- LetterOpener for email capture and debugging

**5. Open Source Rails Apps (10m)**

Consider working on an Open Source product app used by many folks. This can be for final project or thereafter. Ideally your first one should be one with a familiar stack. There are many, but here are some Rails-based ones to get you started...

- Discourse (warning: ember frontend)
- Lobsters
- GitLab (warning: massive!)
- Mastadon

---

Khurram Virani
